import { useState } from "react";
import {
  MessageSquare,
  FolderSync,
  Activity,
  Wrench,
  ListChecks,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleDot,
} from "lucide-react";
import { agents } from "../../data/agents";
import TrustScoreBadge from "../../components/TrustScoreBadge";
import { formatPct } from "../../lib/trustScore";

const ICON_MAP = {
  MessageSquare,
  FolderSync,
  Activity,
  Wrench,
  ListChecks,
  Bell,
};

const STATUS_STYLE = {
  idle: {
    dot: "bg-slate-400",
    label: "Idle",
    pill: "bg-slate-100 text-slate-600 ring-slate-200",
  },
  working: {
    dot: "bg-blue-500 animate-pulse",
    label: "Working",
    pill: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  alert: {
    dot: "bg-amber-500 animate-pulse",
    label: "Alert",
    pill: "bg-amber-50 text-amber-700 ring-amber-200",
  },
};

export default function AgentRoster() {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[var(--color-dark-text)]">
            Sub-Agent Roster
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted-text)]">
            The 6 agents working the trust function for Harvey today. Click any
            card to inspect what it does, what it's reading, recent runs, and
            its full trust scorecard.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-text)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Working</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Alert</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span>Idle</span>
          </span>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}

function AgentCard({ agent }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[agent.icon] ?? CircleDot;
  const status = STATUS_STYLE[agent.status] ?? STATUS_STYLE.idle;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-accent-blue)]">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-[var(--color-dark-text)]">
              {agent.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ring-1 ring-inset ${status.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-muted-text)]">
            {agent.role}
          </p>
          <p className="mt-1.5 line-clamp-1 text-[11px] text-[var(--color-muted-text)]">
            {agent.statusDetail}
          </p>
        </div>
        <div className="flex-shrink-0 text-[var(--color-muted-text)]">
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </button>

      <div className="border-t border-slate-100 px-4 py-2">
        <TrustScoreBadge inputs={agent.trustInputs} />
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/40 p-4">
          <Block label="What it does">
            <p>{agent.description}</p>
          </Block>
          <Block label="Reads from">
            <div className="flex flex-wrap gap-1.5">
              {agent.sources.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[11px] font-mono text-[var(--color-dark-text)] ring-1 ring-inset ring-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </Block>
          <Block label="Today">
            <div className="flex items-baseline gap-3">
              <div>
                <span className="font-mono text-base font-semibold text-[var(--color-dark-text)]">
                  {agent.runsToday.toLocaleString()}
                </span>
                <span className="ml-1 text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  runs
                </span>
              </div>
              <div>
                <span className="font-mono text-base font-semibold text-[var(--color-dark-text)]">
                  {formatPct(agent.accuracyBaseline)}
                </span>
                <span className="ml-1 text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  baseline accuracy
                </span>
              </div>
            </div>
          </Block>
          <Block label="Recent runs">
            <ul className="space-y-1.5">
              {agent.recentRuns.map((run, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-[var(--color-dark-text)]"
                >
                  <span className="mt-0.5 w-14 flex-shrink-0 font-mono text-[10px] text-[var(--color-muted-text)]">
                    {run.at}
                  </span>
                  <span className="flex-1">{run.action}</span>
                  <span className="flex-shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wide text-[var(--color-muted-text)] ring-1 ring-inset ring-slate-200">
                    {run.outcome}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
          <Block label="Trust scorecard">
            <TrustScoreBadge inputs={agent.trustInputs} variant="expanded" />
          </Block>
        </div>
      )}
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
        {label}
      </div>
      <div className="mt-1 text-xs leading-relaxed text-[var(--color-dark-text)]">
        {children}
      </div>
    </div>
  );
}
