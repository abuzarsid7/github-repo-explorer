const BASE = import.meta.env.VITE_API_URL || '/api';

export async function searchUser(username) {
  const res = await fetch(`${BASE}/github/${username}`);
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Something went wrong');
  }
  return res.json();
}

export async function loadMoreRepos(username, page) {
  const res = await fetch(`${BASE}/github/${username}/repos?page=${page}`);
  if (!res.ok) throw new Error('Could not load more repos');
  return res.json();
}