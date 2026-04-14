import { questionnaires } from "../../data/questionnaires";
import StatusPill from "../../components/StatusPill";
import Tooltip from "../../components/Tooltip";

const COLUMNS = [
  { key: "customer", label: "Customer", tooltip: "Enterprise customer (or prospect) submitting the security questionnaire. Sample enterprise customers used in this demo." },
  { key: "type", label: "Type", tooltip: "Questionnaire format. CAIQ v4 = Cloud Security Alliance Consensus Assessment. SIG = Shared Assessments. Custom = customer-built." },
  { key: "total", label: "Total", tooltip: "Total questions in the questionnaire." },
  { key: "answered", label: "Answered", tooltip: "Questions answered so far. Fed by TrustReply Agent + analyst review." },
  { key: "reused", label: "Reused", tooltip: "Answers reused from previously approved responses. Higher reuse = faster turnaround. Target: ≥ 80%." },
  { key: "status", label: "Status", tooltip: "Lifecycle stage. Pending = not started. In Progress = partially answered. Completed = signed off." },
  { key: "dueDate", label: "Due", tooltip: "Customer-stated deadline. Missing this typically stalls the deal." },
];

const STATUS_BAR_COLOR = {
  completed: "bg-emerald-500",
  in_progress: "bg-blue-500",
  pending: "bg-slate-600",
};

function ProgressBar({ answered, total, status }) {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  const color = STATUS_BAR_COLOR[status] ?? "bg-slate-600";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-[var(--color-muted-text)]">
        {pct}%
      </span>
    </div>
  );
}

export default function QuestionnaireTable() {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-serif text-sm font-semibold text-[var(--color-dark-text)]">
          Customer Questionnaire Tracker
        </h2>
        <span className="text-[11px] text-[var(--color-muted-text)]">
          {questionnaires.length} active engagements
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-[var(--color-card-bg)] shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800/60">
            <thead className="bg-slate-900/60">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted-text)]"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <Tooltip text={col.tooltip} />
                    </span>
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted-text)]"
                >
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {questionnaires.map((q) => (
                <tr key={q.customer} className="transition-colors hover:bg-slate-800/40">
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-medium text-slate-100">
                    {q.customer}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-[var(--color-muted-text)]">
                    {q.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-mono text-slate-200">
                    {q.total}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-mono text-slate-200">
                    {q.answered}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-mono text-slate-200">
                    {q.reused}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs">
                    <StatusPill status={q.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-mono text-[var(--color-muted-text)]">
                    {q.dueDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs">
                    <ProgressBar
                      answered={q.answered}
                      total={q.total}
                      status={q.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
