import { kpis } from "../../data/kpis";
import Tooltip from "../../components/Tooltip";

export default function KpiCards() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-800/80 bg-[var(--color-card-bg)] p-4 shadow-[var(--shadow-card)] transition hover:border-slate-700 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted-text)]">
                {kpi.label}
              </p>
              <Tooltip text={kpi.tooltip} />
            </div>
            <p className="mt-2 font-serif text-2xl font-semibold text-[var(--color-dark-text)]">
              {kpi.value}
            </p>
            <p className="mt-0.5 text-[11px] text-[var(--color-muted-text)]">
              {kpi.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
