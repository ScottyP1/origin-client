import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access") || null
  );
  const [user, setUser] = useState(null);
  const [allRepos, setAllRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setAllRepos([]);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
  }, []);

  useEffect(() => {
    if (accessToken) localStorage.setItem("access", accessToken);
  }, [accessToken]);

  const refreshRepos = useCallback(async () => {
    if (!user?.github_connected) {
      setAllRepos([]);
      return;
    }
    await api.get("activity/sync/");
    const { data: repos } = await api.get("repos/all/");
    setAllRepos(repos || []);
  }, [user?.github_connected]);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("auth/user/");
        if (cancelled) return;

        setUser(data);
        if (data.github_connected) {
          await api.get("activity/sync/");
          if (cancelled) return;
          const { data: repos } = await api.get("repos/all/");
          if (cancelled) return;
          setAllRepos(repos || []);
        } else {
          setAllRepos([]);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setAllRepos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const addTrackedRepo = useCallback(async (repo) => {
    const response = await api.post("repos/add/", {
      id: repo.id,
      name: repo.name,
    });

    setUser((prev) =>
      prev
        ? { ...prev, tracked_repos: [...prev.tracked_repos, response.data] }
        : prev
    );

    setAllRepos((prev) => prev.filter((r) => r.id !== repo.id));
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
      setUser,
      allRepos,
      setAllRepos,
      loading,
      logout,
      refreshRepos,
      addTrackedRepo,
    }),
    [accessToken, user, allRepos, loading, logout, refreshRepos, addTrackedRepo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
