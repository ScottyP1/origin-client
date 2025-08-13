import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function GitHubCallback() {
  const navigate = useNavigate();
  const { setUser, setAllRepos, setAccessToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const res = await api.post("social/github/connect/", { code });

        if (res.data?.access) setAccessToken(res.data.access);
        if (res.data?.refresh)
          localStorage.setItem("refresh", res.data.refresh);

        setUser(res.data);

        const repoData = await api.get("repos/all/");

        setAllRepos(repoData.data || []);
        navigate("/dashboard");
      } catch (err) {
        console.error("GitHub OAuth error:", err);
        navigate("/login");
      }
    })();
    // include deps actually used
  }, [navigate, searchParams, setUser, setAllRepos, setAccessToken]);

  return <p>Logging in with GitHub...</p>;
}
