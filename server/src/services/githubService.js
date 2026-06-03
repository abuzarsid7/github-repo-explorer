const BASE_URL = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

export async function fetchGithubUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });
  if (!res.ok) {
    const err = new Error('GitHub API error');
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function fetchGithubRepos(username, page = 1, per_page = 30) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=${per_page}&page=${page}&sort=updated`,
    { headers }
  );
  if (!res.ok) {
    const err = new Error('GitHub API error');
    err.status = res.status;
    throw err;
  }
  return res.json();
}