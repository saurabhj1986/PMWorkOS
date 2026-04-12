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
  CheckCircle2,
  Info,
} from "lucide-react";
import { pipelineStages } from "../../data/pipelineStages";
import TrustScoreBadge from "../../components/TrustScoreBadge";

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
 * PipelineDemo -- compact flow diagram of the 8-stage TrustReply pipeline.
 *
 * Layout goals:
 *   - All 8 stages visible at once (no horizontal scroll)
 *   - Inspector panel directly below the flow, also compact
 *   - Whole component fits in a single viewport on a 1280px+ screen
 *
 * Interaction:
 *   - Click any node -> loads it into the inspector
 *   - "Step Forward" button -> walks 1->8 sequentially
 *   - "Reset" -> back to stage 1
 */
export default function PipelineDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));

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
    <section className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
              How TrustReply Processes a Questionnaire
            </h2>
            <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300 ring-1 ring-inset ring-blue-500/30">
              Live demo
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--color-muted-text)]">
            One real customer (Latham &amp; Watkins · CAIQ v4 · 261 questions),
            traced from inbox to delivery.{" "}
            <span className="font-medium text-slate-300">Click any node</span>{" "}
            below — or hit Step Forward to walk through it.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={stepForward}
            disabled={atEnd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent-blue)] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            <Play className="h-3.5 w-3.5" strokeWidth={2.5} />
            {atEnd ? "Walkthrough complete" : `Step ${activeIdx + 1} → ${activeIdx + 2}`}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            Reset
          </button>
        </div>
      </div>

      {/* Flow diagram -- 8 nodes evenly distributed, no scroll */}
      <div className="mt-5">
        <FlowDiagram
          stages={pipelineStages}
          activeIdx={activeIdx}
          visited={visited}
          onSelect={visit}
        />
      </div>

      {/* Progress strip */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
          <span>
            Stage{" "}
            <span className="font-mono text-slate-200">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>{" "}
            / 08
          </span>
          <span>
            <span className="font-mono text-slate-200">{progressPct}%</span>{" "}
            walked
          </span>
        </div>
        <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-teal)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Compact inspector */}
      <Inspector stage={activeStage} />

      {/* Compounding loop note */}
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-dashed border-slate-700/70 bg-slate-900/40 p-2.5 text-[11px] text-[var(--color-muted-text)]">
        <Info
          className="mt-0.5 h-3 w-3 flex-shrink-0 text-blue-400"
          strokeWidth={2.5}
        />
        <span>
          <span className="font-medium text-slate-300">
            Compounding loop:
          </span>{" "}
          every approved answer in Stage 8 feeds back into Stage 5's evidence
          library. The next questionnaire arrives with more reusable context —
          this is how Reuse Rate climbs without adding headcount.
        </span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FlowDiagram -- 8 nodes + arrows, all visible in one row                    */
/* -------------------------------------------------------------------------- */

function FlowDiagram({ stages, activeIdx, visited, onSelect }) {
  return (
    <div className="flex w-full items-stretch">
      {stages.map((stage, idx) => {
        const Icon = ICON_MAP[stage.icon] ?? Inbox;
        const isActive = idx === activeIdx;
        const isVisited = visited.has(idx);
        const isLast = idx === stages.length - 1;

        return (
          <div
            key={stage.id}
            className="flex min-w-0 flex-1 items-start"
          >
            <button
              type="button"
              onClick={() => onSelect(idx)}
              className="group flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg p-1 text-center transition hover:bg-slate-800/40"
            >
              <div className="relative">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                    isActive
                      ? "bg-[var(--color-accent-blue)] text-white shadow-[0_0_0_4px_rgba(59,130,246,0.25)]"
                      : isVisited
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                  }`}
                >
                  {isVisited && !isActive ? (
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  )}
                </div>
                <span
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-mono font-semibold ring-2 ring-[var(--color-card-bg)] ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isVisited
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {idx + 1}
                </span>
              </div>
              <h3
                className={`px-1 text-[10px] font-semibold uppercase leading-tight tracking-wide ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {stage.title}
              </h3>
            </button>

            {!isLast && (
              <Connector visited={visited.has(idx + 1)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Connector({ visited }) {
  return (
    <div className="flex h-11 items-center px-0.5">
      <div
        className={`h-px w-full min-w-[12px] ${
          visited
            ? "bg-gradient-to-r from-emerald-500/80 to-emerald-500/20"
            : "bg-slate-700/60"
        }`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Inspector -- compact 3-column layout                                        */
/* -------------------------------------------------------------------------- */

function Inspector({ stage }) {
  const Icon = ICON_MAP[stage.icon] ?? Inbox;
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 lg:grid-cols-12">
      {/* Left -- meta + what + why */}
      <div className="lg:col-span-5 lg:border-r lg:border-slate-800 lg:pr-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30">
            <Icon className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
              Stage {String(stage.number).padStart(2, "0")} of 08
            </div>
            <h3 className="font-serif text-sm font-semibold text-white">
              {stage.title}
            </h3>
          </div>
        </div>
        <Section label="What happens">
          <p>{stage.what}</p>
        </Section>
        <Section label="Why it matters">
          <p>{stage.why}</p>
        </Section>
      </div>

      {/* Middle -- behind the scenes + trust */}
      <div className="lg:col-span-3 lg:border-r lg:border-slate-800 lg:pr-4">
        <Section label="Behind the scenes">
          <p className="font-mono text-[10px] leading-relaxed text-slate-300">
            {stage.behind}
          </p>
        </Section>
        {stage.trustInputs && (
          <Section label="Trust scorecard">
            <TrustScoreBadge inputs={stage.trustInputs} variant="expanded" />
          </Section>
        )}
      </div>

      {/* Right -- sample payload */}
      <div className="lg:col-span-4">
        <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
          Sample payload
        </div>
        <div className="mt-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80 shadow-inner">
          <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900/60 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[9px] text-slate-500">
              payload.json
            </span>
          </div>
          <div className="space-y-1 px-3 py-2">
            {stage.sample.map((row) => (
              <div
                key={row.label}
                className="font-mono text-[10px] leading-snug"
              >
                <div className="text-blue-300">{row.label}:</div>
                <div className="ml-2 text-emerald-300">{row.value}</div>
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
    <div className="mt-3 first:mt-2">
      <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
        {label}
      </div>
      <div className="mt-0.5 text-[11px] leading-relaxed text-slate-200">
        {children}
      </div>
    </div>
  );
}
