# PM OS — Credit card points tracker (prototype)

Local **React + TypeScript + Tailwind** UI bundled with **esbuild** (works on setups where Vite/Rollup native addons fail, e.g. some **Windows ARM64 + Node** installs).

**Wallet data** lives in a small **Node API** under `data/state.json`: import a **CSV** from your spreadsheet, then keep **credit card balances** in sync via **Plaid** (pull refresh + optional webhooks). **Points/miles** columns in CSV are still yours to maintain unless you add another data source later—Plaid does not replace issuer loyalty ledgers.

## Quick start (UI + API)

```bash
npm install
npm run dev:all
```

- UI: URL from the terminal (default `http://127.0.0.1:5173`)
- API: `http://127.0.0.1:3847` (override with `SERVER_PORT`)

Or run two terminals:

```bash
npm run server
npm run dev
```

### Plaid (Sandbox)

1. Copy `.env.example` → `.env` and add `PLAID_CLIENT_ID` and `PLAID_SECRET` from the [Plaid dashboard](https://dashboard.plaid.com/developers/keys).
2. Open **Sync** in the app → **Link account (Plaid)** using Sandbox credentials.
3. Ensure each card row has **`last4`** matching the Plaid account **mask** so balances map correctly.
4. Optional: set `PLAID_WEBHOOK_URL` to a public URL (e.g. ngrok) pointing at `POST /api/plaid/webhook` for push-triggered refreshes.

### CSV import

Export Sheets/Excel as **CSV UTF-8**. Required column: **`name`**. Strongly recommended: **`last4`** for Plaid matching.

Supported headers (aliases in parentheses) include: `name` (`card`), `issuer` (`bank`), `last4` (`mask`, `last_4`), `programId` (`program`, `earn program`) — values: `ur`, `mr`, `c1`, `ty`, `bilt`, `cash`, `btc`, `annualFee` (`fee`), `perkValue` (`perks`), `balance`, `limit`, `loyaltyBalance` (`points`), `earn base` (`base`, `earneverythingelse`), and more (see `server/csvImport.mjs`).

Template: [`templates/wallet-import-template.csv`](./templates/wallet-import-template.csv).

## Other commands

```bash
npm run build   # TypeScript + Tailwind + bundle → dist/
npm run preview # static server for dist/ (port 4173)
npm run lint
```

Set `API_BASE` when building if the UI should call a non-default API host:

```bash
# Windows PowerShell
$env:API_BASE="http://127.0.0.1:3847"; npm run build
```

Routing uses **hash URLs** (`#/wallet`, `#/sync`, …) so static hosting and refresh work.

## What’s persisted

| Location | Data |
|----------|------|
| `data/state.json` | Wallet cards, Plaid linked items (access tokens — **keep private**), last sync time |
| Browser `localStorage` (`pmos_spend_v1`, `pmos_prefs_v1`) | Optimizer spend inputs and UI prefs |

## Disclaimers

- **Not financial advice.** Verify offers and benefits with issuers.
- **Valuations** use fixed cpp assumptions in code—not personalized redemptions.
- **Plaid** availability and fields depend on your institution. This is a personal prototype; secure your machine, `.env`, and `data/state.json`.

## Project layout

- `server/` — Express API, Plaid, CSV import, JSON state
- `scripts/dev.mjs`, `scripts/build.mjs` — esbuild + Tailwind
- `src/data/seed.ts` — programs, categories, demo suggestions
- `src/pages/*` — Dashboard, Wallet, Sync, Compare, Optimizer, Tips
