import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import UserSettingsMenu from "./UserSettingsMenu";
import Logo from "./Logo";

import { FiGithub } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import { TbAlertHexagonFilled } from "react-icons/tb";
import { FaDashcube } from "react-icons/fa6";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [userSettingToggle, setUserSettingToggle] = useState(false);

  if (loading) return null;

  return (
    <header className="flex items-start justify-between px-6 md:px-12 py-4 font-[Mokoto] opacity-0 animate-fade-in transition-opacity duration-500 ease-in w-12">
      {/* Left: Logo and Sidebar */}
      <Logo />

      {user && <SideBar />}

      {/* Bottom: User avatar/Account Menu or GitHub login */}
      <div className="fixed bottom-10 right-15">
        {user ? (
          <div
            className="flex items-center gap-6 text-white bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] py-3 px-6 md:px-20 rounded-full hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-300"
            onClick={() => setUserSettingToggle(!userSettingToggle)}
          >
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="h-7 w-7 rounded-full"
            />
            <span className="hidden md:block text-white font-semibold tracking-[2px]">
              @{user.username}
            </span>
          </div>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-6 text-white text-lg bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] py-3 px-6 md:px-20 rounded-full hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-300"
          >
            <FiGithub size={24} />
            Connect GitHub
          </Link>
        )}
      </div>
    </header>
  );
};

const SideBar = () => {
  return (
    <nav className="hidden sm:flex flex-col gap-32 mt-20 group w-[200px] fixed top-30 2xl:top-50">
      <SidebarLink
        to="/dashboard"
        label="Dashboard"
        icon={<FaDashcube size={50} />}
      />
      <SidebarLink
        to="/repos"
        label="Repos"
        icon={<RiDashboardFill size={50} />}
      />
      <SidebarLink
        to="/dashboard/alerts"
        label="Alerts"
        icon={<TbAlertHexagonFilled size={50} />}
      />
    </nav>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-300`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`text-xl transition-colors duration-300 hover:text-white ${
            isActive ? "text-purple-400" : "text-gray-400"
          }`}
        >
          {icon}
        </span>
        <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 whitespace-nowrap text-white">
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default Navbar;
