import KpiCards from "./KpiCards";
import QuestionnaireTable from "./QuestionnaireTable";
import ControlGrid from "./ControlGrid";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-dark-text)]">
          Trust Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted-text)]">
          Real-time view of audit readiness, customer questionnaires, and control health.
          Hover any{" "}
          <span className="font-mono text-[var(--color-accent-blue)]">i</span> for context.
        </p>
      </div>
      <KpiCards />
      <QuestionnaireTable />
      <ControlGrid />
    </div>
  );
}
