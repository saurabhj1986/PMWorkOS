import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Zap,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { anomalies } from "../../data/anomalies";
import { getAgent } from "../../data/agents";
import { formatPct } from "../../lib/trustScore";

const SEVERITY_STYLE = {
  critical: {
    Icon: AlertOctagon,
    iconColor: "text-red-300",
    iconBg: "bg-red-500/20",
    border: "border-red-500/30",
    badge: "bg-red-500/15 text-red-300 ring-red-500/30",
    label: "CRITICAL",
    dot: "bg-red-500",
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/20",
    border: "border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    label: "WARNING",
    dot: "bg-amber-500",
  },
  info: {
    Icon: Info,
    iconColor: "text-blue-300",
    iconBg: "bg-blue-500/20",
    border: "border-blue-500/30",
    badge: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    label: "INFO",
    dot: "bg-blue-500",
  },
};

export default function AnomalyFeed() {
  const counts = anomalies.reduce(
    (acc, a) => {
      acc[a.severity] += 1;
      return acc;
    },
    { critical: 0, warning: 0, info: 0 },
  );

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
            Live Anomaly Feed
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-300 ring-1 ring-inset ring-red-500/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
            {counts.critical + counts.warning} active
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <SeverityCounter label="Critical" count={counts.critical} severity="critical" />
          <SeverityCounter label="Warning" count={counts.warning} severity="warning" />
          <SeverityCounter label="Info" count={counts.info} severity="info" />
        </div>
      </header>

      <ul className="mt-3 space-y-2">
        {anomalies.map((anomaly) => (
          <AnomalyRow key={anomaly.id} anomaly={anomaly} />
        ))}
      </ul>
    </section>
  );
}

function SeverityCounter({ label, count, severity }) {
  const style = SEVERITY_STYLE[severity];
  return (
    <div className={`flex items-center gap-1.5 rounded-md border px-2 py-1 ${style.border} bg-slate-900/60`}>
      <div className={`h-2 w-2 rounded-full ${style.dot}`} />
      <span className="text-[var(--color-muted-text)]">{label}</span>
      <span className="font-mono font-medium text-slate-100">
        {count}
      </span>
    </div>
  );
}

function AnomalyRow({ anomaly }) {
  const [open, setOpen] = useState(false);
  const [dispatchState, setDispatchState] = useState("idle"); // idle | acknowledged | working | resolved
  const style = SEVERITY_STYLE[anomaly.severity];
  const SeverityIcon = style.Icon;
  const agent = getAgent(anomaly.suggestedAgentId);

  const dispatchAgent = () => {
    setDispatchState("acknowledged");
    setTimeout(() => setDispatchState("working"), 700);
    setTimeout(() => setDispatchState("resolved"), 2200);
  };

  return (
    <li className={`overflow-hidden rounded-xl border ${style.border} bg-slate-900/40 transition hover:bg-slate-900/60`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
          <SeverityIcon className={`h-4 w-4 ${style.iconColor}`} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ring-1 ring-inset ${style.badge}`}>
              {style.label}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted-text)]">
              {anomaly.type}
            </span>
            <span className="text-[10px] text-[var(--color-muted-text)]">
              · {anomaly.detectedAt}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-[var(--color-muted-text)]">
              detection conf{" "}
              <span className="font-medium text-slate-200">
                {formatPct(anomaly.detectionConfidence)}
              </span>
            </span>
          </div>
          <h3 className="mt-1 text-xs font-semibold leading-snug text-slate-100">
            {anomaly.title}
          </h3>
          {!open && (
            <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-muted-text)]">
              {anomaly.body}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-[var(--color-muted-text)]">
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-800/60 bg-slate-950/40"
          >
            <div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-3">
              <div className="lg:col-span-2 lg:border-r lg:border-slate-800 lg:pr-3">
                <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  Affected entities
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {anomaly.affectedEntities.map((e, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-mono text-slate-200 ring-1 ring-inset ring-slate-700"
                    >
                      <span className="text-[8px] uppercase tracking-wide text-slate-500">
                        {e.kind}
                      </span>
                      <span>{e.id}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                  Dispatch
                </div>
                <div className="mt-1.5 rounded-lg border border-slate-800 bg-slate-900/60 p-2">
                  {agent && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30">
                        <Zap className="h-3 w-3" strokeWidth={2.5} />
                      </div>
                      <div className="truncate text-[11px] font-semibold text-slate-100">
                        {agent.name}
                      </div>
                    </div>
                  )}
                  <DispatchButton state={dispatchState} onClick={dispatchAgent} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function DispatchButton({ state, onClick }) {
  if (state === "idle") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-accent-blue)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500"
      >
        Dispatch Agent
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    );
  }
  if (state === "acknowledged") {
    return (
      <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/30">
        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
        Agent acknowledged
      </div>
    );
  }
  if (state === "working") {
    return (
      <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-inset ring-amber-500/30">
        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
        Working on it...
      </div>
    );
  }
  return (
    <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
      Resolved · agent report posted
    </div>
  );
}
