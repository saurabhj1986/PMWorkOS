import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    pill: "bg-slate-700/40 text-slate-300 ring-slate-600/50",
  },
  working: {
    dot: "bg-blue-500",
    label: "Working",
    pill: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  },
  alert: {
    dot: "bg-amber-500",
    label: "Alert",
    pill: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  },
};

const TIER_STYLE = {
  core: {
    label: "Core",
    tagline: "Do the work",
    pill: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    iconBg: "bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30",
    headerDot: "bg-blue-400",
  },
  quality: {
    label: "Quality",
    tagline: "Keep it honest",
    pill: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    iconBg: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30",
    headerDot: "bg-amber-400",
  },
  ops: {
    label: "Ops",
    tagline: "Keep it flowing",
    pill: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
    iconBg: "bg-purple-500/15 text-purple-300 ring-1 ring-inset ring-purple-500/30",
    headerDot: "bg-purple-400",
  },
};

const TIER_ORDER = ["core", "quality", "ops"];

export default function AgentRoster() {
  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    style: TIER_STYLE[tier],
    items: agents.filter((a) => a.tier === tier),
  }));

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
            Sub-Agent Roster
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300 ring-1 ring-inset ring-blue-500/30">
            6 agents · 3 tiers
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-muted-text)]">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Working
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Alert
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />Idle
          </span>
        </div>
      </header>

      <div className="mt-4 space-y-4">
        {grouped.map(({ tier, style, items }) => (
          <div key={tier}>
            {/* Tier header */}
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${style.headerDot}`} />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                {style.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-muted-text)]">
                · {style.tagline} · {items.length} agents
              </span>
            </div>
            {/* Agent cards */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {items.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentCard({ agent }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[agent.icon] ?? CircleDot;
  const status = STATUS_STYLE[agent.status] ?? STATUS_STYLE.idle;
  const tierStyle = TIER_STYLE[agent.tier] ?? TIER_STYLE.core;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 transition hover:bg-slate-900/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${tierStyle.iconBg}`}>
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-xs font-semibold text-slate-100">
              {agent.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ring-1 ring-inset ${status.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ring-1 ring-inset ${tierStyle.pill}`}
            >
              {tierStyle.label}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-muted-text)]">
            {agent.role}
          </p>
          <p className="mt-0.5 line-clamp-1 text-[10px] italic text-slate-500">
            {agent.failureMode}
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

      <div className="border-t border-slate-800/60 px-3 py-2">
        <TrustScoreBadge inputs={agent.trustInputs} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-800/60 bg-slate-950/40"
          >
            <div className="space-y-3 p-3">
              {/* Big stat row */}
              <div className="grid grid-cols-3 gap-2">
                <MiniStat
                  value={agent.runsToday.toLocaleString()}
                  label="runs today"
                />
                <MiniStat
                  value={formatPct(agent.accuracyBaseline)}
                  label="accuracy"
                />
                <MiniStat value={agent.recentRuns.length} label="recent" />
              </div>

              {/* Sources */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  Reads from
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {agent.sources.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-md bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-mono text-slate-200 ring-1 ring-inset ring-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent runs */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  Recent runs
                </div>
                <ul className="mt-1 space-y-1">
                  {agent.recentRuns.slice(0, 3).map((run, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[10px] text-slate-200"
                    >
                      <span className="w-12 flex-shrink-0 font-mono text-[9px] text-[var(--color-muted-text)]">
                        {run.at}
                      </span>
                      <span className="line-clamp-1 flex-1">{run.action}</span>
                      <span className="flex-shrink-0 rounded bg-slate-800/60 px-1 py-0.5 text-[8px] font-mono uppercase tracking-wide text-slate-300 ring-1 ring-inset ring-slate-700">
                        {run.outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust scorecard */}
              <TrustScoreBadge inputs={agent.trustInputs} variant="expanded" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-center">
      <div className="font-mono text-base font-bold text-slate-100">
        {value}
      </div>
      <div className="font-mono text-[8px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </div>
  );
}
