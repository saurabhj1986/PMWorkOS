import tipsData from "@/data/tips.json";
import type { TipItem } from "@/types/domain";

const tips = tipsData as TipItem[];

export function TipsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Tips & hacks hub
        </h1>
        <p className="text-zinc-400 mt-1">
          Short summaries with outbound links — read the source for full terms,
          eligibility, and updates.
        </p>
      </div>

      <ul className="space-y-4">
        {tips.map((t) => (
          <li
            key={t.id}
            className="rounded-xl border border-surface-border bg-surface-raised p-5 hover:border-zinc-600 transition-colors"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {t.source}
            </p>
            <h2 className="text-lg font-medium text-white mt-1">{t.title}</h2>
            <p className="text-sm text-zinc-400 mt-2">{t.summary}</p>
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-accent hover:underline"
            >
              Open resource →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
