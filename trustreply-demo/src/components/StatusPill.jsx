// Status pill component — color-coded by status value
// Conventions from context doc:
//   green  = active / completed / current
//   yellow = needs_review / needs_update
//   blue   = in_progress
//   gray   = pending / deprecated
const STYLES = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  current: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  needs_review: "bg-amber-50 text-amber-700 ring-amber-200",
  needs_update: "bg-amber-50 text-amber-700 ring-amber-200",
  in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  pending: "bg-slate-100 text-slate-600 ring-slate-200",
  deprecated: "bg-slate-100 text-slate-600 ring-slate-200",
  expired: "bg-red-50 text-red-700 ring-red-200",
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
  const cls = STYLES[status] ?? "bg-slate-100 text-slate-600 ring-slate-200";
  const label = LABELS[status] ?? status;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {label}
    </span>
  );
}
