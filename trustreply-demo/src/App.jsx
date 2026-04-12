import { useState } from "react";
import TabNav from "./components/TabNav";
import Dashboard from "./tabs/dashboard/Dashboard";
import Placeholder from "./tabs/Placeholder";

const TAB_CONTENT = {
  dashboard: <Dashboard />,
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
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          {TAB_CONTENT[active]}
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-[var(--color-muted-text)]">
        TrustReply demo · Built with mock data · Real schemas, real customers, real
        product thinking
      </footer>
    </div>
  );
}
