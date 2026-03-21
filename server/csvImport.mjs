import { randomUUID } from "node:crypto";

const PROGRAMS = new Set(["ur", "mr", "c1", "ty", "bilt", "cash", "btc"]);

function norm(s) {
  return String(s ?? "")
    .trim()
    .replace(/^\uFEFF/, "");
}

function num(v, d = 0) {
  const n = Number(String(v).replace(/[$,]/g, ""));
  return Number.isFinite(n) ? n : d;
}

/** @param {Record<string, string>} row */
export function rowToCard(row) {
  const keys = Object.fromEntries(
    Object.entries(row).map(([k, v]) => [norm(k).toLowerCase(), v])
  );

  const name = norm(keys.name || keys.card || keys["card name"]);
  if (!name) return null;

  const issuer = norm(keys.issuer || keys.bank || "Unknown");
  const last4 = norm(keys.last4 || keys.last_4 || keys.mask || "").replace(
    /\D/g,
    ""
  ).slice(-4);
  const last4f = last4.length === 4 ? last4 : undefined;

  let programId = norm(keys.programid || keys.program || keys["earn program"]).toLowerCase();
  if (!programId || !PROGRAMS.has(programId)) programId = "ur";

  const cardType =
    norm(keys.cardtype || keys.type).toLowerCase() === "business"
      ? "business"
      : "personal";

  const limitType =
    norm(keys.limittype || keys["limit type"]).toLowerCase() === "charge"
      ? "charge"
      : "credit";

  let rewardCurrency = norm(keys.rewardcurrency || keys.currency).toLowerCase();
  if (rewardCurrency === "cash back" || rewardCurrency === "cashback")
    rewardCurrency = "cashback";
  else if (rewardCurrency === "crypto") rewardCurrency = "crypto";
  else rewardCurrency = "transferable";

  const annualFee = num(keys.annualfee || keys.fee || keys["annual fee"]);
  const perkValue = num(keys.perkvalue || keys.perks || keys["perk value"]);
  const balance = num(keys.balance || keys["current balance"]);
  const limit = num(keys.limit || keys["credit limit"]);
  const loyaltyBalance = num(keys.loyaltybalance || keys.points || keys["points balance"]);
  const bonusesCount = Math.round(num(keys.bonuses || keys["bonuses count"], 0));
  const creditsCount = Math.round(num(keys.credits || keys["credits count"], 0));

  const id =
    norm(keys.id) ||
    `csv-${slug(name)}-${last4f || randomUUID().slice(0, 8)}`;

  const earnEverythingElse = num(keys.earneverythingelse || keys["earn base"] || keys.base, 1);

  return {
    id,
    name,
    issuer,
    last4: last4f,
    cardType,
    limitType,
    rewardCurrency,
    programId,
    annualFee,
    perkValue,
    balance,
    limit,
    bonusesCount: bonusesCount || 0,
    creditsCount: creditsCount || 0,
    loyaltyBalance: loyaltyBalance || undefined,
    earnByCategory: {
      everythingElse: { pointsPerDollar: earnEverythingElse || 1, capped: false },
    },
  };
}

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

/**
 * @param {string} text
 * @returns {any[]}
 */
export function parseWalletCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => norm(l));
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map((h) => norm(h).replace(/^"|"$/g, ""));
  const cards = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 1) continue;
    /** @type {Record<string, string>} */
    const row = {};
    header.forEach((h, idx) => {
      row[h] = cols[idx] ?? "";
    });
    const card = rowToCard(row);
    if (card) cards.push(card);
  }
  return cards;
}

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      q = !q;
      continue;
    }
    if (c === "," && !q) {
      out.push(cur.trim());
      cur = "";
      continue;
    }
    cur += c;
  }
  out.push(cur.trim());
  return out;
}
