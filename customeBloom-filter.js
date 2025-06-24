"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomFilter = void 0;
const murmurhash_1 = __importDefault(require("murmurhash"));
class BloomFilter {
    constructor(size) {
        this.size = size;
        this.filter = new Uint8Array(size);
    }
    murmurHash(key, size, seed) {
        const hash = murmurhash_1.default.v3(key + seed.toString());
        return hash % size;
    }
    add(key, numHashes) {
        for (let i = 0; i < numHashes; i++) {
            const idx = this.murmurHash(key, this.size * 8, i);
            //   console.log(idx);
            const byteIdx = Math.floor(idx / 8);
            const bitIdx = idx % 8;
            this.filter[byteIdx] |= 1 << bitIdx;
            console.log(`Set bit ${bitIdx} in byte ${byteIdx} (bit index ${idx}) for key ${key}`);
        }
        // console.log(this.filter);
    }
    check(key, numHashes) {
        for (let i = 0; i < numHashes; i++) {
            const idx = this.murmurHash(key, this.size * 8, i);
            const byteIdx = Math.floor(idx / 8);
            const bitIdx = idx % 8;
            if ((this.filter[byteIdx] & (1 << bitIdx)) === 0) {
                return false;
            }
        }
        return true;
    }
}
exports.BloomFilter = BloomFilter;
