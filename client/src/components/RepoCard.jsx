import { useState } from 'react';

export default function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
  <div className="flex justify-between items-start" onClick={() => setExpanded(e => !e)}>
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
       onClick={e => e.stopPropagation()}
       className="font-medium text-blue-600 hover:underline">
      {repo.name}
    </a>
    <span className="text-gray-400 text-sm">{expanded ? '▲' : '▼'}</span>
  </div>
  {repo.description && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{repo.description}</p>}
  <div className="flex gap-3 mt-2 text-xs text-gray-500">
    {repo.language && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{repo.language}</span>}
    <span>⭐ {repo.stargazers_count}</span>
    <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
  </div>
  {expanded && (
    <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
      <span>🔀 {repo.forks_count} forks</span>
      <span>🐛 {repo.open_issues_count} issues</span>
      <span>🌿 {repo.default_branch}</span>
    </div>
  )}
</article>
  );
}