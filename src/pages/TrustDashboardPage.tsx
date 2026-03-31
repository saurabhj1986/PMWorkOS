import { useMemo, useState } from "react";
import {
  FRAMEWORKS,
  CONTROLS,
  EVIDENCE,
  ASSETS,
  ALERTS,
  MONTHLY_TRENDS,
  type Severity,
  type ControlStatus,
  type EvidenceGrade,
} from "@/data/trustSeed";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const severityBg: Record<Severity, string> = {
  critical: "bg-red-500/15 text-red-300 border-red-500/30",
  high: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  low: "bg-green-500/15 text-green-300 border-green-500/30",
};
const statusColor: Record<ControlStatus, string> = {
  effective: "bg-green-500/15 text-green-300",
  partially_effective: "bg-yellow-500/15 text-yellow-300",
  not_effective: "bg-red-500/15 text-red-300",
  not_assessed: "bg-zinc-500/15 text-zinc-400",
};
const statusLabel: Record<ControlStatus, string> = {
  effective: "Effective",
  partially_effective: "Partial",
  not_effective: "Not effective",
  not_assessed: "Not assessed",
};
const gradeColor: Record<EvidenceGrade, string> = {
  A: "bg-green-500/15 text-green-300",
  B: "bg-blue-500/15 text-blue-300",
  C: "bg-yellow-500/15 text-yellow-300",
  F: "bg-red-500/15 text-red-300",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function daysAgo(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date("2026-03-31");
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── SVG: Circular Gauge ──────────────────────────────────────────────────────

function TrustGauge({ score, prevScore }: { score: number; prevScore: number }) {
  const color = score >= 85 ? "#22c55e" : score >= 70 ? "#f59e0b" : "#ef4444";
  const delta = score - prevScore;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3f3f46" strokeWidth="2.5" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray={`${score} 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-xs text-zinc-500">/ 100</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className={`text-sm font-medium ${delta >= 0 ? "text-green-400" : "text-red-400"}`}>
          {delta >= 0 ? "+" : ""}{delta} pts
        </span>
        <span className="text-xs text-zinc-500">vs last month</span>
      </div>
      <p className="text-xs text-zinc-500 mt-1">
        {score >= 85 ? "Strong posture" : score >= 70 ? "Needs attention" : "At risk"}
      </p>
    </div>
  );
}

// ─── SVG: Horizontal Stacked Bar ──────────────────────────────────────────────

function StackedBar({ data }: { data: { label: string; count: number; color: string }[] }) {
  const total = data.reduce((a, d) => a + d.count, 0);
  if (total === 0) return null;
  let x = 0;
  return (
    <div>
      <svg viewBox="0 0 400 24" className="w-full rounded-lg overflow-visible">
        {data.map((d) => {
          const w = (d.count / total) * 400;
          const rect = (
            <rect key={d.label} x={x} y={0} width={Math.max(w, 0)} height={24} rx={x === 0 ? 6 : 0} fill={d.color} />
          );
          x += w;
          return rect;
        })}
      </svg>
      <div className="flex flex-wrap gap-4 mt-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
            {d.label}: {d.count} ({total > 0 ? Math.round((d.count / total) * 100) : 0}%)
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SVG: Trend Line Chart ────────────────────────────────────────────────────

function TrendChart({ trends }: { trends: typeof MONTHLY_TRENDS }) {
  const W = 520;
  const H = 140;
  const pad = { top: 16, right: 16, bottom: 32, left: 42 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const allVals = trends.flatMap((t) => [t.overall, t.soc2, t.iso27001, t.hipaa]);
  const minV = Math.min(...allVals) - 5;
  const maxV = Math.max(...allVals) + 5;
  const toX = (i: number) => pad.left + (i / (trends.length - 1)) * cW;
  const toY = (v: number) => pad.top + cH * (1 - (v - minV) / (maxV - minV));

  const lines: { key: string; color: string; values: number[] }[] = [
    { key: "Overall", color: "#a78bfa", values: trends.map((t) => t.overall) },
    { key: "SOC 2", color: "#22c55e", values: trends.map((t) => t.soc2) },
    { key: "ISO 27001", color: "#3b82f6", values: trends.map((t) => t.iso27001) },
    { key: "HIPAA", color: "#f59e0b", values: trends.map((t) => t.hipaa) },
  ];

  const yticks = [minV, Math.round((minV + maxV) / 2), maxV];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
      {yticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={W - pad.right} y1={toY(t)} y2={toY(t)} stroke="#3f3f46" strokeWidth={1} strokeDasharray="3 3" />
          <text x={pad.left - 6} y={toY(t) + 4} textAnchor="end" fontSize={9} fill="#71717a">{t}</text>
        </g>
      ))}
      {lines.map((line) => {
        const d = line.values
          .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
          .join(" ");
        return <path key={line.key} d={d} fill="none" stroke={line.color} strokeWidth={2} />;
      })}
      {/* dots on last point */}
      {lines.map((line) => {
        const last = line.values.length - 1;
        return <circle key={`dot-${line.key}`} cx={toX(last)} cy={toY(line.values[last])} r={3} fill={line.color} />;
      })}
      {/* month labels */}
      {trends.map((t, i) => (
        <text key={t.month} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#71717a">
          {t.month.slice(0, 3)}
        </text>
      ))}
      {/* legend */}
      {lines.map((line, i) => {
        const lx = pad.left + i * 90;
        return (
          <g key={`legend-${line.key}`}>
            <line x1={lx} x2={lx + 16} y1={H - 0} y2={H - 0} stroke={line.color} strokeWidth={2} />
            <text x={lx + 20} y={H + 3} fontSize={9} fill="#a1a1aa">{line.key}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── SVG: Evidence Grade Bar Chart ────────────────────────────────────────────

function GradeBarChart({ gradeCounts }: { gradeCounts: Record<EvidenceGrade, number> }) {
  const grades: EvidenceGrade[] = ["A", "B", "C", "F"];
  const colors: Record<EvidenceGrade, string> = { A: "#22c55e", B: "#3b82f6", C: "#f59e0b", F: "#ef4444" };
  const maxCount = Math.max(...grades.map((g) => gradeCounts[g]), 1);
  const barW = 40;
  const gap = 24;
  const chartH = 80;
  const W = grades.length * (barW + gap) + 20;
  const H = chartH + 30;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs overflow-visible">
      {grades.map((g, i) => {
        const x = 10 + i * (barW + gap);
        const h = Math.max(4, (gradeCounts[g] / maxCount) * chartH);
        return (
          <g key={g}>
            <rect x={x} y={chartH - h} width={barW} height={h} rx={4} fill={colors[g]} opacity={0.85} />
            <text x={x + barW / 2} y={chartH - h - 6} textAnchor="middle" fontSize={11} fill="#e4e4e7" fontWeight="600">
              {gradeCounts[g]}
            </text>
            <text x={x + barW / 2} y={chartH + 16} textAnchor="middle" fontSize={12} fill="#a1a1aa" fontWeight="600">
              {g}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── SVG: Compliance Bar ──────────────────────────────────────────────────────

function ComplianceBar({ pct }: { pct: number }) {
  const color = pct >= 85 ? "#22c55e" : pct >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 100 8" className="w-20 rounded overflow-visible">
        <rect x={0} y={0} width={100} height={8} rx={4} fill="#3f3f46" />
        <rect x={0} y={0} width={pct} height={8} rx={4} fill={color} />
      </svg>
      <span className="text-sm font-medium" style={{ color }}>{pct}%</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = "overview" | "controls" | "evidence" | "assets";

export function TrustDashboardPage() {
  const [tab, setTab] = useState<TabId>("overview");

  // ── Computed metrics ────────────────────────────────────────────────────────
  const currentTrend = MONTHLY_TRENDS[MONTHLY_TRENDS.length - 1];
  const prevTrend = MONTHLY_TRENDS[MONTHLY_TRENDS.length - 2];

  const controlStats = useMemo(() => {
    const byStatus: Record<ControlStatus, number> = { effective: 0, partially_effective: 0, not_effective: 0, not_assessed: 0 };
    let automated = 0;
    for (const c of CONTROLS) {
      byStatus[c.status]++;
      if (c.automationLevel === "fully_automated") automated++;
    }
    return { byStatus, automated, total: CONTROLS.length, effectivePct: Math.round((byStatus.effective / CONTROLS.length) * 100) };
  }, []);

  const evidenceStats = useMemo(() => {
    const byGrade: Record<EvidenceGrade, number> = { A: 0, B: 0, C: 0, F: 0 };
    let current = 0;
    let automatedSrc = 0;
    for (const e of EVIDENCE) {
      byGrade[e.aiGrade]++;
      if (e.freshnessStatus === "current") current++;
      if (e.source.startsWith("Automated")) automatedSrc++;
    }
    return {
      byGrade,
      total: EVIDENCE.length,
      currentPct: Math.round((current / EVIDENCE.length) * 100),
      automatedPct: Math.round((automatedSrc / EVIDENCE.length) * 100),
    };
  }, []);

  const openAlerts = useMemo(() => ALERTS.filter((a) => a.status !== "resolved"), []);
  const alertsBySeverity = useMemo(() => {
    const m: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const a of openAlerts) m[a.severity]++;
    return m;
  }, [openAlerts]);

  // Gap analysis: controls mapped to only 1 framework vs 3+
  const gapAnalysis = useMemo(() => {
    const single = CONTROLS.filter((c) => c.frameworks.length === 1);
    const broad = CONTROLS.filter((c) => c.frameworks.length >= 3);
    return { single, broad };
  }, []);

  // ── Tab content ─────────────────────────────────────────────────────────────

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "controls", label: "Controls" },
    { id: "evidence", label: "Evidence" },
    { id: "assets", label: "Assets" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Trust Intelligence</h1>
        <p className="text-zinc-400 mt-1">
          CISO-ready posture view — {CONTROLS.length} controls across {FRAMEWORKS.filter((f) => f.status === "active").length} active frameworks
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Data pipeline: GRC tools → Snowpipe → Snowflake RAW → Analytical Layer → Cortex AI Grading
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex rounded-lg border border-surface-border p-0.5 bg-surface w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.id ? "bg-accent text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════ OVERVIEW TAB ═══════════ */}
      {tab === "overview" && (
        <>
          {/* KPI row */}
          <section className="grid gap-4 md:grid-cols-4">
            {/* Trust Score */}
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5 flex justify-center">
              <TrustGauge score={currentTrend.overall} prevScore={prevTrend.overall} />
            </div>

            {/* Controls */}
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Controls</p>
              <p className="text-3xl font-semibold text-white mt-2">{controlStats.total}</p>
              <p className="text-sm text-zinc-400 mt-1">
                <span className="text-gain">{controlStats.effectivePct}%</span> effective
              </p>
              <div className="mt-3 space-y-1 text-xs text-zinc-500">
                <p>Fully automated: <span className="text-zinc-300">{controlStats.automated}</span></p>
                <p>Partially effective: <span className="text-yellow-400">{controlStats.byStatus.partially_effective}</span></p>
                <p>Not effective: <span className="text-red-400">{controlStats.byStatus.not_effective}</span></p>
              </div>
            </div>

            {/* Evidence Freshness */}
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Evidence freshness</p>
              <p className="text-3xl font-semibold text-gain mt-2">{evidenceStats.currentPct}%</p>
              <p className="text-sm text-zinc-400 mt-1">current ({EVIDENCE.filter((e) => e.freshnessStatus === "current").length} of {evidenceStats.total})</p>
              <div className="mt-3 space-y-1 text-xs text-zinc-500">
                <p>Automated sources: <span className="text-zinc-300">{evidenceStats.automatedPct}%</span></p>
                <p>Stale (&gt;60 days): <span className="text-red-400">{EVIDENCE.filter((e) => e.freshnessStatus === "stale").length}</span></p>
              </div>
            </div>

            {/* Alerts */}
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Open alerts</p>
              <p className="text-3xl font-semibold text-white mt-2">{openAlerts.length}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["critical", "high", "medium", "low"] as Severity[]).map((s) =>
                  alertsBySeverity[s] > 0 ? (
                    <Badge key={s} className={severityBg[s]}>
                      {alertsBySeverity[s]} {s}
                    </Badge>
                  ) : null
                )}
              </div>
            </div>
          </section>

          {/* Framework Compliance Matrix */}
          <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
            <h2 className="text-lg font-medium text-white">Framework compliance</h2>
            <p className="text-sm text-zinc-400 mt-1">Cross-framework posture with audit dates and evidence coverage</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-zinc-500 text-xs uppercase">
                  <tr>
                    <th className="py-2 pr-4">Framework</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Compliance</th>
                    <th className="py-2 pr-4">Controls</th>
                    <th className="py-2 pr-4">Evidence coverage</th>
                    <th className="py-2">Next audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {FRAMEWORKS.map((fw) => (
                    <tr key={fw.id}>
                      <td className="py-3 text-zinc-200 font-medium">{fw.name}</td>
                      <td className="py-3">
                        <Badge className={fw.status === "active" ? "bg-green-500/15 text-green-300" : "bg-zinc-500/15 text-zinc-400"}>
                          {fw.status}
                        </Badge>
                      </td>
                      <td className="py-3"><ComplianceBar pct={fw.compliancePct} /></td>
                      <td className="py-3 text-zinc-400">{fw.controlsMapped}</td>
                      <td className="py-3"><ComplianceBar pct={fw.evidenceCoverage} /></td>
                      <td className="py-3 text-zinc-400">{fw.nextAuditDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Trend + Alerts side by side */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Monthly Trend */}
            <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <h2 className="text-lg font-medium text-white">Trust posture trend</h2>
              <p className="text-sm text-zinc-400 mt-1">6-month rolling scores by framework</p>
              <div className="mt-4 overflow-x-auto">
                <div className="min-w-[480px]">
                  <TrendChart trends={MONTHLY_TRENDS} />
                </div>
              </div>
            </section>

            {/* Active Alerts */}
            <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <h2 className="text-lg font-medium text-white">Active alerts</h2>
              <p className="text-sm text-zinc-400 mt-1">Sorted by severity — generated by Snowflake tasks & streams</p>
              <div className="mt-4 space-y-2 max-h-72 overflow-y-auto">
                {openAlerts
                  .sort((a, b) => {
                    const order: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
                    return order[a.severity] - order[b.severity];
                  })
                  .map((alert) => (
                    <div key={alert.id} className="rounded-lg border border-surface-border bg-surface p-3">
                      <div className="flex items-start gap-2">
                        <Badge className={severityBg[alert.severity]}>{alert.severity}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-zinc-200 font-medium">{alert.title}</p>
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{alert.description}</p>
                        </div>
                        <Badge className={alert.status === "open" ? "bg-red-500/10 text-red-300" : "bg-yellow-500/10 text-yellow-300"}>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Control Distribution + Evidence Quality side by side */}
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <h2 className="text-lg font-medium text-white">Control status distribution</h2>
              <p className="text-sm text-zinc-400 mt-1">{CONTROLS.length} controls across all frameworks</p>
              <div className="mt-4">
                <StackedBar
                  data={[
                    { label: "Effective", count: controlStats.byStatus.effective, color: "#22c55e" },
                    { label: "Partial", count: controlStats.byStatus.partially_effective, color: "#f59e0b" },
                    { label: "Not effective", count: controlStats.byStatus.not_effective, color: "#ef4444" },
                    { label: "Not assessed", count: controlStats.byStatus.not_assessed, color: "#71717a" },
                  ]}
                />
              </div>
            </section>

            <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <h2 className="text-lg font-medium text-white">Evidence AI quality grades</h2>
              <p className="text-sm text-zinc-400 mt-1">Cortex-powered grading of {evidenceStats.total} evidence items</p>
              <div className="mt-4 flex items-end justify-center">
                <GradeBarChart gradeCounts={evidenceStats.byGrade} />
              </div>
            </section>
          </div>

          {/* Cross-framework gap analysis */}
          <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
            <h2 className="text-lg font-medium text-white">Cross-framework gap analysis</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Single-framework controls are coverage risks. Multi-framework controls provide broad posture lift.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-red-400 mb-2">Single-framework only ({gapAnalysis.single.length})</p>
                <div className="space-y-1">
                  {gapAnalysis.single.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500 font-mono text-xs w-10">{c.id}</span>
                      <span className="text-zinc-300">{c.name}</span>
                      <Badge className={statusColor[c.status]}>{statusLabel[c.status]}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-green-400 mb-2">Broad coverage — 3+ frameworks ({gapAnalysis.broad.length})</p>
                <div className="space-y-1">
                  {gapAnalysis.broad.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500 font-mono text-xs w-10">{c.id}</span>
                      <span className="text-zinc-300">{c.name}</span>
                      <span className="text-xs text-zinc-500">{c.frameworks.length} frameworks</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════ CONTROLS TAB ═══════════ */}
      {tab === "controls" && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <h2 className="text-lg font-medium text-white">Control inventory</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Mirrors <code className="text-zinc-500">TRUST_DB.ANALYTICS.CONTROL_INVENTORY</code> in Snowflake
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-zinc-500 text-xs uppercase">
                <tr>
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Control</th>
                  <th className="py-2 pr-3">Owner</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Risk</th>
                  <th className="py-2 pr-3">AI grade</th>
                  <th className="py-2 pr-3">Automation</th>
                  <th className="py-2 pr-3">Frameworks</th>
                  <th className="py-2">Last evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {CONTROLS.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 text-zinc-500 font-mono text-xs">{c.id}</td>
                    <td className="py-3 text-zinc-200 font-medium max-w-[200px]">
                      <p>{c.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{c.description}</p>
                    </td>
                    <td className="py-3 text-zinc-400">{c.owner}</td>
                    <td className="py-3"><Badge className={statusColor[c.status]}>{statusLabel[c.status]}</Badge></td>
                    <td className="py-3"><Badge className={severityBg[c.riskLevel]}>{c.riskLevel}</Badge></td>
                    <td className="py-3"><Badge className={gradeColor[c.evidenceQuality]}>{c.evidenceQuality}</Badge></td>
                    <td className="py-3 text-xs text-zinc-400">
                      {c.automationLevel === "fully_automated" ? "Full" : c.automationLevel === "semi_automated" ? "Semi" : "Manual"}
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.frameworks.map((f) => (
                          <span key={f} className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                            {FRAMEWORKS.find((fw) => fw.id === f)?.shortName ?? f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 text-xs">
                      <span className={daysAgo(c.lastEvidenceDate) > 60 ? "text-red-400" : daysAgo(c.lastEvidenceDate) > 30 ? "text-yellow-400" : "text-zinc-400"}>
                        {c.lastEvidenceDate} ({daysAgo(c.lastEvidenceDate)}d ago)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ═══════════ EVIDENCE TAB ═══════════ */}
      {tab === "evidence" && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <h2 className="text-lg font-medium text-white">Evidence submissions</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Mirrors <code className="text-zinc-500">TRUST_DB.ANALYTICS.EVIDENCE_SUBMISSIONS</code> — AI-graded via Snowflake Cortex
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-zinc-500 text-xs uppercase">
                <tr>
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Control</th>
                  <th className="py-2 pr-3">Title</th>
                  <th className="py-2 pr-3">Source</th>
                  <th className="py-2 pr-3">AI grade</th>
                  <th className="py-2 pr-3">AI notes</th>
                  <th className="py-2 pr-3">Freshness</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {EVIDENCE.map((e) => {
                  const freshBadge =
                    e.freshnessStatus === "current" ? "bg-green-500/15 text-green-300" :
                    e.freshnessStatus === "expiring_soon" ? "bg-yellow-500/15 text-yellow-300" :
                    "bg-red-500/15 text-red-300";
                  return (
                    <tr key={e.id}>
                      <td className="py-3 text-zinc-500 font-mono text-xs">{e.id}</td>
                      <td className="py-3 text-zinc-400 font-mono text-xs">{e.controlId}</td>
                      <td className="py-3 text-zinc-200 max-w-[200px] truncate">{e.title}</td>
                      <td className="py-3 text-xs text-zinc-400">{e.source}</td>
                      <td className="py-3"><Badge className={gradeColor[e.aiGrade]}>{e.aiGrade}</Badge></td>
                      <td className="py-3 text-xs text-zinc-500 max-w-[240px]">
                        <p className="line-clamp-2">{e.aiNotes}</p>
                      </td>
                      <td className="py-3"><Badge className={freshBadge}>{e.freshnessStatus.replace("_", " ")}</Badge></td>
                      <td className="py-3 text-xs text-zinc-400">{e.submittedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ═══════════ ASSETS TAB ═══════════ */}
      {tab === "assets" && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <h2 className="text-lg font-medium text-white">System asset inventory</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Mirrors <code className="text-zinc-500">TRUST_DB.ANALYTICS.SYSTEM_ASSET_INVENTORY</code> — fed by Wiz, AWS, Okta APIs
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-zinc-500 text-xs uppercase">
                <tr>
                  <th className="py-2 pr-4">Asset</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Owner</th>
                  <th className="py-2 pr-4">Risk score</th>
                  <th className="py-2 pr-4">Controls covered</th>
                  <th className="py-2">Last scanned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {ASSETS.sort((a, b) => b.riskScore - a.riskScore).map((a) => {
                  const riskColor = a.riskScore >= 40 ? "bg-red-500/15 text-red-300" : a.riskScore >= 25 ? "bg-yellow-500/15 text-yellow-300" : "bg-green-500/15 text-green-300";
                  return (
                    <tr key={a.id}>
                      <td className="py-3 text-zinc-200 font-medium">{a.name}</td>
                      <td className="py-3 text-zinc-400 text-xs">{a.type}</td>
                      <td className="py-3 text-zinc-400">{a.owner}</td>
                      <td className="py-3"><Badge className={riskColor}>{a.riskScore}</Badge></td>
                      <td className="py-3 text-zinc-300">{a.controlsCovered}</td>
                      <td className="py-3 text-xs text-zinc-400">{a.lastScanned}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Methodology */}
      <section className="rounded-xl border border-surface-border/50 bg-surface-raised/50 p-4">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Architecture:</strong> This prototype demonstrates a Trust Intelligence Layer built on Snowflake,
          consuming data from GRC tools (Anecdotes/Drata), security scanners (Wiz, AWS Config), identity providers (Okta, CyberArk),
          and CI/CD pipelines (GitHub). Evidence is AI-graded via Snowflake Cortex. Alerts are generated by Snowflake Streams & Tasks
          monitoring freshness SLAs, coverage thresholds, and quality scores. Dashboard data flows through Snowpipe → RAW → ANALYTICS
          schemas using Dynamic Tables for real-time materialization. Not a GRC system of record — an intelligence layer on top of one.
        </p>
      </section>
    </div>
  );
}
