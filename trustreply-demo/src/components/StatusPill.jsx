// Status pill component — color-coded by status value (dark theme variant).
const STYLES = {
  active: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  completed: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  current: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  needs_review: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  needs_update: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  in_progress: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  pending: "bg-slate-700/40 text-slate-300 ring-slate-600/50",
  deprecated: "bg-slate-700/40 text-slate-300 ring-slate-600/50",
  expired: "bg-red-500/15 text-red-300 ring-red-500/30",
};

const LABELS = {
  active: "Active",
  completed: "Completed",
  current: "Current",
  needs_review: "Needs Review",
  needs_update: "Needs Update",
  in_progress: "In Progress",
  pending: "Pending",
  deprecated: "Deprecated",
  expired: "Expired",
};

export default function StatusPill({ status }) {
  const cls = STYLES[status] ?? "bg-slate-700/40 text-slate-300 ring-slate-600/50";
  const label = LABELS[status] ?? status;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${cls}`}
    >
      {label}
    </span>
  );
}
