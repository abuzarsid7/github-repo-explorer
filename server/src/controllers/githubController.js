import { fetchGithubUser, fetchGithubRepos } from '../services/githubService.js';
import { getFromCache, setInCache } from '../services/cacheService.js';

export async function getUserData(req, res) {
  const { username } = req.params;
  const cacheKey = `user:${username.toLowerCase()}`;

  const cached = getFromCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  try {
    const [user, repos] = await Promise.all([
      fetchGithubUser(username),
      fetchGithubRepos(username),
    ]);
    const payload = { user, repos };
    setInCache(cacheKey, payload);
    res.json({ ...payload, fromCache: false });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ error: 'User not found' });
    if (err.status === 403) return res.status(429).json({ error: 'GitHub rate limit exceeded. Try again shortly.' });
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
}

export async function getRepos(req, res) {
  const { username } = req.params;
  const page = parseInt(req.query.page) || 1;
  try {
    const repos = await fetchGithubRepos(username, page, 30);
    res.json({ repos, page, hasMore: repos.length === 30 });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: 'Could not fetch repos' });
  }
}