export default function RecentSearches({ searches, onSelect }) {
  if (!searches.length) return null;
  return (
   <div className="flex flex-wrap gap-2 items-center mt-2">
  <span className="text-sm text-gray-500">Recent:</span>
  {searches.map(s => (
    <button key={s} onClick={() => onSelect(s)}
      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
      {s}
    </button>
  ))}
</div>
  );
}
