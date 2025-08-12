import { v4 as uuid4 } from "uuid";
import { BloomFilter } from "./customeBloom-filter";

// ---- Test Bloom Filter Accuracy ----

const existing = new Set<string>();
const nonexisting = new Set<string>();
const allKeys: string[] = [];

// Add for existing postive rate
for (let index = 0; index < 10; index++) {
  const id = uuid4().toString();
  allKeys.push(id);
  existing.add(id);
}

// Add for NOT existing postive rate
for (let index = 0; index < 10; index++) {
  let id = uuid4().toString();
  id='';
  nonexisting.add(id);
  allKeys.push(id);
}

const bloom = new BloomFilter(10); // 1250 bytes = 10000 bits
bloom.add
// for (let numHashes = 1; numHashes <= 50 ; numHashes++) {
  for (const key of existing) {
    bloom.add(key, 1);
  }

  for(const key of allKeys){
    const exits = bloom.check(key, 1)
    console.log(`Key of ${key} is exit ${exits}`);
  }
// }

console.log(allKeys);
// console.log(existing);
// console.log(nonexisting);
