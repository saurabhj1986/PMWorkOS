import { kpis } from "../../data/kpis";
import Tooltip from "../../components/Tooltip";

export default function KpiCards() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted-text)]">
                {kpi.label}
              </p>
              <Tooltip text={kpi.tooltip} />
            </div>
            <p className="mt-3 font-serif text-3xl font-semibold text-[var(--color-dark-text)]">
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted-text)]">
              {kpi.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
