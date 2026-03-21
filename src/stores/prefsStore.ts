import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EarningsGoal } from "@/lib/optimize";

interface PrefsState {
  includeSub: boolean;
  earningsGoal: EarningsGoal;
  setIncludeSub: (v: boolean) => void;
  setEarningsGoal: (g: EarningsGoal) => void;
}

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      includeSub: true,
      earningsGoal: "maximize" as EarningsGoal,
      setIncludeSub: (v) => set({ includeSub: v }),
      setEarningsGoal: (g) => set({ earningsGoal: g }),
    }),
    { name: "pmos_prefs_v1" }
  )
);
