# GitHub Repo Explorer

A full-stack web application where users can search any GitHub username and instantly view their public profile and repositories.


---

## Tech Stack

| Tool / Library          | Role                                      | Why                                                                                   |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| **Node.js + Express**   | Backend API / GitHub proxy                | Lightweight, minimal boilerplate, great middleware ecosystem                          |
| **React 18 + Vite**     | Frontend SPA                              | Fast HMR in development, optimised production builds, no CRA overhead                |
| **Vanilla CSS**         | Styling                                   | Clean, utility-first approach paired naturally with Vite                              |
| **Axios**               | HTTP client (frontend → backend)          | Cleaner error handling than raw fetch; interceptors make base-URL config easy         |
| **node-fetch / axios**  | HTTP client (backend → GitHub API)        | Consistent with frontend; straightforward for REST calls                              |
| **Recharts**            | Language distribution pie chart           | Composable React components; small bundle impact                                      |
| **Vitest**              | Backend unit tests                        | Runs in the same Vite ecosystem; Jest-compatible API                                  |

---

## How to Run Locally

> **Prerequisite:** Node.js ≥ 18 installed.

### 1. Clone the repository

```bash
git clone https://github.com/abuzarsid7/github-repo-explorer.git
cd github-repo-explorer
```

### 2. Install dependencies (both packages in one step)

```bash
npm install          # installs root + workspaces (client & server)
```

Or install each separately:

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure environment variables

```bash
# server/.env
PORT=5000
GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere
FRONTEND_URL=http://localhost:5173
```

```bash
# client/.env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start the development servers

From the repo root (runs both concurrently):

```bash
npm run dev
```

Or start each separately in two terminals:

```bash
# Terminal 1
cd server && npm run dev      # Express on http://localhost:5000

# Terminal 2
cd client && npm run dev      # Vite on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## API Documentation

Base URL (local): `http://localhost:5000`

### `GET /api/github/:username`

Returns the GitHub user's public profile and top repositories, along with cache status.

| Field      | Details                  |
| ---------- | ------------------------ |
| **Method** | `GET`                    |
| **Params** | `:username` — GitHub login handle |

**Success response `200`:**

```json
{
  "user": {
    "login": "gaearon",
    "name": "Dan Abramov",
    "avatar_url": "https://avatars.githubusercontent.com/u/810438",
    "bio": "Building React.",
    "followers": 85000,
    "following": 171,
    "public_repos": 260,
    "html_url": "https://github.com/gaearon"
  },
  "repos": [
    {
      "id": 12256376,
      "name": "overreacted.io",
      "description": "Personal blog",
      "language": "JavaScript",
      "stargazers_count": 12000,
      "updated_at": "2024-11-01T10:23:00Z",
      "html_url": "https://github.com/gaearon/overreacted.io",
      "open_issues_count": 15,
      "default_branch": "master",
      "forks_count": 1500
    }
  ],
  "fromCache": false
}
```

**Error responses:**

| Status | Condition                       |
| ------ | ------------------------------- |
| `404`  | GitHub username does not exist  |
| `429`  | GitHub API rate limit exceeded  |
| `500`  | Internal server error           |

---

### `GET /api/github/:username/repos`

Returns a paginated list of the user's public repositories.

| Field          | Details                                                    |
| -------------- | ---------------------------------------------------------- |
| **Method**     | `GET`                                                      |
| **Params**     | `:username` — GitHub login handle                          |
| **Query**      | `page` (default `1`)                                       |

**Success response `200`:**

```json
{
  "repos": [
    {
      "id": 12256376,
      "name": "overreacted.io",
      "description": "Personal blog",
      "language": "JavaScript",
      "stargazers_count": 12000,
      "updated_at": "2024-11-01T10:23:00Z",
      "html_url": "https://github.com/gaearon/overreacted.io",
      "open_issues_count": 15,
      "default_branch": "master",
      "forks_count": 1500
    }
  ],
  "page": 1,
  "hasMore": false
}
```

**Error responses:** same as above.

---

## Project Structure

```text
github-repo-explorer/
├── client/                        # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LanguageChart.jsx  # Recharts PieChart for languages
│   │   │   ├── RecentSearches.jsx # localStorage-backed search history
│   │   │   ├── RepoCard.jsx       # Individual repo tile
│   │   │   ├── RepoList.jsx       # Repo grid & pagination
│   │   │   ├── SearchBar.jsx      # Input and search logic
│   │   │   ├── Skeleton.jsx       # Loading placeholders
│   │   │   └── UserProfile.jsx    # Avatar, stats, bio
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                        # Express backend / GitHub proxy
│   ├── src/
│   │   ├── controllers/
│   │   │   └── githubController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js    
│   │   ├── routes/
│   │   │   └── github.js          # /api/github endpoints
│   │   └── services/
│   │       ├── cacheService.js    # In-memory TTL cache
│   │       ├── cacheService.test.js   
│   │       ├── githubService.test.js
│   │       └── githubService.js   # GitHub API calls
│   ├── index.js                   # Server entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── Readme.md
```

---

## Caching Strategy

The backend holds an in-memory map keyed by `user:<username>`. Each entry stores the fetched user and repos payload alongside a timestamp. On every incoming request to the main endpoint, the service checks whether the cached entry is valid. If so, it returns the cached payload immediately — no GitHub API call is made. This prevents repeat searches from burning through the unauthenticated rate limit and makes subsequent lookups near-instant.

---

## Bonus Features Implemented

- **Recently searched** — up to 5 past searches stored in `localStorage`, shown below the search bar for one-click re-search.
- **Language pie chart** — a Recharts `PieChart` summarising the distribution of primary languages across all repos in the current view.
- **Vitest unit tests** — covers the cache service in `cacheService.test.js`.

---

## Next Steps / Known Limitations

- **No persistent cache** — the in-memory cache is lost on every server restart. A Redis layer would survive deploys and scale across multiple Node processes.
- **No authentication** — adding a GitHub OAuth flow would let users query private repos and dramatically increase rate limits without a hardcoded token.
- **Rate-limit feedback** — the UI shows a generic error on 429. A nicer touch would be parsing GitHub's `Retry-After` header and displaying a countdown.

---

## Testing

This project includes unit tests for the backend using [Vitest](https://vitest.dev/).
Tests cover the two most critical backend behaviours — cache logic and GitHub API error handling.

### Running Tests

```bash
cd server
npm run test
```

To run in watch mode during development:

```bash
npm run test:watch
```

### Test Files

```
server/
└── src/
    └── services/
        ├── cacheService.test.js
        └── githubService.test.js
```

### What Is Tested

**`cacheService.test.js`**

| Test | What it verifies |
|---|---|
| Returns null for missing keys | Cache does not crash or return garbage for unknown keys |
| Returns data before TTL expires | Store-and-retrieve flow works correctly |
| Returns null after TTL expires | Entries are correctly invalidated after 60 seconds |

**`githubService.test.js`**

| Test | What it verifies |
|---|---|
| Throws with status 404 when user not found | Error is correctly propagated when GitHub returns 404, allowing the controller to respond with the right HTTP status |

## Acknowledgements

- [GitHub REST API](https://docs.github.com/en/rest) — data source
- [Recharts](https://recharts.org/) — language distribution chart
