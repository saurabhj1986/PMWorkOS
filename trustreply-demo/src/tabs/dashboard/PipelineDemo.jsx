import { useState, useMemo } from "react";
import {
  Inbox,
  FileText,
  Tags,
  GitBranch,
  Database,
  Sparkles,
  UserCheck,
  Send,
  Play,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import { pipelineStages } from "../../data/pipelineStages";

const ICON_MAP = {
  Inbox,
  FileText,
  Tags,
  GitBranch,
  Database,
  Sparkles,
  UserCheck,
  Send,
};

/**
 * PipelineDemo — interactive 8-stage walkthrough of how TrustReply processes a
 * single customer questionnaire end-to-end. Tracks Latham & Watkins / CAIQ v4 / Q-47
 * from ingestion through delivery.
 *
 * Interaction model:
 *   - Hover any stage card → small popover with the one-line sample payload
 *   - Click any stage card → loads it into the Inspector Panel below
 *   - "Step Forward" button → walks 1→8 sequentially (live demo mode)
 *   - "Reset" → returns to the start
 */
export default function PipelineDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const activeStage = pipelineStages[activeIdx];

  const visit = (idx) => {
    setActiveIdx(idx);
    setVisited((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  };

  const stepForward = () => {
    const next = Math.min(activeIdx + 1, pipelineStages.length - 1);
    visit(next);
  };

  const reset = () => {
    setActiveIdx(0);
    setVisited(new Set([0]));
  };

  const progressPct = useMemo(
    () => Math.round((visited.size / pipelineStages.length) * 100),
    [visited],
  );

  const atEnd = activeIdx === pipelineStages.length - 1;

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-dark-text)]">
              How TrustReply Processes a Questionnaire
            </h2>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent-blue)] ring-1 ring-inset ring-blue-200">
              Live demo
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted-text)]">
            One real customer (Latham &amp; Watkins · CAIQ v4 · 261 questions),
            traced from inbox to delivery. <span className="font-medium text-[var(--color-dark-text)]">Click any stage</span> for sample data and what's happening behind the scenes — or hit{" "}
            <span className="font-medium text-[var(--color-dark-text)]">Step Forward</span> to walk through it sequentially.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={stepForward}
            disabled={atEnd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent-blue)] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Play className="h-4 w-4" strokeWidth={2.5} />
            {atEnd ? "Walkthrough complete" : `Step ${activeIdx + 1} → ${activeIdx + 2}`}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[var(--color-muted-text)] transition hover:border-slate-300 hover:text-[var(--color-dark-text)]"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} />
            Reset
          </button>
        </div>
      </div>

      {/* Progress strip */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-muted-text)]">
          <span>
            Stage{" "}
            <span className="font-mono text-[var(--color-dark-text)]">
              {activeIdx + 1}
            </span>{" "}
            of {pipelineStages.length}
          </span>
          <span>
            <span className="font-mono text-[var(--color-dark-text)]">
              {progressPct}%
            </span>{" "}
            walked
          </span>
        </div>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-teal)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Stage strip */}
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="flex min-w-max items-stretch gap-2">
          {pipelineStages.map((stage, idx) => {
            const Icon = ICON_MAP[stage.icon] ?? Inbox;
            const isActive = idx === activeIdx;
            const isVisited = visited.has(idx);
            const isHovered = idx === hoveredIdx;

            return (
              <div key={stage.id} className="flex items-center">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => visit(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onFocus={() => setHoveredIdx(idx)}
                    onBlur={() => setHoveredIdx(null)}
                    className={`group relative flex w-44 flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition-all ${
                      isActive
                        ? "border-[var(--color-accent-blue)] bg-white shadow-md"
                        : isVisited
                        ? "border-emerald-300 bg-emerald-50/40 hover:border-emerald-400"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-[var(--color-accent-blue)] text-white"
                            : isVisited
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-[var(--color-muted-text)]"
                        }`}
                      >
                        {isVisited && !isActive ? (
                          <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <Icon className="h-4 w-4" strokeWidth={2.5} />
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--color-muted-text)]">
                        {String(stage.number).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold leading-snug text-[var(--color-dark-text)]">
                      {stage.title}
                    </h3>
                    <p className="text-[10px] leading-tight text-[var(--color-muted-text)]">
                      {stage.tagline}
                    </p>
                  </button>

                  {/* Hover popover */}
                  {isHovered && !isActive && (
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 rounded-lg bg-[var(--color-navy)] px-3 py-2 text-[11px] leading-snug text-white shadow-xl"
                    >
                      <div className="font-mono text-[9px] uppercase tracking-wide text-blue-300">
                        Sample payload
                      </div>
                      <div className="mt-1">{stage.hoverPreview}</div>
                    </div>
                  )}
                </div>

                {/* Connector arrow between cards */}
                {idx < pipelineStages.length - 1 && (
                  <ChevronRight
                    className={`mx-0.5 h-4 w-4 flex-shrink-0 ${
                      visited.has(idx + 1)
                        ? "text-emerald-400"
                        : "text-slate-300"
                    }`}
                    strokeWidth={2.5}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspector panel */}
      <Inspector stage={activeStage} />

      {/* Feedback loop note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-3 text-xs text-[var(--color-muted-text)]">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--color-accent-blue)]" />
        <span>
          <span className="font-medium text-[var(--color-dark-text)]">Compounding loop:</span>{" "}
          every approved answer in Stage 8 feeds back into Stage 5's evidence library, so the next questionnaire arrives with more reusable context. This is how the Reuse Rate climbs over time without adding headcount.
        </span>
      </div>
    </section>
  );
}

function Inspector({ stage }) {
  const Icon = ICON_MAP[stage.icon] ?? Inbox;
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 lg:grid-cols-3">
      {/* Left column — meta + What + Behind */}
      <div className="lg:col-span-2 lg:border-r lg:border-slate-100 lg:pr-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-accent-blue)]">
            <Icon className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
              Stage {String(stage.number).padStart(2, "0")} of 08
            </div>
            <h3 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
              {stage.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <Section label="What happens here">
            <p>{stage.what}</p>
          </Section>
          <Section label="Behind the scenes">
            <p className="font-mono text-[12px] leading-relaxed text-slate-700">
              {stage.behind}
            </p>
          </Section>
          <Section label="Why this matters">
            <p>{stage.why}</p>
          </Section>
        </div>
      </div>

      {/* Right column — sample data */}
      <div className="lg:pl-1">
        <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
          Sample data flowing through
        </div>
        <div className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 shadow-inner">
          <div className="flex items-center gap-1.5 border-b border-slate-700/60 bg-slate-800/80 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[10px] text-slate-400">
              payload.json
            </span>
          </div>
          <div className="space-y-1.5 px-4 py-3">
            {stage.sample.map((row) => (
              <div key={row.label} className="font-mono text-[11px] leading-snug">
                <div className="text-blue-300">{row.label}:</div>
                <div className="ml-3 text-emerald-200">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
        {label}
      </div>
      <div className="mt-1 text-sm leading-relaxed text-[var(--color-dark-text)]">
        {children}
      </div>
    </div>
  );
}
