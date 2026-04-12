import { useState } from "react";
import TabNav from "./components/TabNav";
import Dashboard from "./tabs/dashboard/Dashboard";
import MissionControl from "./tabs/mission/MissionControl";
import Placeholder from "./tabs/Placeholder";

const TAB_CONTENT = {
  dashboard: <Dashboard />,
  mission: <MissionControl />,
  agent: (
    <Placeholder
      title="TrustReply Agent"
      description="Interactive AI agent that answers customer security questions, with a side-by-side reasoning panel showing classify → map → retrieve → draft."
    />
  ),
  data: (
    <Placeholder
      title="Data Model"
      description="Snowflake schema viewer with DDL and sample data for control_inventory, evidence_submissions, and questionnaire_responses."
    />
  ),
  build: (
    <Placeholder
      title="How I Built This"
      description="Design decisions, questions I'd ask Josh, honest knowledge gaps, and an FAQ — the product-thinking tab."
    />
  ),
};

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-light-bg)]">
      <TabNav active={active} onChange={setActive} />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          {TAB_CONTENT[active]}
        </div>
      </main>
      <footer className="border-t border-slate-800 bg-slate-950 py-3 text-center text-[11px] text-[var(--color-muted-text)]">
        TrustReply demo · Built with mock data · Real schemas, real customers, real
        product thinking
      </footer>
    </div>
  );
}
