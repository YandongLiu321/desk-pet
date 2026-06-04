// Browser-compatible path shim for live2d-renderer
function extname(p) {
	const i = p.lastIndexOf(".");
	return i >= 0 ? p.slice(i) : "";
}

function dirname(p) {
	const i = p.lastIndexOf("/");
	return i >= 0 ? p.slice(0, i) : ".";
}

function join(...args) {
	return args
		.map((a, i) => (i === 0 ? a : a.replace(/^\/+/, "")))
		.join("/")
		.replace(/\/+$/, "");
}

function basename(p, ext) {
	const parts = p.split("/");
	let name = parts[parts.length - 1] || "";
	if (ext && name.endsWith(ext)) name = name.slice(0, -ext.length);
	return name;
}

module.exports = { extname, dirname, join, basename };
module.exports.default = module.exports;
