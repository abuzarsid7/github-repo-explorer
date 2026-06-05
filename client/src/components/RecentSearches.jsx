export default function RecentSearches({ searches, onSelect }) {
  if (!searches.length) return null;
  return (
    <div className="recent-searches">
      <span className="recent-label">Recent:</span>
      {searches.map(s => (
        <button key={s} onClick={() => onSelect(s)} className="recent-pill">
          {s}
        </button>
      ))}
    </div>
  );
}
