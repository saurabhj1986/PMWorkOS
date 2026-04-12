import { Radar } from "lucide-react";
import AnomalyFeed from "./AnomalyFeed";
import AgentRoster from "./AgentRoster";
import CustomerBriefings from "./CustomerBriefings";

export default function MissionControl() {
  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-inset ring-blue-500/30">
            <Radar className="h-5 w-5 text-blue-300" strokeWidth={2} />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
              Tab 02 · Real-time
            </div>
            <h1 className="mt-0.5 font-serif text-xl font-semibold text-slate-100">
              Mission Control
            </h1>
            <p className="mt-1 max-w-3xl text-xs text-[var(--color-muted-text)]">
              The single pane of glass for "what's happening across the trust
              function right now". Live anomaly feed, the 6 sub-agents keeping
              the engine running, and one-click deal briefings. Every output
              carries a Trust Index.
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
