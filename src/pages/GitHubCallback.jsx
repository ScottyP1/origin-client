import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function GitHubCallback() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    async function fetchTokens() {
      try {
        const res = await api.post("/auth/github/", { code });

        const { access, refresh, user } = res.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        setAccessToken(access);
        setUser(user);

        navigate("/dashboard");
      } catch (err) {
        console.error("GitHub OAuth error:", err);
        navigate("/login");
      }
    }

    fetchTokens();
  }, [navigate, setAccessToken]);

  return <p>Logging in with GitHub...</p>;
}
