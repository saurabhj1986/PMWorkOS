import { useState } from "react";
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
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700 ring-red-200",
    label: "CRITICAL",
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 ring-amber-200",
    label: "WARNING",
  },
  info: {
    Icon: Info,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700 ring-blue-200",
    label: "INFO",
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
    <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-dark-text)]">
              Live Anomaly Feed
            </h2>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 ring-1 ring-inset ring-red-200">
              {counts.critical + counts.warning} active
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted-text)]">
            Real-time issues detected across the trust function. Click any alert
            to expand the investigation, then dispatch the suggested agent.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <SeverityCounter label="Critical" count={counts.critical} severity="critical" />
          <SeverityCounter label="Warning" count={counts.warning} severity="warning" />
          <SeverityCounter label="Info" count={counts.info} severity="info" />
        </div>
      </header>

      <ul className="mt-4 space-y-2">
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
    <div className={`flex items-center gap-1.5 rounded-md border px-2 py-1 ${style.border} bg-white`}>
      <div className={`h-2 w-2 rounded-full ${style.iconBg.replace("bg-", "bg-").replace("-100", "-500")}`} />
      <span className="text-[var(--color-muted-text)]">{label}</span>
      <span className="font-mono font-medium text-[var(--color-dark-text)]">
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
    <li className={`overflow-hidden rounded-xl border ${style.border} bg-white transition-shadow hover:shadow-sm`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
          <SeverityIcon className={`h-5 w-5 ${style.iconColor}`} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ring-1 ring-inset ${style.badge}`}>
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
              <span className="font-medium text-[var(--color-dark-text)]">
                {formatPct(anomaly.detectionConfidence)}
              </span>
            </span>
          </div>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--color-dark-text)]">
            {anomaly.title}
          </h3>
          {!open && (
            <p className="mt-1 line-clamp-1 text-xs text-[var(--color-muted-text)]">
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

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/40 p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:border-r lg:border-slate-200 lg:pr-4">
              <Block label="What we detected">
                <p>{anomaly.body}</p>
              </Block>
              <Block label="Investigation detail">
                <p>{anomaly.expandedDetails}</p>
              </Block>
              <Block label="Affected entities">
                <div className="flex flex-wrap gap-1.5">
                  {anomaly.affectedEntities.map((e, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-mono text-[var(--color-dark-text)] ring-1 ring-inset ring-slate-200"
                    >
                      <span className="text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                        {e.kind}
                      </span>
                      <span>{e.id}</span>
                    </span>
                  ))}
                </div>
              </Block>
            </div>
            <div className="lg:pl-1">
              <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
                Suggested action
              </div>
              <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3">
                {agent && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[var(--color-accent-blue)]">
                      <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
                        Dispatch
                      </div>
                      <div className="truncate text-xs font-semibold text-[var(--color-dark-text)]">
                        {agent.name}
                      </div>
                    </div>
                  </div>
                )}
                <p className="mt-2 text-[11px] leading-snug text-[var(--color-muted-text)]">
                  {anomaly.suggestedAction}
                </p>
                <DispatchButton state={dispatchState} onClick={dispatchAgent} />
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
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

function DispatchButton({ state, onClick }) {
  if (state === "idle") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-accent-blue)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600"
      >
        Dispatch Agent
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    );
  }
  if (state === "acknowledged") {
    return (
      <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
        Agent acknowledged
      </div>
    );
  }
  if (state === "working") {
    return (
      <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
        Working on it...
      </div>
    );
  }
  return (
    <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
      Resolved · agent report posted
    </div>
  );
}
