import { programById } from "@/data/seed";
import type { CategoryId, WalletCard } from "@/types/domain";

function earnDetailForCategory(
  card: WalletCard,
  category: CategoryId
): { pointsPerDollar: number; capped: boolean } | null {
  const direct = card.earnByCategory[category];
  if (direct) return { pointsPerDollar: direct.pointsPerDollar, capped: !!direct.capped };
  const fb = card.earnByCategory.everythingElse;
  if (fb) return { pointsPerDollar: fb.pointsPerDollar, capped: !!fb.capped };
  return null;
}

/** Base earn value in cents per dollar (before SUB amortization). */
export function baseCentsPerDollar(
  card: WalletCard,
  category: CategoryId
): { value: number; capped: boolean } {
  const program = programById(card.programId);
  const detail = earnDetailForCategory(card, category);
  if (!detail || !program) return { value: 0, capped: false };
  return {
    value: detail.pointsPerDollar * program.cppCents,
    capped: detail.capped,
  };
}

/**
 * SUB uplift spread over amortization spend (demo math):
 * extra ¢/$ = (bonusPoints × cpp) / amortizationSpend
 */
export function subCentsPerDollar(card: WalletCard): number {
  if (!card.sub) return 0;
  const program = programById(card.programId);
  if (!program) return 0;
  const bonusCents = card.sub.bonusPoints * program.cppCents;
  const denom = Math.max(1, card.sub.amortizationSpend);
  return bonusCents / denom;
}

export function effectiveCentsPerDollar(
  card: WalletCard,
  category: CategoryId,
  includeSub: boolean
): { value: number; capped: boolean; subIncluded: boolean } {
  const base = baseCentsPerDollar(card, category);
  const sub = includeSub && card.sub ? subCentsPerDollar(card) : 0;
  return {
    value: base.value + sub,
    capped: base.capped,
    subIncluded: includeSub && !!card.sub,
  };
}
