export default function UserProfile({ user }) {
  return (
   <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-200">
  <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-24 h-24 rounded-full" />
  <div>
    <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
    <p className="text-gray-500">@{user.login}</p>
    {user.bio && <p className="mt-1 text-gray-700">{user.bio}</p>}
    <div className="flex gap-4 mt-3 text-sm text-gray-600">
      <span><strong>{user.followers}</strong> Followers</span>
      <span><strong>{user.following}</strong> Following</span>
      <span><strong>{user.public_repos}</strong> Repos</span>
    </div>
  </div>
</div>
  );
}