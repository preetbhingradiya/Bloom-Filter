"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const customeBloom_filter_1 = require("./customeBloom-filter");
// ---- Test Bloom Filter Accuracy ----
const existing = new Set();
const nonexisting = new Set();
const allKeys = [];
// Add for existing postive rate
for (let index = 0; index < 10; index++) {
    const id = (0, uuid_1.v4)().toString();
    allKeys.push(id);
    existing.add(id);
}
// Add for NOT existing postive rate
for (let index = 0; index < 10; index++) {
    const id = (0, uuid_1.v4)().toString();
    nonexisting.add(id);
    allKeys.push(id);
}
const bloom = new customeBloom_filter_1.BloomFilter(10); // 1250 bytes = 10000 bits
bloom.add;
// for (let numHashes = 1; numHashes <= 50 ; numHashes++) {
for (const key of existing) {
    bloom.add(key, 1);
}
for (const key of allKeys) {
    const exits = bloom.check(key, 1);
    console.log(`Key of ${key} is exit ${exits}`);
}
// }
console.log(allKeys);
// console.log(existing);
// console.log(nonexisting);
