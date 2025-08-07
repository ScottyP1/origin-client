import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

import { FiGithub } from "react-icons/fi";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const { setAccessToken, setUser } = useContext(AuthContext);
  // const [data, setData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [passwordError, setPasswordError] = useState("");
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
  //   const { confirmPassword, ...payload } = data;
  //   try {
  //     const response = await api.post("auth/signup/", payload);
  //     localStorage.setItem("access", response.data.tokens.access);
  //     localStorage.setItem("refresh", response.data.tokens.refresh);
  //     setAccessToken(response.data.tokens.access);
  //     setUser(response.data.user);
  //     setData({ username: "", email: "", password: "", confirmPassword: "" });
  //     navigate("/");
  //   } catch (e) {
  //     console.log(e.data);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-white">
      {/* Animated title */}
      <h1 className="text-4xl font-[Mokoto] tracking-widest mb-4 animate-fade-in">
        Register
      </h1>

      {/* Form container */}
      <div className="flex flex-col gap-6 p-8 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#511f87]/[.4] via-[#302b63]/[.4] to-[#0b0b65]/[.4] backdrop-blur-md shadow-xl animate-slide-up">
        {/* Username */}
        {/* <InputField
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          onChange={handleChange}
        /> */}

        {/* Email */}
        {/* <InputField
          label="Email"
          placeholder="you@example.com"
          type="email"
          name="email"
          onChange={handleChange}
        /> */}

        {/* password */}
        {/* <InputField
          label="Password"
          placeholder="*********"
          type="password"
          name="password"
          onChange={handleChange}
        /> */}
        {/* <InputField
          label="Confirm Password"
          placeholder="*********"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        /> */}

        {/* Submit */}
        {/* <SubmitButton label="Sign up" onClick={handleSubmit} />
        <span className="text-center">or</span> */}

        {/* Github ref link */}
        <a href="http://localhost:8000/api/auth/social/login/github/login/">
          Login with GitHub
        </a>

        {/* Link */}
        <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="/login" className="underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
