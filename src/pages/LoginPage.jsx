import { Link } from "react-router-dom";

import { FiGithub } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] w-1/2 mt-[19%] hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-300 text-white p-6 rounded-xl">
      <a
        className="flex gap-4 justify-center"
        href="https://github.com/login/oauth/authorize?client_id=Ov23lieEn97vtUEbV4YA&redirect_uri=http://localhost:5173/github-callback&scope=user"
      >
        <FiGithub size={25} />
        <span className="font-[Mokoto]">Login with GitHub</span>
      </a>
    </div>
  );
}
