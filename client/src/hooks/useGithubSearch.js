import { useState, useCallback } from 'react';
import { searchUser } from '../services/api';

export function useGithubSearch() {
  const [data, setData] = useState(null);    // { user, repos }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (username) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await searchUser(username);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
}