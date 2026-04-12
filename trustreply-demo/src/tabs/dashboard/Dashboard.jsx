import { useState, useCallback } from "react";
import KpiCards from "./KpiCards";
import QuestionnaireTable from "./QuestionnaireTable";
import ControlGrid from "./ControlGrid";
import PipelineDemo from "./PipelineDemo";

// Pipeline stage 4 (idx 3) maps question to CC-05 Cryptography & Key Mgmt.
// From that stage onward, highlight the control in the grid.
const STAGE_CONTROL_MAP = { 3: "CC-05", 4: "CC-05", 5: "CC-05", 6: "CC-05", 7: "CC-05" };

export default function Dashboard() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const handleStageChange = useCallback((idx) => setActiveStageIdx(idx), []);

  const highlightControlId = STAGE_CONTROL_MAP[activeStageIdx] ?? null;

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
      <PipelineDemo onStageChange={handleStageChange} />
      <KpiCards />
      <QuestionnaireTable />
      <ControlGrid highlightId={highlightControlId} />
    </div>
  );
}
