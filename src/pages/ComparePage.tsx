import { useMemo, useState } from "react";
import { CATEGORIES } from "@/data/seed";
import { formatCentsPerDollar } from "@/lib/format";
import { baseCentsPerDollar, effectiveCentsPerDollar } from "@/lib/valuation";
import type { WalletCard } from "@/types/domain";
import { usePrefsStore } from "@/stores/prefsStore";
import { useWalletStore } from "@/stores/walletStore";

type ViewMode = "value" | "earn";

function cellTone(cents: number, colMax: number): string {
  if (colMax <= 0) return "text-zinc-500";
  const r = cents / colMax;
  if (r >= 0.85) return "bg-emerald-500/20 text-emerald-200";
  if (r >= 0.45) return "bg-zinc-800/80 text-zinc-200";
  return "text-zinc-500";
}

function displayValue(
  card: WalletCard,
  cat: (typeof CATEGORIES)[number]["id"],
  includeSub: boolean,
  mode: ViewMode
) {
  if (mode === "value") {
    const { value, capped, subIncluded } = effectiveCentsPerDollar(
      card,
      cat,
      includeSub
    );
    return { text: formatCentsPerDollar(value), capped, subIncluded, sort: value };
  }
  const base = baseCentsPerDollar(card, cat);
  const detail =
    card.earnByCategory[cat] ?? card.earnByCategory.everythingElse;
  const ppd = detail?.pointsPerDollar ?? 0;
  return {
    text: `${ppd.toFixed(2)}x`,
    capped: base.capped,
    subIncluded: false,
    sort: ppd,
  };
}

function heatClass(
  viewMode: ViewMode,
  card: WalletCard,
  catId: (typeof CATEGORIES)[number]["id"],
  includeSub: boolean,
  colMax: number
): string {
  if (viewMode === "value") {
    const { value } = effectiveCentsPerDollar(card, catId, includeSub);
    return cellTone(value, colMax);
  }
  const detail =
    card.earnByCategory[catId] ?? card.earnByCategory.everythingElse;
  const ppd = detail?.pointsPerDollar ?? 0;
  return cellTone(ppd, colMax);
}

export function ComparePage() {
  const cards = useWalletStore((s) => s.cards);
  const includeSub = usePrefsStore((s) => s.includeSub);
  const setIncludeSub = usePrefsStore((s) => s.setIncludeSub);

  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState("all");
  const [currency, setCurrency] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("value");

  const issuers = useMemo(
    () => [...new Set(cards.map((c) => c.issuer))].sort(),
    [cards]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (issuer !== "all" && c.issuer !== issuer) return false;
      if (currency !== "all" && c.rewardCurrency !== currency) return false;
      return true;
    });
  }, [cards, search, issuer, currency]);

  const colMax = useMemo(() => {
    const m: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      let max = 0;
      for (const card of filtered) {
        const { sort } = displayValue(card, cat.id, includeSub, viewMode);
        if (sort > max) max = sort;
      }
      m[cat.id] = max;
    }
    return m;
  }, [filtered, includeSub, viewMode]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Compare cards
        </h1>
        <p className="text-zinc-400 mt-1">
          Effective earning view across your wallet (demo math).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-zinc-500 py-2">
            My cards ({filtered.length})
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-surface-border p-0.5 bg-surface-raised">
            <button
              type="button"
              onClick={() => setViewMode("value")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                viewMode === "value"
                  ? "bg-accent text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Value (¢/$)
            </button>
            <button
              type="button"
              onClick={() => setViewMode("earn")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                viewMode === "earn"
                  ? "bg-accent text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Earn rate (×)
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={includeSub}
              onChange={(e) => setIncludeSub(e.target.checked)}
              className="rounded border-surface-border"
            />
            Include SUB (amortized)
          </label>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-3">
        <input
          type="search"
          placeholder="Search cards…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg bg-surface-raised border border-surface-border px-3 py-2 text-sm text-white"
        />
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
          <option value="transferable">Transferable</option>
          <option value="cashback">Cash back</option>
          <option value="crypto">Crypto</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-surface-border">
        <table className="min-w-full text-xs sm:text-sm text-center">
          <thead className="bg-surface-raised text-zinc-400">
            <tr>
              <th className="sticky left-0 z-20 bg-surface-raised px-3 py-3 text-left min-w-[160px]">
                Card
              </th>
              {CATEGORIES.map((c) => (
                <th key={c.id} className="px-2 py-3 font-medium whitespace-nowrap">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {filtered.map((card) => (
              <tr key={card.id} className="hover:bg-zinc-900/30">
                <td className="sticky left-0 z-10 bg-surface border-r border-surface-border px-3 py-2 text-left font-medium text-zinc-100 whitespace-nowrap">
                  {card.name}
                </td>
                {CATEGORIES.map((cat) => {
                  const { text, capped, subIncluded } = displayValue(
                    card,
                    cat.id,
                    includeSub,
                    viewMode
                  );
                  const tone = heatClass(
                    viewMode,
                    card,
                    cat.id,
                    includeSub,
                    colMax[cat.id]
                  );
                  return (
                    <td key={cat.id} className={`px-2 py-2 ${tone}`}>
                      <span
                        className={subIncluded ? "text-sky-300" : undefined}
                      >
                        {text}
                      </span>
                      {capped && (
                        <span className="text-amber-500 ml-0.5" title="Cap/condition">
                          †
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-zinc-500 space-y-1">
        <p>
          <span className="text-amber-500">†</span> Denotes a capped or
          conditional category in seed data.
        </p>
        <p>
          Blue-tinted values when SUB is included indicate the amortized uplift
          is layered on every cell for cards with a welcome offer.
        </p>
      </div>
    </div>
  );
}
