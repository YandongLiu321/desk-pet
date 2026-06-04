const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const IEND_SIG = Buffer.from([0x49, 0x45, 0x4e, 0x44]);

class WallpaperEngineLoader {
	constructor() {
		this._cache = new Map();
	}

	/**
	 * Load a WE wallpaper directory. Returns all unique texture layers
	 * in scene render order, deduplicated from mipmap chains.
	 * @param {string} weDirPath
	 * @returns {{ ok: boolean, data?: object, error?: string }}
	 */
	load(weDirPath) {
		if (this._cache.has(weDirPath)) {
			return { ok: true, data: this._cache.get(weDirPath) };
		}

		if (!fs.existsSync(weDirPath) || !fs.statSync(weDirPath).isDirectory()) {
			return { ok: false, error: "Wallpaper directory not found" };
		}

		// Read project.json
		const projectJsonPath = path.join(weDirPath, "project.json");
		let metadata = null;
		if (fs.existsSync(projectJsonPath)) {
			try {
				metadata = JSON.parse(fs.readFileSync(projectJsonPath, "utf-8"));
			} catch { /* metadata stays null */ }
		}

		// Extract + deduplicate
		const pkgPath = path.join(weDirPath, "scene.pkg");
		const extractedDir = path.join(weDirPath, "extracted");
		let texEntries = [];

		if (fs.existsSync(pkgPath)) {
			const pkgStat = fs.statSync(pkgPath);
			const cacheFlag = path.join(extractedDir, ".extracted");

			let needsExtract = true;
			if (fs.existsSync(cacheFlag)) {
				try {
					const cached = JSON.parse(fs.readFileSync(cacheFlag, "utf-8"));
					if (cached.pkgSize === pkgStat.size && cached.pkgMtime === pkgStat.mtimeMs) {
						needsExtract = false;
					}
				} catch { /* re-extract */ }
			}

			if (needsExtract) {
				this._extractTextures(pkgPath, extractedDir, cacheFlag, pkgStat);
			}

			texEntries = this._loadEntries(extractedDir);
		}

		// Deduplicate mipmap chains — keep highest-res of each chain only
		const uniqueLayers = this._deduplicateMipmaps(texEntries);

		// Build dimension lookup for matching
		const dimLookup = new Map();
		for (const t of uniqueLayers) {
			const key = `${t.width}x${t.height}`;
			if (!dimLookup.has(key)) dimLookup.set(key, []);
			dimLookup.get(key).push(t);
		}

		// Parse scene graph from PKG for positioning
		const sceneObjects = fs.existsSync(pkgPath)
			? this._parseSceneGraph(pkgPath)
			: [];

		// Build parent hierarchy and compute absolute positions
		const idMap = new Map();
		for (const obj of sceneObjects) {
			idMap.set(obj.id, obj);
		}

		function getAbsoluteOrigin(obj) {
			let ox = obj.x, oy = obj.y, depth = 0;
			let current = obj;
			while (current.parent && idMap.has(current.parent) && depth < 20) {
				const p = idMap.get(current.parent);
				ox += p.x;
				oy += p.y;
				current = p;
				depth++;
			}
			return { x: ox, y: oy };
		}

		// Match scene objects to extracted textures by size
		const positionedLayers = [];
		const usedTextures = new Set();

		for (const obj of sceneObjects) {
			if (!obj.sizeW || !obj.sizeH) continue;

			// Find matching texture by dimensions
			const key = `${obj.sizeW}x${obj.sizeH}`;
			const candidates = dimLookup.get(key);
			if (!candidates || candidates.length === 0) continue;

			// Try exact match, then closest
			let match = candidates.find((c) => !usedTextures.has(c.path));
			if (!match) match = candidates[0];

			const abs = getAbsoluteOrigin(obj);
			positionedLayers.push({
				url: pathToFileURL(match.path).href,
				width: match.width,
				height: match.height,
				name: obj.name,
				x: abs.x,
				y: abs.y,
				alpha: obj.alpha,
			});
			usedTextures.add(match.path);
		}

		// Add unmatched textures as background layers (sorted by size desc)
		const positionedUrls = new Set(positionedLayers.map((l) => l.url));
		const extraLayers = [];
		for (const t of uniqueLayers) {
			if (!positionedUrls.has(pathToFileURL(t.path).href)) {
				extraLayers.push({
					url: pathToFileURL(t.path).href,
					width: t.width,
					height: t.height,
					name: "",
					x: 1920,
					y: 1080,
					alpha: 1,
				});
			}
		}
		extraLayers.sort((a, b) => (b.width * b.height) - (a.width * a.height));

		const allLayers = [...extraLayers, ...positionedLayers];

		const previewPath = path.join(weDirPath, "preview.gif");
		const preview = fs.existsSync(previewPath) ? pathToFileURL(previewPath).href : null;

		const result = {
			dirName: path.basename(weDirPath),
			title: metadata?.title || path.basename(weDirPath),
			workshopId: metadata?.workshopid || null,
			type: metadata?.type || null,
			preview,
			layers: allLayers,
			positionedCount: positionedLayers.length,
			totalExtracted: texEntries.length,
			totalUnique: uniqueLayers.length,
		};

		this._cache.set(weDirPath, result);
		return { ok: true, data: result };
	}

	/**
	 * Extract PNG images from scene.pkg, recording PKG offset order.
	 */
	_extractTextures(pkgPath, outputDir, cacheFlag, pkgStat) {
		const data = fs.readFileSync(pkgPath);
		fs.mkdirSync(outputDir, { recursive: true });

		// Clear old PNGs
		const existing = fs.readdirSync(outputDir);
		for (const f of existing) {
			if (f.endsWith(".png")) fs.unlinkSync(path.join(outputDir, f));
		}

		let extracted = 0;
		let offset = 0;
		const pkgOffsets = [];

		while (offset < data.length - 4) {
			const sigIdx = data.indexOf(PNG_SIG, offset);
			if (sigIdx === -1) break;

			const iendIdx = data.indexOf(IEND_SIG, sigIdx + 8);
			if (iendIdx === -1) break;

			const end = iendIdx + 8;
			const pngData = data.slice(sigIdx, end);

			if (pngData.length > 33 && pngData.toString("ascii", 12, 16) === "IHDR") {
				const w = pngData.readUInt32BE(16);
				const h = pngData.readUInt32BE(20);
				if (w > 16 && h > 16 && w < 16384 && h < 16384) {
					const fname = `tex_${extracted}.png`;
					fs.writeFileSync(path.join(outputDir, fname), pngData);
					pkgOffsets.push({ file: fname, offset: sigIdx, w, h });
					extracted++;
				}
			}

			offset = end;
		}

		// Write cache marker with extraction metadata
		fs.writeFileSync(
			cacheFlag,
			JSON.stringify({
				pkgSize: pkgStat.size,
				pkgMtime: pkgStat.mtimeMs,
				entries: pkgOffsets,
			}),
			"utf-8",
		);

		return extracted;
	}

	/**
	 * Load extracted textures in PKG offset order from the cache marker.
	 */
	_loadEntries(extractedDir) {
		const cacheFlag = path.join(extractedDir, ".extracted");
		if (!fs.existsSync(cacheFlag)) return [];

		let meta;
		try {
			meta = JSON.parse(fs.readFileSync(cacheFlag, "utf-8"));
		} catch {
			return [];
		}

		const entries = meta.entries || [];
		const result = [];

		for (const entry of entries) {
			const filePath = path.join(extractedDir, entry.file);
			if (!fs.existsSync(filePath)) continue;

			const stat = fs.statSync(filePath);
			result.push({
				path: filePath,
				width: entry.w,
				height: entry.h,
				offset: entry.offset,
				sizeKB: Math.round(stat.size / 1024),
			});
		}

		return result;
	}

	/**
	 * Group textures by mipmap chains and keep only the highest-resolution
	 * version of each chain. Two textures are in the same chain if their
	 * aspect ratios are within 6% and dimensions are roughly power-of-2 related.
	 */
	_deduplicateMipmaps(entries) {
		if (entries.length === 0) return [];

		// Filter tiny textures first
		const filtered = entries.filter(
			(t) => t.width >= 64 && t.height >= 64 && t.sizeKB >= 2,
		);

		// Sort by PKG offset to preserve scene render order
		const sorted = [...filtered].sort((a, b) => a.offset - b.offset);

		const chains = []; // each chain is an array of entries
		const assigned = new Set();

		for (let i = 0; i < sorted.length; i++) {
			if (assigned.has(i)) continue;

			const a = sorted[i];
			const chain = [a];
			assigned.add(i);

			const aspectA = a.width / a.height;

			for (let j = i + 1; j < sorted.length; j++) {
				if (assigned.has(j)) continue;

				const b = sorted[j];
				const aspectB = b.width / b.height;

				// Check aspect ratio similarity (within 6%)
				if (Math.abs(aspectA - aspectB) / Math.max(aspectA, aspectB) > 0.06) continue;

				// Check if dimensions are power-of-2 related
				const wRatio = Math.max(a.width, b.width) / Math.min(a.width, b.width);
				const hRatio = Math.max(a.height, b.height) / Math.min(a.height, b.height);

				// Mipmap ratio is typically 2x
				if (wRatio >= 1.9 && wRatio <= 2.1 && hRatio >= 1.9 && hRatio <= 2.1) {
					chain.push(b);
					assigned.add(j);
				}
			}

			chains.push(chain);
		}

		// From each chain, keep the entry with the largest pixel area
		const result = [];
		for (const chain of chains) {
			chain.sort((a, b) => (b.width * b.height) - (a.width * a.height));
			result.push(chain[0]);
		}

		// Re-sort by PKG offset for correct scene render order
		result.sort((a, b) => a.offset - b.offset);

		return result;
	}

	/**
	 * Determine the best CSS fit strategy for a texture layer.
	 * @returns {"cover"|"contain-bottom"|"contain-center"|"width-top"|"width-bottom"}
	 */
	_fitHint(t) {
		const aspect = t.width / t.height;

		// Very large textures → cover to fill screen
		if (t.width > 2500 && t.height > 1500) return "cover";
		if (t.width > 3000 && t.height > 800) return "cover";

		// Wide panoramic strips (sky/cloud layers)
		if (aspect > 4) {
			return t.offset < 5000000 ? "width-top" : "width-bottom";
		}

		// Tall portrait textures (character, side elements)
		if (aspect < 0.75 && t.height > 1000) return "contain-bottom";

		// Medium-large textures
		if (t.width > 1500 && t.height > 800) return "cover";

		// Smaller foreground elements → positioned at bottom
		if (t.height > 400 && aspect < 2.0) return "contain-bottom";

		// Default
		return "contain-center";
	}

	/**
	 * Parse the scene graph from scene.pkg. Returns array of objects with
	 * id, name, parent, origin (x/y), size, and alpha.
	 */
	_parseSceneGraph(pkgPath) {
		const data = fs.readFileSync(pkgPath);
		const objects = [];

		// Scene graph JSON blocks are in the 3.5MB-5MB range
		let pos = 3500000;
		const end = Math.min(data.length, 5000000);

		while (pos < end) {
			if (data[pos] !== 0x7B) { pos++; continue; }

			let depth = 0, inStr = false, esc = false;
			let close = -1;
			for (let j = pos; j < Math.min(pos + 100000, data.length); j++) {
				const b = data[j];
				if (esc) { esc = false; continue; }
				if (b === 0x5c) { esc = true; continue; }
				if (b === 0x22) { inStr = !inStr; continue; }
				if (inStr) continue;
				if (b === 0x7b) depth++;
				if (b === 0x7d) { depth--; if (depth === 0) { close = j + 1; break; } }
			}

			if (close < 0) { pos++; continue; }

			const slice = data.slice(pos, close);
			let printable = 0;
			for (let k = 0; k < Math.min(200, slice.length); k++) {
				if (slice[k] >= 0x20 && slice[k] < 0x7f) printable++;
			}
			if (printable < 100) { pos = close; continue; }

			try {
				const obj = JSON.parse(slice.toString("utf8"));
				if (obj && typeof obj === "object" && (obj.id || obj.image)) {
					// Extract origin
					let ox = 0, oy = 0;
					const origin = obj.origin;
					if (typeof origin === "string") {
						const parts = origin.split(/\s+/).map(Number);
						ox = parts[0] || 0;
						oy = parts[1] || 0;
					} else if (origin && typeof origin === "object") {
						const v = origin.value;
						if (typeof v === "string") {
							const parts = v.split(/\s+/).map(Number);
							ox = parts[0] || 0;
							oy = parts[1] || 0;
						}
					}

					// Extract size
					let sw = 0, sh = 0;
					const size = obj.size || obj.scale;
					if (typeof size === "string") {
						const parts = size.split(/\s+/).map(Number);
						sw = parts[0] || 0;
						sh = parts[1] || 0;
					}

					// Extract alpha
					let alpha = 1.0;
					if (typeof obj.alpha === "number") {
						alpha = obj.alpha;
					} else if (obj.alpha && typeof obj.alpha === "object") {
						alpha = obj.alpha.value ?? 1.0;
					}

					objects.push({
						id: obj.id,
						name: obj.name || "",
						image: obj.image || null,
						x: ox,
						y: oy,
						sizeW: sw,
						sizeH: sh,
						parent: obj.parent ?? null,
						alpha,
					});
				}
			} catch { /* not valid JSON */ }

			pos = close;
		}

		return objects;
	}

	/**
	 * Clear in-memory cache for a directory.
	 */
	invalidateCache(weDirPath) {
		this._cache.delete(weDirPath);
	}
}

module.exports = { WallpaperEngineLoader };
