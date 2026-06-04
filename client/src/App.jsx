import { useState } from 'react';
import { useGithubSearch } from './hooks/useGithubSearch';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import RecentSearches from './components/RecentSearches';
import Skeleton from './components/Skeleton';
import './App.css';

export default function App() {
  const { data, loading, error, search } = useGithubSearch();
  const [recentSearches, setRecentSearches] = useState(
    () => JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );

  const handleSearch = (username) => {
    search(username);
    const updated = [username, ...recentSearches.filter(u => u !== username)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <RecentSearches searches={recentSearches} onSelect={handleSearch} />
      </header>

      <main className="app-main">
        {loading && <Skeleton />}
        {error && <div className="error-banner">{error}</div>}
        {data && !loading && (
          <>
            <UserProfile user={data.user} />
            <RepoList repos={data.repos} username={data.user.login} />
          </>
        )}
        {!data && !loading && !error && (
          <div className="empty-state">
            <p>Search for a GitHub username to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}