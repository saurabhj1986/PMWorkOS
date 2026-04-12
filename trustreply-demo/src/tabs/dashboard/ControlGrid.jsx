import { ShieldCheck, AlertTriangle } from "lucide-react";
import { controls } from "../../data/controls";
import StatusPill from "../../components/StatusPill";
import Tooltip from "../../components/Tooltip";

const STATUS_ICON = {
  active: ShieldCheck,
  needs_review: AlertTriangle,
};

const STATUS_ACCENT = {
  active: "text-emerald-600",
  needs_review: "text-amber-600",
};

export default function ControlGrid() {
  const total = controls.length;
  const active = controls.filter((c) => c.status === "active").length;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-dark-text)]">
            Common Control Framework
          </h2>
          <Tooltip text="Harvey's Common Control Framework (CCF) — 16 control families derived from Josh's Trust Strategy Slide 7. 'Test once, audit many' — every framework Harvey holds maps back to these controls." />
        </div>
        <span className="text-xs text-[var(--color-muted-text)]">
          {active}/{total} controls active
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {controls.map((control) => {
          const Icon = STATUS_ICON[control.status] ?? ShieldCheck;
          const accent = STATUS_ACCENT[control.status] ?? "text-slate-500";
          return (
            <div
              key={control.id}
              className="flex h-full flex-col rounded-xl border border-slate-200/70 bg-white p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${accent}`} strokeWidth={2} />
                  <span className="font-mono text-xs text-[var(--color-muted-text)]">
                    {control.id}
                  </span>
                </div>
                <StatusPill status={control.status} />
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-[var(--color-dark-text)]">
                {control.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1">
                {control.frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-muted-text)]"
                  >
                    {fw}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-[var(--color-muted-text)]">
                <span>
                  <span className="font-mono text-[var(--color-dark-text)]">
                    {control.evidenceCount}
                  </span>{" "}
                  artifacts
                </span>
                <span>
                  Tested{" "}
                  <span className="font-mono text-[var(--color-dark-text)]">
                    {control.lastTested}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
