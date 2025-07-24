import { LRUCache } from "lru-cache";
import { cacheLife, cacheMaxAmount } from "@/config";

const options = {
  max: cacheMaxAmount,
  ttl: cacheLife,
};

const globalCache = globalThis.serverCache ?? new LRUCache(options);

if (!globalThis.serverCache) {
  globalThis.serverCache = globalCache;
}

export default globalCache;
