import {
  Search,
  Bell,
  CalendarDays,
  Menu,
} from "lucide-react";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  collapsed,
  setCollapsed,
}: Props) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header
      className="
      sticky
      top-0
      z-40
      h-24
      bg-slate-900/95
      backdrop-blur-xl
      border-b
      border-slate-800
      px-8
      flex
      items-center
      justify-between
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-5">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
          h-12
          w-12
          rounded-xl
          bg-slate-800
          hover:bg-slate-700
          flex
          items-center
          justify-center
          transition
          "
        >
          <Menu size={22} />
        </button>

        <div>

          <h1 className="text-4xl font-bold text-white">
            👨‍🚀 Welcome Back, Commander
          </h1>

          <p className="text-slate-400">
            Every application is one step closer to your dream job.
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-6">

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-3
          bg-slate-800
          rounded-xl
          px-4
          py-2
          "
        >
          <Search
            size={18}
            className="text-cyan-400"
          />

          <input
            placeholder="Search..."
            className="
            bg-transparent
            outline-none
            w-56
            text-white
            placeholder:text-slate-500
            "
          />
        </div>

        <div className="hidden xl:flex items-center gap-2 text-slate-300">

          <CalendarDays
            size={18}
            className="text-cyan-400"
          />

          {today}

        </div>

        <button
          className="
          h-12
          w-12
          rounded-xl
          bg-slate-800
          hover:bg-slate-700
          flex
          items-center
          justify-center
          transition
          "
        >
          <Bell size={20} />
        </button>

        <div
          className="
          h-14
          w-14
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-violet-500
          flex
          items-center
          justify-center
          text-xl
          font-bold
          "
        >
          B
        </div>

      </div>

    </header>
  );
};

export default Navbar;