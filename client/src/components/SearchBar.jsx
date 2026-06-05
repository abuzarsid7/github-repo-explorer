import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
  <input
    type="text"
    placeholder="Enter a GitHub username..."
    value={value}
    onChange={e => setValue(e.target.value)}
    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    Search
  </button>
</form>
  );
}