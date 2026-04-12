import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import {
  computeTrustScore,
  formatPct,
  formatScore,
  BAND_LABELS,
  BAND_TOOLTIPS,
} from "../lib/trustScore";

/**
 * TrustScoreBadge — the unifying "should I trust this?" badge used across the
 * whole app. Renders the composite Trust Index plus a hover breakdown of the
 * 4 contributing factors (confidence, accuracy, freshness, benchmark).
 *
 * Props:
 *   inputs — { confidence, accuracy, freshness, benchmark }  (each 0..1)
 *   variant — "compact" (default) or "expanded" (for inspectors / cards)
 */
export default function TrustScoreBadge({ inputs, variant = "compact" }) {
  const [open, setOpen] = useState(false);
  const score = computeTrustScore(inputs);
  const { band } = score;

  const palette = BAND_PALETTE[band];
  const Icon = BAND_ICON[band];

  if (variant === "expanded") {
    return (
      <div
        className={`rounded-lg border ${palette.border} ${palette.bg} p-3`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-md ${palette.iconBg}`}
            >
              <Icon className={`h-4 w-4 ${palette.iconText}`} strokeWidth={2.5} />
            </div>
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-wide ${palette.label}`}>
                Trust Index
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`font-serif text-xl font-semibold ${palette.value}`}>
                  {formatScore(score.index)}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${palette.pill}`}
                >
                  {BAND_LABELS[band]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ScoreBreakdown score={score} />
      </div>
    );
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${palette.border} ${palette.bg} ${palette.value}`}
        aria-label={`Trust Index ${formatScore(score.index)} · ${BAND_LABELS[band]}`}
      >
        <Icon className={`h-3 w-3 ${palette.iconText}`} strokeWidth={2.5} />
        <span className="font-mono">Trust {formatScore(score.index)}</span>
        <span className={`text-[9px] font-bold uppercase ${palette.label}`}>
          {BAND_LABELS[band]}
        </span>
      </button>
      {open && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-lg bg-[var(--color-navy)] p-3 text-white shadow-xl"
        >
          <div className="font-mono text-[9px] uppercase tracking-wide text-blue-300">
            Trust scorecard
          </div>
          <div className="mt-1 text-[11px] leading-snug text-slate-200">
            {BAND_TOOLTIPS[band]}
          </div>
          <div className="mt-2 space-y-1 border-t border-slate-700/60 pt-2">
            <ScoreRow label="Confidence" value={score.confidence} />
            <ScoreRow label="Accuracy" value={score.accuracy} />
            <ScoreRow label="Freshness" value={score.freshness} />
            <ScoreRow label="Benchmark" value={score.benchmark} />
          </div>
        </div>
      )}
    </span>
  );
}

function ScoreBreakdown({ score }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
      <BreakdownRow label="Confidence" value={score.confidence} />
      <BreakdownRow label="Accuracy" value={score.accuracy} />
      <BreakdownRow label="Freshness" value={score.freshness} />
      <BreakdownRow label="Benchmark" value={score.benchmark} />
    </div>
  );
}

function BreakdownRow({ label, value }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          {label}
        </span>
        <span className="font-mono text-[11px] font-medium text-slate-700">
          {formatPct(value)}
        </span>
      </div>
      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ScoreRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-slate-100">{formatPct(value)}</span>
    </div>
  );
}

const BAND_PALETTE = {
  trusted: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-500",
    iconText: "text-white",
    label: "text-emerald-700",
    value: "text-emerald-800",
    pill: "bg-emerald-500 text-white",
  },
  review: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    iconBg: "bg-amber-500",
    iconText: "text-white",
    label: "text-amber-700",
    value: "text-amber-800",
    pill: "bg-amber-500 text-white",
  },
  flag: {
    border: "border-red-200",
    bg: "bg-red-50",
    iconBg: "bg-red-500",
    iconText: "text-white",
    label: "text-red-700",
    value: "text-red-800",
    pill: "bg-red-500 text-white",
  },
};

const BAND_ICON = {
  trusted: ShieldCheck,
  review: ShieldAlert,
  flag: ShieldX,
};
