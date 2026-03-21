import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import cors from "cors";
import express from "express";
import multer from "multer";
import { loadState, saveState } from "./state.mjs";
import { parseWalletCsv } from "./csvImport.mjs";
import { makePlaidClient } from "./plaid.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoCards = JSON.parse(
  readFileSync(path.join(__dirname, "demo-wallet.json"), "utf8")
);

const PORT = Number(process.env.SERVER_PORT || 3847);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

const app = express();

app.use(
  "/api/plaid/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let payload = {};
    try {
      payload = JSON.parse(req.body?.toString() || "{}");
    } catch {
      /* ignore */
    }
    console.log("[plaid webhook]", payload.webhook_type, payload.webhook_code);
    refreshAllBalances().catch((e) => console.error("webhook refresh", e));
    res.json({ received: true });
  }
);

app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/wallet", (_req, res) => {
  const s = loadState();
  res.json({
    cards: s.cards,
    lastPlaidSync: s.lastPlaidSync,
    plaidItemCount: s.items.length,
  });
});

app.post("/api/wallet/demo", (_req, res) => {
  const s = loadState();
  s.cards = structuredClone(demoCards);
  saveState(s);
  res.json({ cards: s.cards });
});

app.post("/api/import/csv", upload.single("file"), (req, res) => {
  try {
    const buf = req.file?.buffer;
    if (!buf) {
      res.status(400).json({ error: "Missing file field `file`" });
      return;
    }
    const text = buf.toString("utf8");
    const cards = parseWalletCsv(text);
    if (!cards.length) {
      res.status(400).json({ error: "No rows parsed — check header row and `name` column." });
      return;
    }
    const s = loadState();
    s.cards = cards;
    saveState(s);
    res.json({ cards: s.cards });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e instanceof Error ? e.message : "Import failed" });
  }
});

app.post("/api/plaid/link_token/create", async (_req, res) => {
  try {
    const plaid = makePlaidClient();
    const { data } = await plaid.linkTokenCreate({
      user: { client_user_id: process.env.PLAID_CLIENT_USER_ID || "personal-user" },
      client_name: "PM OS Wallet",
      products: ["transactions", "liabilities"],
      country_codes: ["US"],
      language: "en",
      webhook: process.env.PLAID_WEBHOOK_URL || undefined,
    });
    res.json({ link_token: data.link_token });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "link_token_create failed",
    });
  }
});

app.post("/api/plaid/token/exchange", async (req, res) => {
  try {
    const public_token = req.body?.public_token;
    if (!public_token) {
      res.status(400).json({ error: "public_token required" });
      return;
    }
    const plaid = makePlaidClient();
    const { data } = await plaid.itemPublicTokenExchange({ public_token });
    const s = loadState();
    s.items.push({
      itemId: data.item_id,
      accessToken: data.access_token,
    });
    saveState(s);
    await refreshAllBalances();
    const s2 = loadState();
    res.json({ ok: true, item_id: data.item_id, cards: s2.cards, lastPlaidSync: s2.lastPlaidSync });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "token exchange failed",
    });
  }
});

app.post("/api/plaid/refresh", async (_req, res) => {
  try {
    const result = await refreshAllBalances();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "refresh failed",
    });
  }
});

async function refreshAllBalances() {
  const s = loadState();
  if (!s.items.length) {
    return {
      cards: s.cards,
      lastPlaidSync: s.lastPlaidSync,
      plaidItemCount: 0,
      matched: 0,
      unmatched: [],
    };
  }

  const plaid = makePlaidClient();
  const unmatched = [];
  let matched = 0;
  const now = new Date().toISOString();

  /** @type {Map<string, { balance: number, limit: number, available: number | null, accountId: string, accountName: string }>} */
  const byMask = new Map();

  for (const item of s.items) {
    const { data } = await plaid.accountsBalanceGet({
      access_token: item.accessToken,
    });

    for (const acct of data.accounts) {
      const t = acct.type;
      const st = acct.subtype;
      if (t !== "credit" || st !== "credit card") continue;
      const mask = (acct.mask || "").trim();
      if (mask.length !== 4) continue;
      const bal = acct.balances?.current ?? 0;
      const lim =
        acct.balances?.limit != null ? acct.balances.limit : 0;
      const avail =
        acct.balances?.available != null ? acct.balances.available : null;
      byMask.set(mask, {
        balance: bal,
        limit: lim,
        available: avail,
        accountId: acct.account_id,
        accountName: acct.name || "Credit card",
      });
    }
  }

  const cards = s.cards.map((c) => {
    const last = (c.last4 || "").trim();
    if (last.length !== 4) return c;
    const hit = byMask.get(last);
    if (!hit) return c;
    matched++;
    return {
      ...c,
      balance: hit.balance,
      limit: c.limitType === "charge" ? c.limit : hit.limit || c.limit,
      plaidAccountId: hit.accountId,
      balanceSyncedAt: now,
    };
  });

  for (const [mask, hit] of byMask) {
    const hasCard = cards.some((c) => (c.last4 || "").trim() === mask);
    if (!hasCard) {
      unmatched.push({ mask, name: hit.accountName });
    }
  }

  s.cards = cards;
  s.lastPlaidSync = now;
  saveState(s);

  return {
    cards: s.cards,
    lastPlaidSync: s.lastPlaidSync,
    plaidItemCount: s.items.length,
    matched,
    unmatched,
  };
}

app.listen(PORT, () => {
  console.log(`\n  PM OS API → http://127.0.0.1:${PORT}`);
  console.log(`  Plaid env: ${process.env.PLAID_ENV || "sandbox"}`);
  console.log(`  Wallet + CSV: GET/POST /api/wallet, /api/import/csv\n`);
});
