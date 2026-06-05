import { describe, it, expect, vi } from 'vitest';
import { getFromCache, setInCache } from './cacheService';

describe('cacheService', () => {
  it('returns null for missing keys', () => {
    expect(getFromCache('nonexistent')).toBeNull();
  });
  it('returns data before TTL expires', () => {
    setInCache('user:test', { name: 'test' });
    expect(getFromCache('user:test')).toEqual({ name: 'test' });
  });
});