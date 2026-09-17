import {
  FaHome,
  FaBriefcase,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Rocket } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type Props = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: Props) => {
  const { user, logout } = useAuth();

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Jobs",
      icon: <FaBriefcase />,
      path: "/jobs",
    },
    {
      title: "Analytics",
      icon: <FaChartPie />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  const avatarLetter =
    user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <aside
      className={`
        sticky
        top-0
        h-screen
        shrink-0
        bg-slate-900
        border-r
        border-slate-800
        transition-all
        duration-300
        z-30
        flex
        flex-col
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* =========================
          LOGO
      ========================== */}

      <div
        className={`
          flex
          items-center
          border-b
          border-slate-800
          p-5
          ${collapsed ? "justify-center" : "gap-3"}
        `}
      >
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          <Rocket size={24} />
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-2xl font-black text-cyan-400">
              JobPilot
            </h1>

            <p className="text-xs text-slate-500">
              Track every opportunity.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}

      <nav className="flex-1 px-3 py-5">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `
              mb-2
              flex
              items-center
              rounded-xl
              px-4
              py-3
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
              ${
                collapsed
                  ? "justify-center"
                  : "gap-4"
              }
              `
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            {!collapsed && (
              <span className="font-medium">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* =========================
          USER SECTION
      ========================== */}

      <div className="border-t border-slate-800 p-4">

        {!collapsed && (
          <div className="mb-4 flex items-center gap-3">

            {/* Avatar */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-500
                text-xl
                font-bold
                text-white
              "
            >
              {avatarLetter}
            </div>

            {/* User Information */}

            <div className="min-w-0">

              <p className="truncate font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-sm text-slate-400">
                {user?.email || "JobPilot User"}
              </p>

            </div>

          </div>
        )}

        {/* Collapsed Avatar */}

        {collapsed && (
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-500
              text-xl
              font-bold
              text-white
            "
          >
            {avatarLetter}
          </div>
        )}

        {/* =========================
            LOGOUT
        ========================== */}

        <button
          onClick={logout}
          className={`
            flex
            w-full
            items-center
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            py-3
            text-red-400
            transition
            duration-200
            hover:bg-red-500/20
            hover:text-red-300
            ${
              collapsed
                ? "justify-center"
                : "justify-center gap-3"
            }
          `}
        >
          <FaSignOutAlt />

          {!collapsed && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;