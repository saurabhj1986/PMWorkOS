import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/seed";
import { formatUsd, formatUsd2, formatCentsPerDollar } from "@/lib/format";
import { bestCardForCategory, optimizeSpend } from "@/lib/optimize";
import { baseCentsPerDollar } from "@/lib/valuation";
import { usePrefsStore } from "@/stores/prefsStore";
import { useSpendStore } from "@/stores/spendStore";
import { useWalletStore } from "@/stores/walletStore";

// ─── Tiny inline SVG bar chart ────────────────────────────────────────────────
interface BarChartProps {
  bars: { label: string; current: number; optimal: number; spend: number }[];
}

function EarnRateBarChart({ bars }: BarChartProps) {
  const maxVal = Math.max(...bars.map((b) => b.optimal), 0.01);
  const height = 180;
  const barW = 28;
  const gap = 12;
  const groupW = barW * 2 + gap;
  const leftPad = 42;
  const rightPad = 16;
  const topPad = 12;
  const bottomPad = 52;
  const chartH = height - topPad - bottomPad;
  const totalW = leftPad + bars.length * (groupW + 16) + rightPad;

  const toY = (v: number) => topPad + chartH * (1 - v / maxVal);

  // Y-axis tick values
  const ticks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  return (
    <svg
      viewBox={`0 0 ${totalW} ${height}`}
      className="w-full overflow-visible"
      aria-label="Earn rate by category"
    >
      {/* Grid lines */}
      {ticks.map((t) => {
        const y = toY(t);
        return (
          <g key={t}>
            <line
              x1={leftPad}
              x2={totalW - rightPad}
              y1={y}
              y2={y}
              stroke="#3f3f46"
              strokeWidth={1}
              strokeDasharray={t === 0 ? "0" : "3 3"}
            />
            <text
              x={leftPad - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={9}
              fill="#71717a"
            >
              {t.toFixed(1)}¢
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {bars.map((b, i) => {
        const x = leftPad + i * (groupW + 16);
        const curH = Math.max(2, (b.current / maxVal) * chartH);
        const optH = Math.max(2, (b.optimal / maxVal) * chartH);
        const curY = toY(b.current);
        const optY = toY(b.optimal);
        const isGap = b.optimal > b.current + 0.1;
        return (
          <g key={b.label}>
            {/* Current bar */}
            <rect
              x={x}
              y={curY}
              width={barW}
              height={curH}
              rx={3}
              fill={isGap ? "#52525b" : "#22c55e"}
            />
            {/* Optimal bar */}
            <rect
              x={x + barW + gap}
              y={optY}
              width={barW}
              height={optH}
              rx={3}
              fill={isGap ? "#6366f1" : "#22c55e"}
              opacity={0.85}
            />
            {/* Category label */}
            <text
              x={x + groupW / 2}
              y={height - bottomPad + 14}
              textAnchor="middle"
              fontSize={8.5}
              fill="#a1a1aa"
            >
              {b.label.length > 8 ? b.label.slice(0, 7) + "…" : b.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={leftPad} y={height - 14} width={10} height={10} rx={2} fill="#52525b" />
      <text x={leftPad + 13} y={height - 5} fontSize={9} fill="#a1a1aa">Current</text>
      <rect x={leftPad + 65} y={height - 14} width={10} height={10} rx={2} fill="#6366f1" />
      <text x={leftPad + 78} y={height - 5} fontSize={9} fill="#a1a1aa">Optimal</text>
    </svg>
  );
}

// ─── Monthly projection sparkline ─────────────────────────────────────────────
interface SparklineProps {
  currentMonthly: number;
  optimalMonthly: number;
}

function ProjectionSparkline({ currentMonthly, optimalMonthly }: SparklineProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const W = 480;
  const H = 100;
  const pad = { top: 10, right: 16, bottom: 28, left: 48 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  // Cumulative values with slight seasonal variation
  const seasonalFactor = [0.9, 0.85, 0.95, 1.0, 1.05, 1.1, 1.05, 1.0, 0.95, 1.1, 1.2, 1.3];
  const currentCumulative = seasonalFactor.map((_, i) =>
    seasonalFactor.slice(0, i + 1).reduce((a, f) => a + f * currentMonthly, 0)
  );
  const optimalCumulative = seasonalFactor.map((_, i) =>
    seasonalFactor.slice(0, i + 1).reduce((a, f) => a + f * optimalMonthly, 0)
  );

  const maxVal = Math.max(...optimalCumulative);
  const toX = (i: number) => pad.left + (i / (months.length - 1)) * chartW;
  const toY = (v: number) => pad.top + chartH * (1 - v / maxVal);

  const currentPath = currentCumulative
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");
  const optimalPath = optimalCumulative
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");

  const yticks = [0, maxVal * 0.5, maxVal];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
      {yticks.map((t) => (
        <g key={t}>
          <line
            x1={pad.left}
            x2={W - pad.right}
            y1={toY(t)}
            y2={toY(t)}
            stroke="#3f3f46"
            strokeWidth={1}
            strokeDasharray={t === 0 ? "0" : "3 3"}
          />
          <text x={pad.left - 6} y={toY(t) + 4} textAnchor="end" fontSize={9} fill="#71717a">
            {formatUsd(t)}
          </text>
        </g>
      ))}
      {/* Optimal area fill */}
      <path
        d={`${optimalPath} L${toX(11)},${toY(0)} L${toX(0)},${toY(0)} Z`}
        fill="#6366f1"
        fillOpacity={0.08}
      />
      {/* Lines */}
      <path d={currentPath} fill="none" stroke="#52525b" strokeWidth={2} />
      <path d={optimalPath} fill="none" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 3" />
      {/* Month labels */}
      {months.map((m, i) =>
        i % 3 === 0 ? (
          <text key={m} x={toX(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="#71717a">
            {m}
          </text>
        ) : null
      )}
      {/* Legend */}
      <line x1={pad.left} x2={pad.left + 20} y1={H - 4} y2={H - 4} stroke="#52525b" strokeWidth={2} />
      <text x={pad.left + 23} y={H - 0} fontSize={9} fill="#a1a1aa">Current pace</text>
      <line x1={pad.left + 90} x2={pad.left + 110} y1={H - 4} y2={H - 4} stroke="#6366f1" strokeWidth={2} strokeDasharray="5 3" />
      <text x={pad.left + 113} y={H - 0} fontSize={9} fill="#a1a1aa">Optimized</text>
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function InsightsPage() {
  const cards = useWalletStore((s) => s.cards);
  const spendByCategory = useSpendStore((s) => s.spendByCategory);
  const includeSub = usePrefsStore((s) => s.includeSub);

  const categoryIds = useMemo(() => CATEGORIES.map((c) => c.id), []);

  // Current spend allocation (greedy best card)
  const { allocation: currentAlloc, totalValueDollars: currentValue } = useMemo(
    () => optimizeSpend(cards, spendByCategory, categoryIds, includeSub, "maximize"),
    [cards, spendByCategory, categoryIds, includeSub]
  );

  const totalSpend = useMemo(
    () => categoryIds.reduce((a, id) => a + (spendByCategory[id] ?? 0), 0),
    [categoryIds, spendByCategory]
  );

  // Potential value if user had all top cards (theoretical max using seed cards)
  // We compare against a "1x everything else" baseline to find gaps
  const categoryAnalysis = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const spend = spendByCategory[cat.id] ?? 0;
      const current = currentAlloc[cat.id];
      const best = bestCardForCategory(cards, cat.id, includeSub, "maximize");

      // Find baseline (worst card = 1x everything else ≈ cash)
      let baselineCpp = 0;
      for (const card of cards) {
        const { value } = baseCentsPerDollar(card, cat.id);
        if (value > 0 && (baselineCpp === 0 || value < baselineCpp)) baselineCpp = value;
      }
      if (baselineCpp === 0) baselineCpp = 1.0; // 1¢/$ fallback

      const currentCpp = current?.centsPerDollar ?? 0;
      const optimalCpp = best?.centsPerDollar ?? 0;
      const gapCpp = Math.max(0, optimalCpp - currentCpp);
      const annualGap = spend * (gapCpp / 100) * 12;

      const bestCard = best ? cards.find((c) => c.id === best.cardId) : undefined;
      const currentCard = current ? cards.find((c) => c.id === current.cardId) : undefined;

      return {
        id: cat.id,
        label: cat.label,
        spend,
        currentCpp,
        optimalCpp,
        gapCpp,
        annualGap,
        bestCard,
        currentCard,
      };
    }).filter((c) => c.spend > 0);
  }, [cards, spendByCategory, includeSub, currentAlloc]);

  // Efficiency score: current value / optimal value (same cards)
  const optimalValue = useMemo(() => {
    return categoryAnalysis.reduce((sum, c) => sum + c.spend * (c.optimalCpp / 100), 0);
  }, [categoryAnalysis]);

  const efficiencyScore = optimalValue > 0
    ? Math.round((currentValue / optimalValue) * 100)
    : 100;

  const totalAnnualGap = categoryAnalysis.reduce((s, c) => s + c.annualGap, 0) * 12;
  const topOpportunities = [...categoryAnalysis]
    .sort((a, b) => b.annualGap - a.annualGap)
    .slice(0, 4)
    .filter((c) => c.annualGap > 0);

  // Monthly numbers (monthly spend × earn rate)
  const currentMonthly = currentValue;
  const optimalMonthly = optimalValue;

  // Card-level contribution summary
  const cardContributions = useMemo(() => {
    const byCard: Record<string, { name: string; spend: number; value: number; categories: string[] }> = {};
    for (const cat of categoryAnalysis) {
      const cardId = currentAlloc[cat.id]?.cardId;
      if (!cardId) continue;
      const card = cards.find((c) => c.id === cardId);
      if (!card) continue;
      if (!byCard[cardId]) byCard[cardId] = { name: card.name, spend: 0, value: 0, categories: [] };
      byCard[cardId].spend += cat.spend;
      byCard[cardId].value += currentAlloc[cat.id]!.valueDollars;
      byCard[cardId].categories.push(cat.label);
    }
    return Object.values(byCard).sort((a, b) => b.value - a.value);
  }, [categoryAnalysis, currentAlloc, cards]);

  // Return rate
  const returnRate = totalSpend > 0 ? (currentValue / totalSpend) * 100 : 0;

  // Bar chart data
  const barData = categoryAnalysis.map((c) => ({
    label: c.label,
    current: c.currentCpp,
    optimal: c.optimalCpp,
    spend: c.spend,
  }));

  if (cards.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Insights</h1>
          <p className="text-zinc-400 mt-1">Data-driven analysis of your rewards strategy</p>
        </div>
        <div className="rounded-xl border border-surface-border bg-surface-raised p-8 text-center">
          <p className="text-zinc-400 text-sm">
            No wallet data yet.{" "}
            <Link to="/sync" className="text-accent hover:underline">
              Import your cards via CSV
            </Link>{" "}
            to unlock insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Insights</h1>
        <p className="text-zinc-400 mt-1">
          Data-driven analysis of your rewards strategy — {cards.length} cards, {categoryAnalysis.length} active spend categories
        </p>
      </div>

      {/* KPI row */}
      <section className="grid gap-4 md:grid-cols-4">
        {/* Efficiency score */}
        <div className="rounded-xl border border-surface-border bg-surface-raised p-5 flex flex-col items-center justify-center text-center">
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">Efficiency score</p>
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3f3f46" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={efficiencyScore >= 85 ? "#22c55e" : efficiencyScore >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="3"
                strokeDasharray={`${efficiencyScore} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{efficiencyScore}%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            {efficiencyScore >= 85 ? "Excellent" : efficiencyScore >= 60 ? "Good" : "Needs work"}
          </p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Monthly rewards</p>
          <p className="text-3xl font-semibold text-gain mt-2">{formatUsd2(currentValue)}</p>
          <p className="text-sm text-zinc-400 mt-1">
            on {formatUsd(totalSpend)} spend/mo
          </p>
          <p className="text-xs text-zinc-500 mt-3">Return rate: <span className="text-gain">{returnRate.toFixed(2)}%</span></p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Annual projection</p>
          <p className="text-3xl font-semibold text-white mt-2">{formatUsd(currentValue * 12)}</p>
          <p className="text-sm text-zinc-400 mt-1">at current allocation</p>
          <p className="text-xs text-zinc-500 mt-3">
            Optimized: <span className="text-violet-300">{formatUsd(optimalMonthly * 12)}</span>
          </p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Opportunity gap</p>
          <p className="text-3xl font-semibold text-amber-400 mt-2">{formatUsd(totalAnnualGap)}</p>
          <p className="text-sm text-zinc-400 mt-1">left on the table / yr</p>
          <p className="text-xs text-zinc-500 mt-3">
            {topOpportunities.length} category{topOpportunities.length !== 1 ? "ies" : "y"} improvable
          </p>
        </div>
      </section>

      {/* Earn rate chart */}
      {barData.length > 0 && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <h2 className="text-lg font-medium text-white">Earn rate by category</h2>
          <p className="text-sm text-zinc-400 mt-1">
            ¢ per dollar — current allocation vs. best available card. Grey/purple gap = opportunity.
          </p>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[480px]">
              <EarnRateBarChart bars={barData} />
            </div>
          </div>
        </section>
      )}

      {/* Annual projection */}
      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <h2 className="text-lg font-medium text-white">Cumulative rewards projection</h2>
        <p className="text-sm text-zinc-400 mt-1">
          12-month cumulative earnings — current vs. optimized allocation (with seasonal variation).
        </p>
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[480px]">
            <ProjectionSparkline currentMonthly={currentMonthly} optimalMonthly={optimalMonthly} />
          </div>
        </div>
      </section>

      {/* Opportunity gaps */}
      {topOpportunities.length > 0 && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white">Top opportunities</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Categories where a card switch would meaningfully lift your return.
              </p>
            </div>
            <Link to="/optimizer" className="text-sm text-accent hover:underline shrink-0">
              Open optimizer →
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {topOpportunities.map((opp, idx) => {
              const pct = opp.optimalCpp > 0
                ? Math.round(((opp.optimalCpp - opp.currentCpp) / opp.currentCpp) * 100)
                : 0;
              return (
                <div
                  key={opp.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-surface-border bg-surface p-4"
                >
                  <span className="text-xs font-bold text-zinc-500 w-5 shrink-0">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-zinc-100">{opp.label}</span>
                      {pct > 0 && (
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                          +{pct}% earn rate
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      {opp.currentCard
                        ? `Currently on ${opp.currentCard.name} (${formatCentsPerDollar(opp.currentCpp)})`
                        : `No card assigned`}
                      {opp.bestCard && opp.bestCard.id !== opp.currentCard?.id
                        ? ` → switch to ${opp.bestCard.name} (${formatCentsPerDollar(opp.optimalCpp)})`
                        : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-amber-400 font-medium">{formatUsd2(opp.annualGap * 12)}/yr</p>
                    <p className="text-xs text-zinc-500 mt-0.5">on {formatUsd(opp.spend)}/mo spend</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Card contribution table */}
      {cardContributions.length > 0 && (
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <h2 className="text-lg font-medium text-white">Card performance</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Contribution of each card to your monthly rewards under current optimal allocation.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-zinc-500 text-xs uppercase">
                <tr>
                  <th className="py-2 pr-4">Card</th>
                  <th className="py-2 pr-4">Routed spend</th>
                  <th className="py-2 pr-4">Monthly value</th>
                  <th className="py-2 pr-4">Effective rate</th>
                  <th className="py-2">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {cardContributions.map((c) => {
                  const rate = c.spend > 0 ? (c.value / c.spend) * 100 : 0;
                  const shareOfTotal = currentValue > 0 ? (c.value / currentValue) * 100 : 0;
                  return (
                    <tr key={c.name}>
                      <td className="py-3 text-zinc-200 font-medium">{c.name}</td>
                      <td className="py-3 text-zinc-400">{formatUsd(c.spend)}</td>
                      <td className="py-3">
                        <span className="text-gain">{formatUsd2(c.value)}</span>
                        <span className="text-zinc-600 text-xs ml-1">({shareOfTotal.toFixed(0)}%)</span>
                      </td>
                      <td className="py-3 text-zinc-300">{rate.toFixed(2)}%</td>
                      <td className="py-3 text-zinc-400 text-xs">
                        {c.categories.slice(0, 3).join(", ")}
                        {c.categories.length > 3 && ` +${c.categories.length - 3} more`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Methodology note */}
      <section className="rounded-xl border border-surface-border/50 bg-surface-raised/50 p-4">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Methodology:</strong> Earn rates use program cpp assumptions from seed data. Monthly spend inputs from the{" "}
          <Link to="/optimizer" className="text-accent hover:underline">Planning</Link> page.
          Opportunity gap = (optimal ¢/$ − current ¢/$) × monthly spend × 12. Seasonal projection applies
          fixed monthly multipliers; real spend will vary. Not financial advice.
        </p>
      </section>
    </div>
  );
}
