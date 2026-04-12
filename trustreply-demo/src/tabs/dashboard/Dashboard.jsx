import KpiCards from "./KpiCards";
import QuestionnaireTable from "./QuestionnaireTable";
import ControlGrid from "./ControlGrid";
import PipelineDemo from "./PipelineDemo";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
          Trust Dashboard
        </h1>
        <p className="mt-0.5 text-xs text-[var(--color-muted-text)]">
          Real-time view of audit readiness, customer questionnaires, and control health.
          Hover any{" "}
          <span className="font-mono text-blue-300">i</span> for context.
        </p>
      </div>
      <PipelineDemo />
      <KpiCards />
      <QuestionnaireTable />
      <ControlGrid />
    </div>
  );
}
