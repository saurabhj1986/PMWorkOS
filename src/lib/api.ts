import { API_BASE } from "@/config/api";
import type { WalletCard } from "@/types/domain";

export { API_BASE };

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function fetchWallet(): Promise<{
  cards: WalletCard[];
  lastPlaidSync: string | null;
  plaidItemCount: number;
}> {
  const res = await fetch(`${API_BASE}/api/wallet`);
  return handle(res);
}

export async function refreshPlaidBalances(): Promise<{
  cards: WalletCard[];
  lastPlaidSync: string | null;
  plaidItemCount: number;
  matched: number;
  unmatched: { mask: string; name: string }[];
}> {
  const res = await fetch(`${API_BASE}/api/plaid/refresh`, { method: "POST" });
  return handle(res);
}

export async function createLinkToken(): Promise<{ link_token: string }> {
  const res = await fetch(`${API_BASE}/api/plaid/link_token/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  return handle(res);
}

export async function exchangePublicToken(public_token: string): Promise<{
  ok: boolean;
  item_id: string;
  cards: WalletCard[];
  lastPlaidSync: string | null;
}> {
  const res = await fetch(`${API_BASE}/api/plaid/token/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_token }),
  });
  return handle(res);
}

export async function importWalletCsv(file: File): Promise<{ cards: WalletCard[] }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/import/csv`, {
    method: "POST",
    body: fd,
  });
  return handle(res);
}

export async function loadDemoWallet(): Promise<{ cards: WalletCard[] }> {
  const res = await fetch(`${API_BASE}/api/wallet/demo`, { method: "POST" });
  return handle(res);
}

export async function health(): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error("API unreachable");
  return handle(res);
}
