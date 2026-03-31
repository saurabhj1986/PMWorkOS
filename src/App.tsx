import { Route, Routes } from "react-router-dom";
import { NavLayout } from "@/components/NavLayout";
import { ComparePage } from "@/pages/ComparePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { OptimizerPage } from "@/pages/OptimizerPage";
import { TrustDashboardPage } from "@/pages/TrustDashboardPage";
import { SyncPage } from "@/pages/SyncPage";
import { TipsPage } from "@/pages/TipsPage";
import { WalletPage } from "@/pages/WalletPage";

export default function App() {
  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/sync" element={<SyncPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/optimizer" element={<OptimizerPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/trust" element={<TrustDashboardPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Route>
    </Routes>
  );
}
