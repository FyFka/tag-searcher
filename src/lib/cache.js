import { LRUCache } from "lru-cache";

const cacheLife = 1000 * 60 * 30; // 30 minutes

const options = {
  max: 1000,
  ttl: cacheLife,
};

const globalCache = globalThis.serverCache ?? new LRUCache(options);

if (!globalThis.serverCache) {
  globalThis.serverCache = globalCache;
}

export default globalCache;
