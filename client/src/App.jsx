import { useState } from 'react';
import { useGithubSearch } from './hooks/useGithubSearch';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import RecentSearches from './components/RecentSearches';
import Skeleton from './components/Skeleton';
import LanguageChart from './components/LanguageChart';

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
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">GitHub Explorer</h1>
          <SearchBar onSearch={handleSearch} />
          <RecentSearches searches={recentSearches} onSelect={handleSearch} />
        </div>
      </header>
      <main className="app-main">
        {loading && <Skeleton />}
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}
        {data && !loading && (
          <>
            <UserProfile user={data.user} />
            <LanguageChart repos={data.repos} />
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