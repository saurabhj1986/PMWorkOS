import { Radar } from "lucide-react";
import AnomalyFeed from "./AnomalyFeed";
import AgentRoster from "./AgentRoster";
import CustomerBriefings from "./CustomerBriefings";

export default function MissionControl() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-[var(--color-navy)] to-slate-800 p-6 text-white shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/20">
            <Radar className="h-6 w-6 text-blue-300" strokeWidth={2} />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
              Tab 02 · Real-time
            </div>
            <h1 className="mt-1 font-serif text-2xl font-semibold">
              Mission Control
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-300">
              The single pane of glass for "what's happening across the trust
              function right now". Live anomaly feed on top, the 6 sub-agents
              keeping the engine running in the middle, and a one-click deal
              briefing for any active customer at the bottom. Every output
              carries a Trust Index so you know what you're looking at.
            </p>
          </div>
        </div>
      </header>

      <AnomalyFeed />
      <AgentRoster />
      <CustomerBriefings />
    </div>
  );
}
