import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BOOST_SUGGESTIONS,
  CATEGORIES,
  SEED_UPCOMING,
  programById,
} from "@/data/seed";
import { formatCompact, formatUsd, formatUsd2 } from "@/lib/format";
import { optimizeSpend } from "@/lib/optimize";
import { KpiCard } from "@/components/KpiCard";
import { usePrefsStore } from "@/stores/prefsStore";
import { useSpendStore } from "@/stores/spendStore";
import { useWalletStore } from "@/stores/walletStore";

const upcomingWindows = [30, 60, 90] as const;

export function DashboardPage() {
  const cards = useWalletStore((s) => s.cards);
  const spendByCategory = useSpendStore((s) => s.spendByCategory);
  const includeSub = usePrefsStore((s) => s.includeSub);
  const [upcomingDays, setUpcomingDays] =
    useState<(typeof upcomingWindows)[number]>(30);

  const categoryIds = useMemo(() => CATEGORIES.map((c) => c.id), []);

  const totals = useMemo(() => {
    let annualFees = 0;
    let perks = 0;
    let totalLimit = 0;
    let totalBalance = 0;
    let loyaltyPoints = 0;
    let loyaltyUsd = 0;
    for (const c of cards) {
      annualFees += c.annualFee;
      perks += c.perkValue;
      if (c.limitType === "credit" && c.limit > 0) {
        totalLimit += c.limit;
        totalBalance += Math.max(0, c.balance);
      }
      if (c.loyaltyBalance) {
        loyaltyPoints += c.loyaltyBalance;
        const p = programById(c.programId);
        if (p) loyaltyUsd += (c.loyaltyBalance * p.cppCents) / 100;
      }
    }
    const netFees = annualFees - perks;
    const utilization =
      totalLimit > 0 ? Math.min(100, (totalBalance / totalLimit) * 100) : 0;
    return {
      annualFees,
      perks,
      netFees,
      totalLimit,
      totalBalance,
      available: Math.max(0, totalLimit - totalBalance),
      loyaltyPoints,
      loyaltyUsd,
      utilization,
    };
  }, [cards]);

  const totalSpend = useMemo(
    () =>
      categoryIds.reduce(
        (acc, id) => acc + (spendByCategory[id] ?? 0),
        0
      ),
    [categoryIds, spendByCategory]
  );

  const { totalValueDollars } = useMemo(
    () =>
      optimizeSpend(
        cards,
        spendByCategory,
        categoryIds,
        includeSub,
        "maximize"
      ),
    [cards, spendByCategory, categoryIds, includeSub]
  );

  const returnRate =
    totalSpend > 0 ? (totalValueDollars / totalSpend) * 100 : 0;

  const upcomingFiltered = useMemo(
    () => SEED_UPCOMING.filter((u) => u.dueInDays <= upcomingDays),
    [upcomingDays]
  );

  const paymentsDue = upcomingFiltered.filter((u) => u.kind === "payment");
  const expiring = upcomingFiltered.filter((u) => u.kind === "expiring");
  const paySum = paymentsDue.reduce((a, u) => a + u.amount, 0);
  const expSum = expiring.reduce((a, u) => a + u.amount, 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-zinc-400 mt-1">
          Your credit card rewards at a glance
        </p>
        {cards.length === 0 && (
          <p className="mt-3 text-sm text-amber-200/90">
            No wallet data yet.{" "}
            <Link to="/sync" className="text-accent hover:underline">
              Import your spreadsheet (CSV) and connect Plaid
            </Link>{" "}
            to populate this view.
          </p>
        )}
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Cards in wallet">
          <p className="text-4xl font-semibold text-white">{cards.length}</p>
          <div className="mt-4 space-y-1 text-sm text-zinc-400">
            <p>
              Annual fees:{" "}
              <span className="text-zinc-200">{formatUsd(totals.annualFees)}</span>
            </p>
            <p>
              Perks value:{" "}
              <span className="text-gain">{formatUsd(totals.perks)}</span>
            </p>
            <p>
              Net fees:{" "}
              <span
                className={
                  totals.netFees <= 0 ? "text-gain" : "text-zinc-200"
                }
              >
                {formatUsd(totals.netFees)}
              </span>
            </p>
          </div>
        </KpiCard>

        <KpiCard title="Points & miles" subtitle="Demo balances × assumed cpp">
          <p className="text-4xl font-semibold text-white">
            {formatCompact(totals.loyaltyPoints)}
          </p>
          <p className="text-gain text-lg mt-1">
            ≈ {formatUsd2(totals.loyaltyUsd)}
          </p>
          <p className="text-xs text-zinc-500 mt-4">
            Valuation uses program cpp from seed data — not issuer cash-out
            rates.
          </p>
        </KpiCard>

        <KpiCard title="Total credit">
          <p className="text-4xl font-semibold text-white">
            {formatUsd(totals.totalLimit)}
          </p>
          <div className="mt-4 space-y-1 text-sm text-zinc-400">
            <p>
              Balance:{" "}
              <span className="text-zinc-200">
                {formatUsd(totals.totalBalance)}
              </span>
            </p>
            <p>
              Available:{" "}
              <span className="text-gain">{formatUsd(totals.available)}</span>
            </p>
            <p className="pt-2 text-xs text-zinc-500">
              Utilization (demo): {totals.utilization.toFixed(1)}%
            </p>
          </div>
        </KpiCard>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium text-white">Upcoming</h2>
            <p className="text-sm text-zinc-400">
              Next {upcomingDays} days (demo reminders)
            </p>
          </div>
          <div className="flex rounded-lg border border-surface-border p-0.5 bg-surface">
            {upcomingWindows.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setUpcomingDays(d)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  upcomingDays === d
                    ? "bg-accent text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-surface-border p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-zinc-300">
                Payments due
              </span>
              <span className="text-gain font-medium">{formatUsd(paySum)}</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              {paymentsDue.map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span className="truncate">{p.label}</span>
                  <span className="text-zinc-300 shrink-0">
                    {formatUsd(p.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-surface-border p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-zinc-300">
                Expiring credits
              </span>
              <span className="text-gain font-medium">{formatUsd(expSum)}</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              {expiring.map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span className="truncate">{p.label}</span>
                  <span className="text-zinc-300 shrink-0">
                    {formatUsd(p.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium text-white">Total earnings</h2>
            <p className="text-sm text-zinc-400">
              Based on your spending allocation (greedy best card per category).
              SUB amortization follows Planning prefs.
            </p>
          </div>
          <Link
            to="/optimizer"
            className="text-sm text-accent hover:underline shrink-0"
          >
            View details →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Total spend
            </p>
            <p className="text-2xl font-semibold text-white mt-1">
              {formatUsd(totalSpend)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Net earnings
            </p>
            <p className="text-2xl font-semibold text-gain mt-1">
              {formatUsd2(totalValueDollars)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Return rate
            </p>
            <p className="text-2xl font-semibold text-gain mt-1">
              {returnRate.toFixed(2)}%
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5">
        <h2 className="text-lg font-medium text-white">Boost your earnings</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Demo suggestions — replace with your affiliate strategy + eligibility
          rules engine.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {BOOST_SUGGESTIONS.map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded-full border border-surface-border bg-surface px-4 py-2 text-sm text-zinc-200"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
