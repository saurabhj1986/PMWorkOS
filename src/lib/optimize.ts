import type { CategoryId, WalletCard } from "@/types/domain";
import { effectiveCentsPerDollar } from "@/lib/valuation";

export type EarningsGoal = "maximize" | "cashback" | "pointsOnly";

function cardAllowedForGoal(card: WalletCard, goal: EarningsGoal): boolean {
  if (goal === "cashback") return card.rewardCurrency === "cashback";
  if (goal === "pointsOnly")
    return card.rewardCurrency === "transferable" || card.rewardCurrency === "crypto";
  return true;
}

export function bestCardForCategory(
  cards: WalletCard[],
  category: CategoryId,
  includeSub: boolean,
  goal: EarningsGoal
): { cardId: string; centsPerDollar: number } | null {
  let best: { cardId: string; centsPerDollar: number } | null = null;
  for (const card of cards) {
    if (!cardAllowedForGoal(card, goal)) continue;
    const { value } = effectiveCentsPerDollar(card, category, includeSub);
    if (!best || value > best.centsPerDollar) {
      best = { cardId: card.id, centsPerDollar: value };
    }
  }
  return best;
}

export interface CategoryAllocation {
  cardId: string;
  centsPerDollar: number;
  spend: number;
  valueDollars: number;
}

export function optimizeSpend(
  cards: WalletCard[],
  spendByCategory: Partial<Record<CategoryId, number>>,
  categoryOrder: CategoryId[],
  includeSub: boolean,
  goal: EarningsGoal
): {
  allocation: Partial<Record<CategoryId, CategoryAllocation>>;
  totalValueDollars: number;
} {
  const allocation: Partial<Record<CategoryId, CategoryAllocation>> = {};
  let totalValueDollars = 0;
  for (const cat of categoryOrder) {
    const spend = spendByCategory[cat] ?? 0;
    if (spend <= 0) continue;
    const best = bestCardForCategory(cards, cat, includeSub, goal);
    if (!best) continue;
    const valueDollars = spend * (best.centsPerDollar / 100);
    allocation[cat] = {
      cardId: best.cardId,
      centsPerDollar: best.centsPerDollar,
      spend,
      valueDollars,
    };
    totalValueDollars += valueDollars;
  }
  return { allocation, totalValueDollars };
}
