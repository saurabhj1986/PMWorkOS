import { useState } from "react";
import TabNav from "./components/TabNav";
import Dashboard from "./tabs/dashboard/Dashboard";
import MissionControl from "./tabs/mission/MissionControl";
import AgentTab from "./tabs/agent/AgentTab";
import DataModelTab from "./tabs/data/DataModelTab";
import ArchitectureTab from "./tabs/architecture/ArchitectureTab";
import BuildTab from "./tabs/build/BuildTab";

const TAB_CONTENT = {
  dashboard: <Dashboard />,
  mission: <MissionControl />,
  agent: <AgentTab />,
  data: <DataModelTab />,
  architecture: <ArchitectureTab />,
  build: <BuildTab />,
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
