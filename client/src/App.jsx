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
   <div className="min-h-screen bg-gray-50">
  <header className="bg-white border-b border-gray-200 py-8 px-4">
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center text-gray-900">GitHub Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <RecentSearches searches={recentSearches} onSelect={handleSearch} />
    </div>
  </header>
  <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    {loading && <Skeleton />}
    {error && (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
    )}
    {data && !loading && (
      <>
        <UserProfile user={data.user} />
        <LanguageChart repos={data.repos} />
        <RepoList repos={data.repos} username={data.user.login} />
      </>
    )}
    {!data && !loading && !error && (
      <p className="text-center text-gray-400 mt-20">Search for a GitHub username to get started</p>
    )}
  </main>
</div>
  );
}