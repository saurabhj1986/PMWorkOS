import {
  LayoutDashboard,
  Radar,
  MessageSquare,
  Database,
  Network,
  BookOpen,
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Trust Dashboard", icon: LayoutDashboard },
  { id: "mission", label: "Mission Control", icon: Radar },
  { id: "agent", label: "TrustReply Agent", icon: MessageSquare },
  { id: "data", label: "Data Model", icon: Database },
  { id: "architecture", label: "Data Architecture", icon: Network },
  { id: "build", label: "How I Built This", icon: BookOpen },
];

export default function TabNav({ active, onChange }) {
  return (
    <header className="bg-[var(--color-navy)] text-white shadow-lg">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-blue)] font-serif text-lg font-bold">
              T
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold leading-tight text-white">
                TrustReply
              </h1>
              <p className="text-xs text-slate-400">
                Harvey Trust Intelligence Platform
              </p>
            </div>
          </div>
          <div className="hidden text-right text-xs text-slate-400 sm:block">
            <div>Demo build for Josh McKibben, Head of Trust</div>
            <div>by Saurabh Jhaveri · Data Product Management</div>
          </div>
        </div>
        <nav className="-mb-px flex gap-1 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={`group flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[var(--color-accent-blue)] text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
