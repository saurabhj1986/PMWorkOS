export type CardType = "personal" | "business";
export type LimitType = "credit" | "charge";
export type RewardCurrency = "transferable" | "cashback" | "crypto";

export type CategoryId =
  | "grocery"
  | "dining"
  | "streaming"
  | "entertainment"
  | "everythingElse"
  | "onlineRetail"
  | "allTravel"
  | "flights"
  | "hotels"
  | "gasEv"
  | "amazon";

export interface CategoryDef {
  id: CategoryId;
  label: string;
}

export interface RewardProgram {
  id: string;
  name: string;
  /** Reasonable redemption value in cents per point (e.g. 2.05 for UR). */
  cppCents: number;
}

/** Optional cap/condition for a category rate (shows † in UI). */
export interface EarnDetail {
  pointsPerDollar: number;
  capped?: boolean;
}

export interface SignUpBonus {
  bonusPoints: number;
  requiredSpend: number;
  /** Dollars over which SUB value is amortized in effective-rate view. */
  amortizationSpend: number;
}

export interface WalletCard {
  id: string;
  name: string;
  issuer: string;
  /** Last 4 digits — match Plaid `account.mask` for automated balance updates. */
  last4?: string;
  /** Plaid account_id after link (optional). */
  plaidAccountId?: string;
  /** ISO timestamp when balance was last updated from Plaid. */
  balanceSyncedAt?: string;
  cardType: CardType;
  limitType: LimitType;
  rewardCurrency: RewardCurrency;
  programId: string;
  annualFee: number;
  perkValue: number;
  balance: number;
  limit: number;
  bonusesCount: number;
  creditsCount: number;
  /** Optional tracked points/miles balance for dashboard totals. */
  loyaltyBalance?: number;
  earnByCategory: Partial<Record<CategoryId, EarnDetail>>;
  sub?: SignUpBonus;
}

export interface UpcomingItem {
  id: string;
  kind: "payment" | "expiring";
  label: string;
  amount: number;
  dueInDays: number;
}

export interface TipItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
}
