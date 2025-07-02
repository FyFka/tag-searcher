import { LRUCache } from "lru-cache";

const cacheLife = 1000 * 60 * 15; // 15 minutes

const options = {
  max: 700,
  ttl: cacheLife,
};

const globalCache = globalThis.serverCache ?? new LRUCache(options);

if (!globalThis.serverCache) {
  globalThis.serverCache = globalCache;
}

export default globalCache;
