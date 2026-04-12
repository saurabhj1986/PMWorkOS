import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tags,
  GitBranch,
  Database,
  Sparkles,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  FileQuestion,
} from "lucide-react";
import { agentSamples } from "../../data/agentSamples";
import TrustScoreBadge from "../../components/TrustScoreBadge";

const STEP_DURATION_MS = 1200;

const STEPS = [
  { id: "classify", label: "Classify", Icon: Tags },
  { id: "map", label: "Map", Icon: GitBranch },
  { id: "retrieve", label: "Retrieve", Icon: Database },
  { id: "draft", label: "Draft", Icon: Sparkles },
];

/**
 * AgentTab — interactive demo of the TrustReply Agent reasoning over a single
 * security question. Left pane lists 5 sample questions; right pane animates
 * the agent through 4 steps (classify → map → retrieve → draft) and lands on
 * a final answer with a Trust Index badge.
 */
export default function AgentTab() {
  const [activeId, setActiveId] = useState(agentSamples[0].id);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef(null);

  const sample = agentSamples.find((s) => s.id === activeId);

  // Auto-advance steps
  useEffect(() => {
    if (!playing) {
      clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_DURATION_MS);
    return () => clearInterval(intervalRef.current);
  }, [playing, activeId]);

  // Reset on question change
  const selectQuestion = (id) => {
    setActiveId(id);
    setStepIdx(0);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (stepIdx >= STEPS.length - 1) {
      setStepIdx(0);
      setPlaying(true);
    } else {
      setPlaying((v) => !v);
    }
  };

  const reset = () => {
    setStepIdx(0);
    setPlaying(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
            TrustReply Agent
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300 ring-1 ring-inset ring-blue-500/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Live
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted-text)]">
          Pick a real customer question · watch the agent classify → map →
          retrieve → draft in real time
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left — question picker */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-4 shadow-[var(--shadow-card)]">
            <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
              Sample questions
            </div>
            <ul className="mt-2 space-y-1.5">
              {agentSamples.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => selectQuestion(s.id)}
                    className={`w-full rounded-lg border p-2.5 text-left transition ${
                      s.id === activeId
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileQuestion
                        className={`h-3.5 w-3.5 flex-shrink-0 ${
                          s.id === activeId
                            ? "text-blue-300"
                            : "text-slate-500"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
                        {s.id} · {s.customer}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-200">
                      {s.question}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right — reasoning panel */}
        <section className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
            {/* Question banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                    {sample.questionnaireType} · {sample.customer} · {sample.id}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="inline-flex items-center gap-1 rounded-md bg-[var(--color-accent-blue)] px-2 py-1 text-[10px] font-medium text-white shadow-sm transition hover:bg-blue-500"
                    >
                      {playing && stepIdx < STEPS.length - 1 ? (
                        <>
                          <Pause className="h-3 w-3" strokeWidth={2.5} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" strokeWidth={2.5} />
                          {stepIdx >= STEPS.length - 1 ? "Replay" : "Play"}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-[10px] font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
                    >
                      <RotateCcw className="h-3 w-3" strokeWidth={2.5} />
                      Reset
                    </button>
                  </div>
                </div>
                <p className="mt-1.5 text-sm font-medium leading-snug text-slate-100">
                  "{sample.question}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step indicators */}
            <div className="mt-4 flex items-center gap-2">
              {STEPS.map((step, idx) => {
                const StepIcon = step.Icon;
                const reached = idx <= stepIdx;
                const isCurrent = idx === stepIdx;
                return (
                  <div key={step.id} className="flex flex-1 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2">
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          isCurrent
                            ? "bg-[var(--color-accent-blue)] text-white shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
                            : reached
                              ? "bg-emerald-500/90 text-white"
                              : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {reached && !isCurrent ? (
                          <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <StepIcon className="h-4 w-4" strokeWidth={2.2} />
                        )}
                      </motion.div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                          isCurrent
                            ? "text-blue-300"
                            : reached
                              ? "text-emerald-300"
                              : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className="h-px flex-1 bg-slate-800" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reasoning steps content — stacks as they're reached */}
            <div className="mt-4 space-y-2">
              <AnimatePresence>
                {stepIdx >= 0 && (
                  <ClassifyStep key={`c-${sample.id}`} sample={sample} />
                )}
                {stepIdx >= 1 && <MapStep key={`m-${sample.id}`} sample={sample} />}
                {stepIdx >= 2 && (
                  <RetrieveStep key={`r-${sample.id}`} sample={sample} />
                )}
                {stepIdx >= 3 && (
                  <DraftStep key={`d-${sample.id}`} sample={sample} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Steps                                                                       */
/* -------------------------------------------------------------------------- */

function StepCard({ Icon, label, color, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-xl border border-slate-800 bg-slate-900/40 p-3`}
    >
      <div className="flex items-center gap-2">
        <div className={`flex h-6 w-6 items-center justify-center rounded-md ${color}`}>
          <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        </div>
        <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
          {label}
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </motion.div>
  );
}

function ClassifyStep({ sample }) {
  const c = sample.classify;
  return (
    <StepCard Icon={Tags} label="Step 1 · Classify" color="bg-blue-500">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <DataTile label="category" value={c.category} />
        <DataTile label="sub_topic" value={c.subTopic} />
        <DataTile label="intent" value={c.intent} />
        <DataTile label="confidence" value={`${(c.confidence * 100).toFixed(0)}%`} />
      </div>
    </StepCard>
  );
}

function MapStep({ sample }) {
  const m = sample.map;
  return (
    <StepCard Icon={GitBranch} label="Step 2 · Map to Common Control Framework" color="bg-purple-500">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/15 px-2 py-1 font-mono text-[11px] font-bold text-purple-300 ring-1 ring-inset ring-purple-500/30">
          {m.controlId} · {m.controlName}
        </span>
        <span className="font-mono text-[10px] text-[var(--color-muted-text)]">
          match {(m.matchConfidence * 100).toFixed(0)}%
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {m.frameworks.map((f) => (
          <motion.span
            key={f}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
          >
            {f}
          </motion.span>
        ))}
      </div>
    </StepCard>
  );
}

function RetrieveStep({ sample }) {
  return (
    <StepCard Icon={Database} label={`Step 3 · Retrieve · ${sample.retrieve.length} artifacts`} color="bg-cyan-500">
      <div className="space-y-1.5">
        {sample.retrieve.map((evd, i) => (
          <motion.div
            key={evd.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/40 p-2"
          >
            <span className="font-mono text-[10px] font-bold text-cyan-300">
              {evd.id}
            </span>
            <span className="flex-1 truncate text-[11px] text-slate-200">
              {evd.name}
            </span>
            <span className="font-mono text-[9px] text-[var(--color-muted-text)]">
              {evd.date}
            </span>
            {evd.drift ? (
              <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[8px] font-bold uppercase text-amber-300 ring-1 ring-inset ring-amber-500/30">
                drift
              </span>
            ) : (
              <CheckCircle2 className="h-3 w-3 text-emerald-400" strokeWidth={3} />
            )}
          </motion.div>
        ))}
      </div>
    </StepCard>
  );
}

function DraftStep({ sample }) {
  const d = sample.draft;
  return (
    <StepCard Icon={Sparkles} label="Step 4 · Draft answer + score" color="bg-amber-500">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-[11px] leading-relaxed text-slate-100"
      >
        "{d.answer}"
      </motion.p>
      <div className="mt-2 grid grid-cols-1 items-start gap-2 sm:grid-cols-3">
        <DataTile label="confidence" value={`${(d.confidence * 100).toFixed(0)}%`} />
        <DataTile label="reuse match" value={`${(d.reuseMatch * 100).toFixed(0)}%`} />
        <DataTile label="hallucination" value={d.hallucinationRisk} />
      </div>
      <div className="mt-2">
        <TrustScoreBadge inputs={sample.trustInputs} variant="expanded" />
      </div>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
        Reuse source: {d.reuseSource}
      </div>
    </StepCard>
  );
}

function DataTile({ label, value }) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-950/40 p-1.5">
      <div className="font-mono text-[8px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 line-clamp-1 font-mono text-[11px] font-medium text-slate-100">
        {value}
      </div>
    </div>
  );
}
