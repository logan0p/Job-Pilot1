import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sticky Sidebar (real flex item, not floated over content) */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content — always fills the remaining space, never overlapped */}
      <div className="flex-1 min-w-0">
        {/* Sticky Navbar */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Page Content */}
        <main className="pt-8 px-8 pb-8 min-h-[calc(100vh-96px)]">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;