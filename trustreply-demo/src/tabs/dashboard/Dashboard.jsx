import { useState, useCallback } from "react";
import KpiCards from "./KpiCards";
import QuestionnaireTable from "./QuestionnaireTable";
import ControlGrid from "./ControlGrid";
import PipelineDemo from "./PipelineDemo";

export default function Dashboard() {
  const [highlightControlId, setHighlightControlId] = useState(null);

  const handleStageChange = useCallback((idx, controlId) => {
    setHighlightControlId(controlId ?? null);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
          Trust Dashboard
        </h1>
        <p className="mt-0.5 text-xs text-[var(--color-muted-text)]">
          Customer due diligence workflow — from inbound questionnaire to approved response.
          Hover any{" "}
          <span className="font-mono text-blue-300">i</span> for context.
        </p>
      </div>
      <PipelineDemo onStageChange={handleStageChange} />
      <KpiCards />
      <QuestionnaireTable />
      <ControlGrid highlightId={highlightControlId} />
    </div>
  );
}
