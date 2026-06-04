(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // PKGReader — parses Wallpaper Engine scene.pkg binary format
    //
    // File layout:
    //   [offset 0]   PNG texture data stored sequentially
    //   [end of file] TOC: [version byte][PKGV0020 magic][entry count u32][entries...]
    //
    // Each TOC entry:
    //   [nameLen u32 LE][name string (UTF-8)][dataOffset u32 LE][dataSize u32 LE]
    // ---------------------------------------------------------------------------

    const PNG_SIG_BYTES = [0x89, 0x50, 0x4E, 0x47];
    const IEND_SIG_BYTES = [0x49, 0x45, 0x4E, 0x44];
    const IHDR_ASCII = [0x49, 0x48, 0x44, 0x52]; // "IHDR"

    class PKGReader {
        /**
         * Parse a PKG buffer and return structured data.
         * @param {ArrayBuffer|Uint8Array} buf
         * @returns {{ entries: Array<{name:string, offset:number, size:number}>, textures: Array<{file:string, offset:number, w:number, h:number, data:Uint8Array}> }}
         */
        static parse(buf) {
            const data = buf instanceof Uint8Array ? buf : new Uint8Array(buf);

            // 1. Extract PNG textures by scanning the byte buffer
            const textures = PKGReader._extractPNGs(data);

            // 2. Parse TOC entries from the end of the file
            const entries = [];
            const magicIdx = PKGReader._findMagic(data);

            if (magicIdx > 0) {
                // Layout at the end of file:
                //   [version byte at magicIdx-1][magic 8 bytes][entryCount u32 LE]
                //
                // Start reading entries right after the entry-count uint32
                let pos = magicIdx + 8;          // skip past "PKGV0020"
                const entryCount = PKGReader._readU32(data, pos);
                pos += 4;                         // skip past entry count

                for (let i = 0; i < entryCount && pos < data.length; i++) {
                    if (pos + 4 > data.length) break;

                    const nameLen = PKGReader._readU32(data, pos);
                    pos += 4;

                    if (pos + nameLen > data.length) break;
                    const name = PKGReader._readStr(data, pos, nameLen);
                    pos += nameLen;

                    if (pos + 8 > data.length) break;
                    const dataOffset = PKGReader._readU32(data, pos);
                    pos += 4;
                    const dataSize = PKGReader._readU32(data, pos);
                    pos += 4;

                    entries.push({ name, offset: dataOffset, size: dataSize });
                }
            }

            return { entries, textures };
        }

        // -----------------------------------------------------------------------
        // Private helpers
        // -----------------------------------------------------------------------

        /**
         * Find the "PKGV0020" magic bytes in the data buffer.
         * Scans from the END of the buffer forward since the TOC is at the tail.
         * @param {Uint8Array} data
         * @returns {number} byte index of magic, or -1 if not found
         */
        static _findMagic(data) {
            const magicStr = "PKGV0020";
            const encoder = new TextEncoder();
            const magic = encoder.encode(magicStr);

            // Search backwards from the end — the TOC is at the tail of the file
            for (let i = data.length - magic.length; i >= 0; i--) {
                let match = true;
                for (let j = 0; j < magic.length; j++) {
                    if (data[i + j] !== magic[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) return i;
            }

            return -1;
        }

        /**
         * Read a little-endian unsigned 32-bit integer at position `pos`.
         * @param {Uint8Array} data
         * @param {number} pos
         * @returns {number}
         */
        static _readU32(data, pos) {
            return data[pos]
                | (data[pos + 1] << 8)
                | (data[pos + 2] << 16)
                | (data[pos + 3] << 24);
        }

        /**
         * Read a big-endian unsigned 32-bit integer at position `pos`.
         * Used for PNG field values (width, height).
         * @param {Uint8Array} data
         * @param {number} pos
         * @returns {number}
         */
        static _readU32BE(data, pos) {
            return (data[pos] << 24)
                | (data[pos + 1] << 16)
                | (data[pos + 2] << 8)
                | data[pos + 3];
        }

        /**
         * Decode a UTF-8 string of length `len` from position `pos`.
         * @param {Uint8Array} data
         * @param {number} pos
         * @param {number} len
         * @returns {string}
         */
        static _readStr(data, pos, len) {
            const slice = data.slice(pos, pos + len);
            const decoder = new TextDecoder("utf-8");
            return decoder.decode(slice);
        }

        /**
         * Scan the entire byte buffer for valid PNG images.
         * Each PNG is delimited by PNG_SIG (89 50 4E 47) .. IEND_SIG (49 45 4E 44).
         * Validates the IHDR chunk and dimension sanity before including in results.
         * @param {Uint8Array} data
         * @returns {Array<{file:string, offset:number, w:number, h:number, data:Uint8Array}>}
         */
        static _extractPNGs(data) {
            const textures = [];
            let offset = 0;

            while (offset < data.length - 4) {
                // Find next PNG signature
                let sigIdx = -1;
                for (let i = offset; i <= data.length - 4; i++) {
                    if (data[i] === PNG_SIG_BYTES[0]
                        && data[i + 1] === PNG_SIG_BYTES[1]
                        && data[i + 2] === PNG_SIG_BYTES[2]
                        && data[i + 3] === PNG_SIG_BYTES[3]) {
                        sigIdx = i;
                        break;
                    }
                }
                if (sigIdx === -1) break;

                // Find corresponding IEND chunk
                let iendIdx = -1;
                for (let i = sigIdx + 8; i <= data.length - 4; i++) {
                    if (data[i] === IEND_SIG_BYTES[0]
                        && data[i + 1] === IEND_SIG_BYTES[1]
                        && data[i + 2] === IEND_SIG_BYTES[2]
                        && data[i + 3] === IEND_SIG_BYTES[3]) {
                        iendIdx = i;
                        break;
                    }
                }
                if (iendIdx === -1) break;

                const end = iendIdx + 8; // IEND chunk is 12 bytes total (4 len + 4 type + 0 data + 4 crc)

                // Validate IHDR chunk — must be at bytes 12-15 within the PNG
                if (end - sigIdx > 33
                    && data[sigIdx + 12] === IHDR_ASCII[0]
                    && data[sigIdx + 13] === IHDR_ASCII[1]
                    && data[sigIdx + 14] === IHDR_ASCII[2]
                    && data[sigIdx + 15] === IHDR_ASCII[3]) {

                    const w = PKGReader._readU32BE(data, sigIdx + 16);
                    const h = PKGReader._readU32BE(data, sigIdx + 20);

                    if (w > 16 && h > 16 && w < 16384 && h < 16384) {
                        const pngData = data.slice(sigIdx, end);
                        textures.push({
                            file: "tex_" + textures.length + ".png",
                            offset: sigIdx,
                            w: w,
                            h: h,
                            data: pngData,
                        });
                    }
                }

                offset = end;
            }

            return textures;
        }
    }

    // ---------------------------------------------------------------------------
    // Export
    // ---------------------------------------------------------------------------

    window.PKGReader = PKGReader;
})();
