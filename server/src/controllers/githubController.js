import { fetchGithubUser, fetchGithubRepos } from '../services/githubService.js';

export async function getUserData(req, res) {
  const { username } = req.params;
  try {
    const [user, repos] = await Promise.all([
      fetchGithubUser(username),
      fetchGithubRepos(username),
    ]);
    res.json({ user, repos });
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (err.status === 403) {
      return res.status(429).json({ error: 'GitHub rate limit exceeded. Try again shortly.' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
}