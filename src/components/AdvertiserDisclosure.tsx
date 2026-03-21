export function AdvertiserDisclosure() {
  return (
    <footer className="border-t border-surface-border bg-surface-raised/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-zinc-500 space-y-3">
        <p className="font-medium text-zinc-400">Advertiser disclosure</p>
        <p>
          This prototype may link to third-party sites that earn commissions on
          approved applications. Outbound links are for research only; this app
          does not originate financial products.
        </p>
        <p>
          <strong className="text-zinc-400">Not financial advice.</strong>{" "}
          Terms change frequently. Verify offers, benefits, and taxes with
          issuers and qualified professionals.
        </p>
        <p>
          <strong className="text-zinc-400">Plaid:</strong> Account linking and
          balances depend on Plaid and your institution. Point/mile program
          balances may still need separate tracking unless your issuer exposes
          them through supported channels.
        </p>
      </div>
    </footer>
  );
}
