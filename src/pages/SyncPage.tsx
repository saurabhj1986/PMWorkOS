import { useCallback, useEffect, useState } from "react";
import { PlaidLinkButton } from "@/components/PlaidLinkButton";
import { API_BASE, createLinkToken, exchangePublicToken } from "@/lib/api";
import { useWalletStore } from "@/stores/walletStore";

export function SyncPage() {
  const load = useWalletStore((s) => s.load);
  const refreshPlaid = useWalletStore((s) => s.refreshPlaid);
  const importCsv = useWalletStore((s) => s.importCsv);
  const loadDemo = useWalletStore((s) => s.loadDemo);
  const lastPlaidSync = useWalletStore((s) => s.lastPlaidSync);
  const plaidItemCount = useWalletStore((s) => s.plaidItemCount);
  const lastRefreshNote = useWalletStore((s) => s.lastRefreshNote);
  const status = useWalletStore((s) => s.status);
  const error = useWalletStore((s) => s.error);

  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => setApiOk(r.ok))
      .catch(() => setApiOk(false));
  }, []);

  const onPlaidSuccess = useCallback(
    async (public_token: string) => {
      setLinkError(null);
      try {
        await exchangePublicToken(public_token);
        await load();
      } catch (e) {
        setLinkError(e instanceof Error ? e.message : "Link exchange failed");
      }
    },
    [load]
  );

  useEffect(() => {
    createLinkToken()
      .then((r) => setLinkToken(r.link_token))
      .catch((e) =>
        setLinkError(
          e instanceof Error ? e.message : "Could not create Plaid Link token"
        )
      );
  }, []);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    await importCsv(f);
    e.target.value = "";
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Sync & import
        </h1>
        <p className="text-zinc-400 mt-1">
          Replace your spreadsheet with a CSV import, then keep balances fresh
          with Plaid. API:{" "}
          <code className="text-zinc-300">{API_BASE}</code>
        </p>
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-raised p-5 space-y-2">
        <h2 className="text-sm font-medium text-zinc-300">API status</h2>
        {apiOk === null && (
          <p className="text-sm text-zinc-500">Checking…</p>
        )}
        {apiOk === true && (
          <p className="text-sm text-gain">Connected to backend.</p>
        )}
        {apiOk === false && (
          <p className="text-sm text-red-400">
            Backend unreachable. Run{" "}
            <code className="text-zinc-300">npm run server</code> in another
            terminal.
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {lastRefreshNote && (
        <div className="rounded-lg border border-surface-border bg-surface-raised px-4 py-3 text-sm text-zinc-300">
          {lastRefreshNote}
        </div>
      )}

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5 space-y-4">
        <h2 className="text-lg font-medium text-white">1. Import spreadsheet</h2>
        <p className="text-sm text-zinc-400">
          Export Excel/Google Sheets as <strong className="text-zinc-300">CSV UTF-8</strong>.
          Required column: <code className="text-zinc-300">name</code>. Strongly
          recommended: <code className="text-zinc-300">last4</code> (must match
          Plaid account mask for balance sync). See{" "}
          <code className="text-zinc-300">templates/wallet-import-template.csv</code>
          .
        </p>
        <label className="inline-flex">
          <span className="sr-only">CSV file</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={onFile}
            disabled={status === "loading"}
            className="text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border file:border-surface-border file:bg-surface file:px-3 file:py-2 file:text-sm file:text-zinc-200"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => loadDemo()}
            disabled={status === "loading"}
            className="text-sm text-accent hover:underline"
          >
            Load demo wallet instead
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5 space-y-4">
        <h2 className="text-lg font-medium text-white">2. Connect Plaid</h2>
        <p className="text-sm text-zinc-400">
          Uses Plaid Sandbox by default. After linking, balances update for rows
          where <code className="text-zinc-300">last4</code> matches the linked
          account mask.
        </p>
        {linkError && (
          <p className="text-sm text-amber-400">{linkError}</p>
        )}
        {linkToken ? (
          <PlaidLinkButton
            linkToken={linkToken}
            onSuccess={onPlaidSuccess}
            disabled={false}
          />
        ) : (
          <button
            type="button"
            disabled
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium opacity-40"
          >
            Preparing Plaid…
          </button>
        )}
        <p className="text-xs text-zinc-500">
          Linked items: {plaidItemCount}. Last balance sync:{" "}
          {lastPlaidSync
            ? new Date(lastPlaidSync).toLocaleString()
            : "—"}
        </p>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface-raised p-5 space-y-3">
        <h2 className="text-lg font-medium text-white">3. Refresh balances</h2>
        <p className="text-sm text-zinc-400">
          Pulls latest balances from Plaid. Configure{" "}
          <code className="text-zinc-300">PLAID_WEBHOOK_URL</code> (e.g. via
          ngrok) for push updates — webhook hits{" "}
          <code className="text-zinc-300">POST /api/plaid/webhook</code>.
        </p>
        <button
          type="button"
          onClick={() => refreshPlaid()}
          disabled={status === "loading" || plaidItemCount === 0}
          className="px-4 py-2 rounded-lg border border-surface-border text-sm text-zinc-200 hover:bg-zinc-800 disabled:opacity-40"
        >
          Refresh balances now
        </button>
      </section>
    </div>
  );
}
