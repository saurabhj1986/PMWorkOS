import { useMemo } from "react";
import { CATEGORIES } from "@/data/seed";
import { formatUsd, formatUsd2 } from "@/lib/format";
import { optimizeSpend, type EarningsGoal } from "@/lib/optimize";
import { usePrefsStore } from "@/stores/prefsStore";
import { useSpendStore } from "@/stores/spendStore";
import { useWalletStore } from "@/stores/walletStore";

const goals: { id: EarningsGoal; label: string; hint: string }[] = [
  {
    id: "maximize",
    label: "Maximize",
    hint: "Highest total value across all cards.",
  },
  {
    id: "cashback",
    label: "Cash back",
    hint: "Only cash-back cards compete per category.",
  },
  {
    id: "pointsOnly",
    label: "Points only",
    hint: "Transferable + crypto-style earners only.",
  },
];

export function OptimizerPage() {
  const cards = useWalletStore((s) => s.cards);
  const spendByCategory = useSpendStore((s) => s.spendByCategory);
  const setSpend = useSpendStore((s) => s.setSpend);
  const resetDemo = useSpendStore((s) => s.resetDemo);

  const includeSub = usePrefsStore((s) => s.includeSub);
  const setIncludeSub = usePrefsStore((s) => s.setIncludeSub);
  const earningsGoal = usePrefsStore((s) => s.earningsGoal);
  const setEarningsGoal = usePrefsStore((s) => s.setEarningsGoal);

  const categoryIds = useMemo(() => CATEGORIES.map((c) => c.id), []);

  const { allocation, totalValueDollars } = useMemo(
    () =>
      optimizeSpend(
        cards,
        spendByCategory,
        categoryIds,
        includeSub,
        earningsGoal
      ),
    [cards, spendByCategory, categoryIds, includeSub, earningsGoal]
  );

  const totalSpend = useMemo(
    () =>
      categoryIds.reduce((a, id) => a + (spendByCategory[id] ?? 0), 0),
    [categoryIds, spendByCategory]
  );

  const cashVsPoints = useMemo(() => {
    let cashSpend = 0;
    let cashValue = 0;
    let ptsSpend = 0;
    let ptsValue = 0;
    for (const cat of categoryIds) {
      const row = allocation[cat];
      if (!row) continue;
      const card = cards.find((c) => c.id === row.cardId);
      if (!card) continue;
      if (card.rewardCurrency === "cashback") {
        cashSpend += row.spend;
        cashValue += row.valueDollars;
      } else {
        ptsSpend += row.spend;
        ptsValue += row.valueDollars;
      }
    }
    const cashRate = cashSpend > 0 ? (cashValue / cashSpend) * 100 : 0;
    const ptsRate = ptsSpend > 0 ? (ptsValue / ptsSpend) * 100 : 0;
    return { cashSpend, cashValue, ptsSpend, ptsValue, cashRate, ptsRate };
  }, [allocation, cards, categoryIds]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Spend optimizer
        </h1>
        <p className="text-zinc-400 mt-1">
          Optimal allocation of your spending across {cards.length} cards
          (greedy, per category).
        </p>
      </div>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5 flex flex-col lg:flex-row lg:items-center gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Earnings goal
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setEarningsGoal(g.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  earningsGoal === g.id
                    ? "bg-accent border-accent text-white"
                    : "border-surface-border text-zinc-400 hover:text-white hover:border-zinc-600"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-zinc-400 lg:max-w-md">
          {goals.find((g) => g.id === earningsGoal)?.hint}
        </p>
        <label className="flex items-center gap-2 text-sm text-zinc-400 lg:ml-auto">
          <input
            type="checkbox"
            checked={includeSub}
            onChange={(e) => setIncludeSub(e.target.checked)}
            className="rounded border-surface-border"
          />
          Include SUB (amortized)
        </label>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-8 text-center">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Total spend
        </p>
        <p className="text-4xl font-semibold text-white mt-2">
          {formatUsd(totalSpend)}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <div className="flex items-center gap-2 text-zinc-200 font-medium">
            <span className="text-gain text-lg" aria-hidden>
              $
            </span>
            Cash back earnings
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-zinc-500 text-xs uppercase">Spend</p>
              <p className="text-white font-medium mt-1">
                {formatUsd(cashVsPoints.cashSpend)}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase">Earned</p>
              <p className="text-gain font-medium mt-1">
                {formatUsd2(cashVsPoints.cashValue)}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase">Avg rate</p>
              <p className="text-gain font-medium mt-1">
                {cashVsPoints.cashRate.toFixed(2)}%
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <div className="flex items-center gap-2 text-zinc-200 font-medium">
            <span className="text-violet-400 text-lg" aria-hidden>
              ✦
            </span>
            Points earnings
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-zinc-500 text-xs uppercase">Point spend</p>
              <p className="text-white font-medium mt-1">
                {formatUsd(cashVsPoints.ptsSpend)}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase">Value</p>
              <p className="text-violet-300 font-medium mt-1">
                {formatUsd2(cashVsPoints.ptsValue)}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase">Avg rate</p>
              <p className="text-violet-300 font-medium mt-1">
                {cashVsPoints.ptsRate.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase">Return (all)</p>
              <p className="text-zinc-200 font-medium mt-1">
                {totalSpend > 0
                  ? `${((totalValueDollars / totalSpend) * 100).toFixed(2)}%`
                  : "—"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-medium text-white">
            Category spend inputs
          </h2>
          <button
            type="button"
            onClick={() => resetDemo()}
            className="text-sm text-accent hover:underline self-start"
          >
            Reset to demo amounts
          </button>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="block text-sm">
              <span className="text-zinc-400">{c.label}</span>
              <input
                type="number"
                min={0}
                step={100}
                value={spendByCategory[c.id] ?? 0}
                onChange={(e) =>
                  setSpend(c.id, Number(e.target.value) || 0)
                }
                className="mt-1 w-full rounded-lg bg-surface border border-surface-border px-3 py-2 text-white"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <h2 className="text-lg font-medium text-white">Allocation</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Best card per category for the selected goal (ties break by table
          order).
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-zinc-500 text-xs uppercase">
              <tr>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Spend</th>
                <th className="py-2 pr-4">Use card</th>
                <th className="py-2 pr-4">¢ / $</th>
                <th className="py-2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {CATEGORIES.map((c) => {
                const row = allocation[c.id];
                const card = row
                  ? cards.find((x) => x.id === row.cardId)
                  : undefined;
                return (
                  <tr key={c.id}>
                    <td className="py-3 text-zinc-200">{c.label}</td>
                    <td className="py-3 text-zinc-400">
                      {formatUsd(spendByCategory[c.id] ?? 0)}
                    </td>
                    <td className="py-3 text-zinc-200">
                      {card?.name ?? "—"}
                    </td>
                    <td className="py-3 text-zinc-400">
                      {row ? row.centsPerDollar.toFixed(2) : "—"}
                    </td>
                    <td className="py-3 text-gain">
                      {row ? formatUsd2(row.valueDollars) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-surface-border border-amber-500/30 bg-surface-raised p-5">
        <h2 className="text-lg font-medium text-white">Summary</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Modeled return:{" "}
          <strong className="text-gain">
            {formatUsd2(totalValueDollars)}
          </strong>{" "}
          on <strong className="text-zinc-200">{formatUsd(totalSpend)}</strong>{" "}
          spend (
          {totalSpend > 0
            ? `${((totalValueDollars / totalSpend) * 100).toFixed(2)}%`
            : "—"}
          ). This is a prototype — real-world caps, merchant coding, and annual
          credits will differ.
        </p>
      </section>
    </div>
  );
}
