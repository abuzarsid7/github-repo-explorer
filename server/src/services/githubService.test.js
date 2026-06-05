import { describe, it, expect, vi } from 'vitest';
import { fetchGithubUser } from './githubService';

describe('fetchGithubUser', () => {
  it('throws with status 404 when user not found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    await expect(fetchGithubUser('nonexistentuser123'))
      .rejects.toMatchObject({ status: 404 });

    vi.unstubAllGlobals();
  });
});