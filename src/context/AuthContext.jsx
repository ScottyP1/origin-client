import { createContext, useState, useEffect } from "react";
import api from "../api/axios"; // <-- make sure this path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access") || null
  );
  const [user, setUser] = useState(null);
  const [trackedRepos, setTrackedRepos] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [allActivity, setAllActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const userRes = await api.get("auth/user/");
        const githubRepoData = await api.get("repos/");
        const activityData = await api.get("activity/");

        setUser(userRes.data);
        setTrackedRepos(userRes.data.repos || []);
        setGithubRepos(githubRepoData.data || []);
        setAllActivity(activityData.data || []);
      } catch (err) {
        console.error("Failed to fetch user or repos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRepos();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        allActivity,
        setUser,
        trackedRepos,
        setTrackedRepos,
        githubRepos,
        setGithubRepos,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
