import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { programById } from "@/data/seed";
import { formatUsd, formatUsd2 } from "@/lib/format";
import type { RewardCurrency, WalletCard } from "@/types/domain";
import { useWalletStore } from "@/stores/walletStore";

type SortKey =
  | "name"
  | "issuer"
  | "annualFee"
  | "net"
  | "balance"
  | "limit";

const currencyStyles: Record<RewardCurrency, string> = {
  transferable: "bg-violet-500/20 text-violet-300 border-violet-500/40",
  cashback: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
  crypto: "bg-amber-500/15 text-amber-300 border-amber-500/35",
};

function netFee(c: WalletCard) {
  return c.annualFee - c.perkValue;
}

export function WalletPage() {
  const cards = useWalletStore((s) => s.cards);
  const refreshPlaid = useWalletStore((s) => s.refreshPlaid);
  const lastPlaidSync = useWalletStore((s) => s.lastPlaidSync);
  const plaidItemCount = useWalletStore((s) => s.plaidItemCount);
  const status = useWalletStore((s) => s.status);

  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState<string>("all");
  const [currency, setCurrency] = useState<string>("all");
  const [cardType, setCardType] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showExtra, setShowExtra] = useState(true);

  const issuers = useMemo(
    () => [...new Set(cards.map((c) => c.issuer))].sort(),
    [cards]
  );

  const totals = useMemo(() => {
    let fees = 0;
    let credit = 0;
    for (const c of cards) {
      fees += c.annualFee;
      if (c.limitType === "credit") credit += c.limit;
    }
    return { fees, credit, count: cards.length };
  }, [cards]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => {
      if (q && !(`${c.name} ${c.issuer}`).toLowerCase().includes(q)) return false;
      if (issuer !== "all" && c.issuer !== issuer) return false;
      if (currency !== "all" && c.rewardCurrency !== currency) return false;
      if (cardType !== "all" && c.cardType !== cardType) return false;
      return true;
    });
  }, [cards, search, issuer, currency, cardType]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "issuer":
          cmp = a.issuer.localeCompare(b.issuer);
          break;
        case "annualFee":
          cmp = a.annualFee - b.annualFee;
          break;
        case "net":
          cmp = netFee(a) - netFee(b);
          break;
        case "balance":
          cmp = a.balance - b.balance;
          break;
        case "limit":
          cmp = a.limit - b.limit;
          break;
        default:
          cmp = 0;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            My wallet
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400">
            <span>
              Cards: <strong className="text-zinc-200">{totals.count}</strong>
            </span>
            <span>
              Annual fees:{" "}
              <strong className="text-zinc-200">{formatUsd(totals.fees)}</strong>
            </span>
            <span>
              Total credit:{" "}
              <strong className="text-zinc-200">{formatUsd(totals.credit)}</strong>
            </span>
            <span>
              Plaid items:{" "}
              <strong className="text-zinc-200">{plaidItemCount}</strong>
            </span>
            {lastPlaidSync && (
              <span>
                Balances synced:{" "}
                <strong className="text-zinc-200">
                  {new Date(lastPlaidSync).toLocaleString()}
                </strong>
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/sync"
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-muted inline-flex items-center"
          >
            Import / Plaid
          </Link>
          <button
            type="button"
            onClick={() => refreshPlaid()}
            disabled={status === "loading" || plaidItemCount === 0}
            className="px-4 py-2 rounded-lg border border-surface-border text-sm text-zinc-200 hover:bg-zinc-800/80 disabled:opacity-40"
          >
            Refresh balances
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
        <input
          type="search"
          placeholder="Search cards…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg bg-surface-raised border border-surface-border px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        <select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="rounded-lg bg-surface-raised border border-surface-border px-3 py-2 text-sm text-zinc-200"
        >
          <option value="all">All types</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
        <select
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          className="rounded-lg bg-surface-raised border border-surface-border px-3 py-2 text-sm text-zinc-200"
        >
          <option value="all">All issuers</option>
          {issuers.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="rounded-lg bg-surface-raised border border-surface-border px-3 py-2 text-sm text-zinc-200"
        >
          <option value="all">All currencies</option>
          <option value="transferable">Transferable points</option>
          <option value="cashback">Cash back</option>
          <option value="crypto">Crypto</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-zinc-400 whitespace-nowrap">
          <input
            type="checkbox"
            checked={showExtra}
            onChange={(e) => setShowExtra(e.target.checked)}
            className="rounded border-surface-border"
          />
          Extra columns
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-surface-border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-surface-raised text-zinc-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-3 py-3">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("name")}
                >
                  Card {sortKey === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="px-3 py-3">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("issuer")}
                >
                  Issuer
                </button>
              </th>
              {showExtra && (
                <>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Limit type</th>
                </>
              )}
              <th className="px-3 py-3">Currency</th>
              <th className="px-3 py-3">Earns</th>
              {showExtra && (
                <>
                  <th className="px-3 py-3">Last4</th>
                  <th className="px-3 py-3">Plaid sync</th>
                  <th className="px-3 py-3 text-right">Bonuses</th>
                  <th className="px-3 py-3 text-right">Credits</th>
                </>
              )}
              <th className="px-3 py-3 text-right">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("annualFee")}
                >
                  Fee
                </button>
              </th>
              <th className="px-3 py-3 text-right">Value</th>
              <th className="px-3 py-3 text-right">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("net")}
                >
                  Net fee
                </button>
              </th>
              <th className="px-3 py-3 text-right">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("balance")}
                >
                  Balance
                </button>
              </th>
              <th className="px-3 py-3 text-right">
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => toggleSort("limit")}
                >
                  Limit
                </button>
              </th>
              <th className="px-3 py-3 text-right">Available</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border bg-surface">
            {sorted.map((c) => {
              const prog = programById(c.programId);
              const n = netFee(c);
              const avail =
                c.limitType === "credit" ? c.limit - c.balance : 0;
              return (
                <tr key={c.id} className="hover:bg-zinc-900/40">
                  <td className="px-3 py-3 font-medium text-zinc-100 whitespace-nowrap">
                    {c.name}
                  </td>
                  <td className="px-3 py-3 text-zinc-400 whitespace-nowrap">
                    {c.issuer}
                  </td>
                  {showExtra && (
                    <>
                      <td className="px-3 py-3 text-zinc-400 capitalize">
                        {c.cardType}
                      </td>
                      <td className="px-3 py-3 text-zinc-400 capitalize">
                        {c.limitType}
                      </td>
                    </>
                  )}
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex text-xs px-2 py-0.5 rounded-full border ${currencyStyles[c.rewardCurrency]}`}
                    >
                      {c.rewardCurrency === "transferable"
                        ? "Transferable"
                        : c.rewardCurrency === "cashback"
                          ? "Cash back"
                          : "Crypto"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-zinc-300 whitespace-nowrap">
                    {prog?.name ?? c.programId}
                  </td>
                  {showExtra && (
                    <>
                      <td className="px-3 py-3 text-zinc-400 whitespace-nowrap">
                        {c.last4 ? `••••${c.last4}` : "—"}
                      </td>
                      <td className="px-3 py-3 text-zinc-500 text-xs whitespace-nowrap max-w-[140px] truncate" title={c.balanceSyncedAt}>
                        {c.balanceSyncedAt
                          ? new Date(c.balanceSyncedAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-3 py-3 text-right text-gain">
                        {c.bonusesCount}
                      </td>
                      <td className="px-3 py-3 text-right text-gain">
                        {c.creditsCount}
                      </td>
                    </>
                  )}
                  <td className="px-3 py-3 text-right text-zinc-200">
                    {formatUsd(c.annualFee)}
                  </td>
                  <td className="px-3 py-3 text-right text-zinc-200">
                    {formatUsd(c.perkValue)}
                  </td>
                  <td
                    className={`px-3 py-3 text-right font-medium ${
                      n <= 0 ? "text-gain" : "text-zinc-200"
                    }`}
                  >
                    {formatUsd2(n)}
                  </td>
                  <td className="px-3 py-3 text-right text-zinc-200">
                    {formatUsd2(c.balance)}
                  </td>
                  <td className="px-3 py-3 text-right text-zinc-200">
                    {c.limitType === "credit" ? formatUsd(c.limit) : "—"}
                  </td>
                  <td className="px-3 py-3 text-right text-gain">
                    {c.limitType === "credit" ? formatUsd2(avail) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {cards.length === 0 && (
        <p className="text-sm text-zinc-500">
          No wallet loaded. Go to{" "}
          <Link to="/sync" className="text-accent hover:underline">
            Sync & import
          </Link>{" "}
          to upload your CSV or load the demo.
        </p>
      )}
      {cards.length > 0 && sorted.length === 0 && (
        <p className="text-sm text-zinc-500">No cards match your filters.</p>
      )}
    </div>
  );
}
