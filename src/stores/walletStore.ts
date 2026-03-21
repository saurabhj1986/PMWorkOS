import { create } from "zustand";
import type { WalletCard } from "@/types/domain";
import * as api from "@/lib/api";

interface WalletState {
  cards: WalletCard[];
  lastPlaidSync: string | null;
  plaidItemCount: number;
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  lastRefreshNote: string | null;
  load: () => Promise<void>;
  refreshPlaid: () => Promise<void>;
  importCsv: (file: File) => Promise<void>;
  loadDemo: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  cards: [],
  lastPlaidSync: null,
  plaidItemCount: 0,
  status: "idle",
  error: null,
  lastRefreshNote: null,

  load: async () => {
    set({ status: "loading", error: null });
    try {
      const r = await api.fetchWallet();
      set({
        cards: r.cards,
        lastPlaidSync: r.lastPlaidSync,
        plaidItemCount: r.plaidItemCount,
        status: "ready",
        lastRefreshNote: null,
      });
    } catch (e) {
      set({
        status: "error",
        error:
          e instanceof Error
            ? e.message
            : "Could not reach API — start the server (npm run server).",
      });
    }
  },

  refreshPlaid: async () => {
    set({ status: "loading", error: null, lastRefreshNote: null });
    try {
      const r = await api.refreshPlaidBalances();
      const extra =
        r.unmatched?.length > 0
          ? ` Unlinked Plaid cards (add last4 in CSV): ${r.unmatched
              .map((u) => `${u.name} ••••${u.mask}`)
              .join("; ")}`
          : "";
      set({
        cards: r.cards,
        lastPlaidSync: r.lastPlaidSync,
        plaidItemCount: r.plaidItemCount,
        status: "ready",
        lastRefreshNote: `Updated ${r.matched} card(s) from Plaid.${extra}`,
      });
    } catch (e) {
      set({
        status: "error",
        error: e instanceof Error ? e.message : "Plaid refresh failed",
      });
    }
  },

  importCsv: async (file: File) => {
    set({ status: "loading", error: null });
    try {
      const r = await api.importWalletCsv(file);
      set({ cards: r.cards, status: "ready", lastRefreshNote: "Imported CSV." });
    } catch (e) {
      set({
        status: "error",
        error: e instanceof Error ? e.message : "CSV import failed",
      });
    }
  },

  loadDemo: async () => {
    set({ status: "loading", error: null });
    try {
      const r = await api.loadDemoWallet();
      set({ cards: r.cards, status: "ready", lastRefreshNote: "Loaded demo wallet." });
    } catch (e) {
      set({
        status: "error",
        error: e instanceof Error ? e.message : "Demo load failed",
      });
    }
  },
}));
