import { ShieldCheck, AlertTriangle } from "lucide-react";
import { controls } from "../../data/controls";
import StatusPill from "../../components/StatusPill";
import Tooltip from "../../components/Tooltip";

const STATUS_ICON = {
  active: ShieldCheck,
  needs_review: AlertTriangle,
};

const STATUS_ACCENT = {
  active: "text-emerald-400",
  needs_review: "text-amber-400",
};

export default function ControlGrid() {
  const total = controls.length;
  const active = controls.filter((c) => c.status === "active").length;

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-sm font-semibold text-[var(--color-dark-text)]">
            Common Control Framework
          </h2>
          <Tooltip text="Harvey's Common Control Framework (CCF) — 16 control families derived from Josh's Trust Strategy Slide 7. 'Test once, audit many' — every framework Harvey holds maps back to these controls." />
        </div>
        <span className="text-[11px] text-[var(--color-muted-text)]">
          {active}/{total} controls active
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {controls.map((control) => {
          const Icon = STATUS_ICON[control.status] ?? ShieldCheck;
          const accent = STATUS_ACCENT[control.status] ?? "text-slate-400";
          return (
            <div
              key={control.id}
              className="flex h-full flex-col rounded-lg border border-slate-800/80 bg-[var(--color-card-bg)] p-2.5 shadow-[var(--shadow-card)] transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon className={`h-3.5 w-3.5 ${accent}`} strokeWidth={2.2} />
                  <span className="font-mono text-[10px] text-[var(--color-muted-text)]">
                    {control.id}
                  </span>
                </div>
                {control.status === "needs_review" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <h3 className="mt-1 text-[11px] font-semibold leading-tight text-slate-100">
                {control.name}
              </h3>
              <div className="mt-auto pt-2 text-[10px] text-[var(--color-muted-text)]">
                <span className="font-mono text-slate-300">
                  {control.evidenceCount}
                </span>{" "}
                artifacts
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
