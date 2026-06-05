export default function Skeleton() {
  return (
    <div className="space-y-4" aria-label="Loading...">
      <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
      {[1, 2, 3].map(i => (
        <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}