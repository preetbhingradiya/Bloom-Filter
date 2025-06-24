import murmur from "murmurhash";

export class BloomFilter {
  private filter: Uint8Array;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.filter = new Uint8Array(size);
  }

  private murmurHash(key: string, size: number, seed: number): number {
    const hash = murmur.v3(key + seed.toString());
    return hash % size;
  }

  public add(key: string, numHashes: number) {
    for (let i = 0; i < numHashes; i++) {
      const idx = this.murmurHash(key, this.size * 8, i);
      //   console.log(idx);
      const byteIdx = Math.floor(idx / 8);
      const bitIdx = idx % 8;
      this.filter[byteIdx] |= 1 << bitIdx;
      console.log(
        `Set bit ${bitIdx} in byte ${byteIdx} (bit index ${idx}) for key ${key}`
      );
    }
  }

  public check(key: string, numHashes: number): boolean {
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
