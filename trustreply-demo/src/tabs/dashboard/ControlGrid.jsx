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

export default function ControlGrid({ highlightId }) {
  const total = controls.length;
  const active = controls.filter((c) => c.status === "active").length;

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-sm font-semibold text-[var(--color-dark-text)]">
            Common Control Framework
          </h2>
          <Tooltip text="Common Control Framework (CCF) — 16 control families. 'Test once, audit many' — every compliance framework maps back to these controls." />
        </div>
        <span className="text-[11px] text-[var(--color-muted-text)]">
          {active}/{total} controls active
        </span>
      </div>
      <p className="mb-3 text-[11px] leading-snug text-[var(--color-muted-text)]">
        "Test once, audit many" — each control family maps to multiple frameworks, so one piece of evidence can satisfy SOC 2, ISO 27001, and PCI DSS simultaneously.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {controls.map((control) => {
          const Icon = STATUS_ICON[control.status] ?? ShieldCheck;
          const accent = STATUS_ACCENT[control.status] ?? "text-slate-400";
          const isHighlighted = highlightId === control.id;
          return (
            <div
              key={control.id}
              className={`flex h-full flex-col rounded-lg border p-2.5 shadow-[var(--shadow-card)] transition-all duration-300 ${
                isHighlighted
                  ? "border-blue-500/60 bg-blue-500/10 ring-2 ring-blue-500/25"
                  : "border-slate-800/80 bg-[var(--color-card-bg)] hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon className={`h-3.5 w-3.5 ${isHighlighted ? "text-blue-400" : accent}`} strokeWidth={2.2} />
                  <span className={`font-mono text-[10px] ${isHighlighted ? "text-blue-300 font-semibold" : "text-[var(--color-muted-text)]"}`}>
                    {control.id}
                  </span>
                </div>
                {isHighlighted && (
                  <span className="inline-flex items-center rounded bg-blue-500/20 px-1 py-0.5 text-[7px] font-bold uppercase text-blue-300 ring-1 ring-inset ring-blue-500/30">
                    mapped
                  </span>
                )}
                {!isHighlighted && control.status === "needs_review" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <h3 className={`mt-1 text-[11px] font-semibold leading-tight ${isHighlighted ? "text-blue-100" : "text-slate-100"}`}>
                {control.name}
              </h3>
              {control.frameworks && control.frameworks.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {control.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className={`inline-block rounded px-1 py-0.5 text-[7px] font-medium leading-none ${
                        isHighlighted
                          ? "bg-blue-500/20 text-blue-200 ring-1 ring-inset ring-blue-500/30"
                          : "bg-slate-800 text-slate-400 ring-1 ring-inset ring-slate-700"
                      }`}
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              )}
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
