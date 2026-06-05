export default function UserProfile({ user }) {
  return (
    <div className="user-profile glass-panel">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="user-avatar" />
      <div className="user-info">
        <h2 className="user-name">{user.name || user.login}</h2>
        <p className="user-login">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label">Repos</span>
          </div>
        </div>
      </div>
    </div>
  );
}