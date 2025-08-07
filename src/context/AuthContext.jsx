import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access") || null
  );
  const [user, setUser] = useState(null);
  const [allRepos, setAllRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const allRepoData = await api.get("repos/all/");
        setAllRepos(allRepoData.data);

        await api.get("activity/sync/");
        const userData = await api.get("auth/user/");
        setUser(userData.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        allRepos,
        setAllRepos,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
