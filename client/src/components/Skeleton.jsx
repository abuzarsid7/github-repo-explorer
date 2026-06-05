export default function Skeleton() {
  return (
    <div className="skeleton-container" aria-label="Loading...">
      <div className="skeleton-item skeleton-profile" />
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton-item skeleton-card" />
      ))}
    </div>
  );
}