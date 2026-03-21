import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
export const DATA_DIR = path.join(root, "data");
const STATE_PATH = path.join(DATA_DIR, "state.json");

mkdirSync(DATA_DIR, { recursive: true });

/** @typedef {{ itemId: string, accessToken: string }} PlaidItem */
/**
 * @typedef {{
 *   items: PlaidItem[],
 *   cards: any[],
 *   lastPlaidSync: string | null,
 * }} AppState
 */

const defaultState = () => ({
  items: [],
  cards: [],
  lastPlaidSync: null,
});

export function loadState() {
  if (!existsSync(STATE_PATH)) {
    const s = defaultState();
    saveState(s);
    return s;
  }
  try {
    const raw = readFileSync(STATE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      items: parsed.items ?? [],
      cards: parsed.cards ?? [],
      lastPlaidSync: parsed.lastPlaidSync ?? null,
    };
  } catch {
    return defaultState();
  }
}

/** @param {AppState} state */
export function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8");
}
