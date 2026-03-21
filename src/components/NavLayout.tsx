import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AdvertiserDisclosure } from "@/components/AdvertiserDisclosure";
import { useWalletStore } from "@/stores/walletStore";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? "bg-zinc-800 text-white"
      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
  }`;

export function NavLayout() {
  const load = useWalletStore((s) => s.load);
  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="border-b border-surface-border bg-surface-raised/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              PM OS
            </NavLink>
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navClass} end>
                Dashboard
              </NavLink>
              <NavLink to="/wallet" className={navClass}>
                Cards
              </NavLink>
              <NavLink to="/sync" className={navClass}>
                Sync
              </NavLink>
              <NavLink to="/compare" className={navClass}>
                Compare
              </NavLink>
              <NavLink to="/optimizer" className={navClass}>
                Planning
              </NavLink>
              <NavLink to="/tips" className={navClass}>
                Tips
              </NavLink>
            </nav>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:block">Prototype</span>
        </div>
        <nav className="md:hidden flex flex-wrap gap-1 px-4 pb-3 border-t border-surface-border/60">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/wallet" className={navClass}>
            Wallet
          </NavLink>
          <NavLink to="/sync" className={navClass}>
            Sync
          </NavLink>
          <NavLink to="/compare" className={navClass}>
            Compare
          </NavLink>
          <NavLink to="/optimizer" className={navClass}>
            Optimizer
          </NavLink>
          <NavLink to="/tips" className={navClass}>
            Tips
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <AdvertiserDisclosure />
    </div>
  );
}
