import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiGithub } from "react-icons/fi";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { setAccessToken } = useContext(AuthContext);
  // const [data, setData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { ...payload } = data;
  //   try {
  //     // Auth User
  //     const response = await api.post("token/", payload);
  //     // Store Token
  //     localStorage.setItem("access", response.data.access);
  //     localStorage.setItem("refresh", response.data.refresh);
  //     // Store in context
  //     setAccessToken(response.data.access);
  //     setData({ username: "", password: "" });
  //     navigate("/");
  //   } catch (e) {
  //     console.log(e.response?.data);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-white">
      <h1 className="text-4xl font-[Mokoto] tracking-widest mb-8 animate-fade-in">
        Login
      </h1>

      <div className="flex flex-col gap-6 p-8 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#511f87]/[.4] via-[#302b63]/[.4] to-[#0b0b65]/[.4] backdrop-blur-md shadow-xl animate-slide-up">
        {/* Username */}
        {/* <InputField
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          onChange={handleChange}
        /> */}
        {/* Password */}
        {/* <InputField
          label="Password"
          placeholder="*********"
          name="password"
          type="password"
          onChange={handleChange}
        /> */}

        {/* <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="#" className="underline">
            Forgot Password?
          </Link>
        </div> */}

        {/* Submit button */}
        {/* <SubmitButton label="Sign In" onClick={handleSubmit} /> */}

        {/* <span className="text-center">or</span> */}
        {/* Github ref link */}
        <a href="https://github.com/login/oauth/authorize?client_id=Ov23lieEn97vtUEbV4YA&redirect_uri=http://localhost:5173/github-callback&scope=user">
          <FiGithub size={25} />
          <span>Login with GitHub</span>
        </a>

        {/* Extra links */}
        <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="/register" className="underline">
            Dont have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
