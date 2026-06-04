const cache = new Map();
const TTL_MS = 60 * 1000; // 60 seconds

export function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setInCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}