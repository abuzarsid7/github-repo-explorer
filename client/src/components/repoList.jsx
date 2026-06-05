import { useState } from 'react';
import RepoCard from './RepoCard';
import { loadMoreRepos } from '../services/api';

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'name', label: 'Name' },
  { value: 'updated', label: 'Last Updated' },
];

export default function RepoList({ repos: initialRepos, username }) {
  const [repos, setRepos] = useState(initialRepos);
  const [sortBy, setSortBy] = useState('stars');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialRepos.length === 30);
  const [loadingMore, setLoadingMore] = useState(false);

  const sorted = [...repos].sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const next = page + 1;
      const { repos: newRepos, hasMore: more } = await loadMoreRepos(username, next);
      setRepos(prev => [...prev, ...newRepos]);
      setPage(next);
      setHasMore(more);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="repo-list">
      <div className="repo-controls">
        <h3>{repos.length} Repositories</h3>
        <div className="sort-controls">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={sortBy === opt.value ? 'active' : ''}
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="repo-grid">
        {sorted.map(repo => <RepoCard key={repo.id} repo={repo} />)}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} disabled={loadingMore} className="load-more">
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </section>
  );
}