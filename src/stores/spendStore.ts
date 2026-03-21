import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_CATEGORY_SPEND } from "@/data/seed";
import type { CategoryId } from "@/types/domain";

interface SpendState {
  spendByCategory: Partial<Record<CategoryId, number>>;
  setSpend: (cat: CategoryId, value: number) => void;
  setMany: (patch: Partial<Record<CategoryId, number>>) => void;
  resetDemo: () => void;
}

export const useSpendStore = create<SpendState>()(
  persist(
    (set) => ({
      spendByCategory: { ...DEFAULT_CATEGORY_SPEND },
      setSpend: (cat, value) =>
        set((s) => ({
          spendByCategory: { ...s.spendByCategory, [cat]: value },
        })),
      setMany: (patch) =>
        set((s) => ({
          spendByCategory: { ...s.spendByCategory, ...patch },
        })),
      resetDemo: () =>
        set({ spendByCategory: { ...DEFAULT_CATEGORY_SPEND } }),
    }),
    { name: "pmos_spend_v1" }
  )
);
