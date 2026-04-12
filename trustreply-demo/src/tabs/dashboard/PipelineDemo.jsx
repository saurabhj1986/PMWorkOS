import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Columns2,
} from "lucide-react";
import { pipelineStages } from "../../data/pipelineStages";
import { clients } from "../../data/clients";
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

/** Merge base stage definition with client-specific overrides */
function mergeStages(clientId) {
  const client = clients.find((c) => c.id === clientId) ?? clients[0];
  return pipelineStages.map((stage) => ({
    ...stage,
    ...client.stages[stage.id],
  }));
}

export default function PipelineDemo({ onStageChange }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [playing, setPlaying] = useState(true);
  const [clientId, setClientId] = useState("latham");
  const [comparing, setComparing] = useState(false);
  const [compareId, setCompareId] = useState("goldman");
  const intervalRef = useRef(null);

  const client = clients.find((c) => c.id === clientId) ?? clients[0];
  const compareClient = clients.find((c) => c.id === compareId) ?? clients[1];
  const stages = useMemo(() => mergeStages(clientId), [clientId]);
  const compareStages = useMemo(() => mergeStages(compareId), [compareId]);
  const activeStage = stages[activeIdx];
  const compareActiveStage = compareStages[activeIdx];

  // Notify parent when active stage or client changes
  useEffect(() => {
    if (onStageChange) {
      const controlId = activeIdx >= 3 ? client.mappedControl : null;
      onStageChange(activeIdx, controlId);
    }
  }, [activeIdx, clientId, client.mappedControl, onStageChange]);

  const visit = (idx) => {
    setActiveIdx(idx);
    setVisited((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  };

  // Auto-play
  useEffect(() => {
    if (!playing) {
      clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = prev + 1;
        if (next >= pipelineStages.length) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          return prev;
        }
        setVisited((v) => {
          const merged = new Set(v);
          for (let i = 0; i <= next; i++) merged.add(i);
          return merged;
        });
        return next;
      });
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const togglePlay = () => {
    if (!playing && activeIdx >= pipelineStages.length - 1) {
      setActiveIdx(0);
      setVisited(new Set([0]));
      setPlaying(true);
    } else {
      setPlaying((v) => !v);
    }
  };
  const reset = () => {
    setPlaying(false);
    setActiveIdx(0);
    setVisited(new Set([0]));
  };

  const switchClient = useCallback(
    (id) => {
      setClientId(id);
      setPlaying(false);
      setActiveIdx(0);
      setVisited(new Set([0]));
      // auto-pick a different compare client
      if (id === compareId) {
        const alt = clients.find((c) => c.id !== id);
        if (alt) setCompareId(alt.id);
      }
    },
    [compareId],
  );

  const toggleCompare = () => {
    setComparing((v) => !v);
  };

  const progressPct = useMemo(
    () => Math.round((visited.size / pipelineStages.length) * 100),
    [visited],
  );

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
              Live Pipeline{" "}
              {comparing
                ? `· ${client.shortName} vs ${compareClient.shortName}`
                : `· ${client.name}`}
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300 ring-1 ring-inset ring-blue-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              In flight
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--color-muted-text)]">
            {client.questionnaire} · {client.totalQuestions} questions ·{" "}
            {client.dealValue} deal · watch the questionnaire move through 8
            stages in real time
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Client selector */}
          <div className="relative">
            <select
              value={clientId}
              onChange={(e) => switchClient(e.target.value)}
              className="appearance-none rounded-lg border border-slate-700 bg-slate-800/60 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Compare toggle */}
          <button
            type="button"
            onClick={toggleCompare}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              comparing
                ? "border-purple-500/60 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25"
                : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Columns2 className="h-3.5 w-3.5" strokeWidth={2} />
            Compare
          </button>

          {/* Second client selector (compare mode) */}
          {comparing && (
            <div className="relative">
              <select
                value={compareId}
                onChange={(e) => setCompareId(e.target.value)}
                className="appearance-none rounded-lg border border-purple-500/40 bg-purple-500/10 py-1.5 pl-3 pr-8 text-xs font-medium text-purple-200 transition hover:border-purple-500/60 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              >
                {clients
                  .filter((c) => c.id !== clientId)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-purple-300" />
            </div>
          )}

          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent-blue)] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-500"
          >
            {playing ? (
              <>
                <Pause className="h-3.5 w-3.5" strokeWidth={2.5} />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" strokeWidth={2.5} />
                Play
              </>
            )}
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

      {/* Animated flow */}
      <div className="mt-5">
        <FlowDiagram
          stages={stages}
          activeIdx={activeIdx}
          visited={visited}
          packetLabel={client.shortName}
          onSelect={(idx) => {
            setPlaying(false);
            visit(idx);
          }}
        />
      </div>

      {/* Progress strip */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
          <span>
            Stage{" "}
            <span className="font-mono text-slate-200">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>{" "}
            / 08 · {activeStage.title}
          </span>
          <span>
            <span className="font-mono text-slate-200">{progressPct}%</span>{" "}
            walked
          </span>
        </div>
        <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-teal)]"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Inspector */}
      {comparing ? (
        <CompareInspector
          stageA={activeStage}
          stageB={compareActiveStage}
          clientA={client}
          clientB={compareClient}
        />
      ) : (
        <Inspector stage={activeStage} />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FlowDiagram — 8 nodes + animated packet                                    */
/* -------------------------------------------------------------------------- */

function FlowDiagram({ stages, activeIdx, visited, packetLabel, onSelect }) {
  return (
    <div className="relative flex w-full items-stretch">
      {stages.map((stage, idx) => {
        const Icon = ICON_MAP[stage.icon] ?? Inbox;
        const isActive = idx === activeIdx;
        const isVisited = visited.has(idx);
        const isLast = idx === stages.length - 1;

        return (
          <div key={stage.id} className="flex min-w-0 flex-1 items-start">
            <button
              type="button"
              onClick={() => onSelect(idx)}
              className="group relative flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg p-1 text-center transition hover:bg-slate-800/40"
            >
              {isActive && (
                <motion.div
                  layoutId="packet"
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className="pointer-events-none absolute -top-3 left-1/2 z-10 -translate-x-1/2"
                >
                  <div className="flex items-center gap-1 rounded-full border border-blue-400/60 bg-blue-500/90 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-white shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                    <span className="h-1 w-1 rounded-full bg-white" />
                    {packetLabel}
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent-blue)] text-white shadow-[0_0_0_4px_rgba(59,130,246,0.3),0_0_24px_rgba(59,130,246,0.4)]"
                      : isVisited
                        ? "bg-emerald-500/90 text-white shadow-[0_0_0_3px_rgba(16,185,129,0.18)]"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                  }`}
                >
                  {isVisited && !isActive ? (
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  )}
                </motion.div>
                <span
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-mono font-semibold ring-2 ring-[var(--color-card-bg)] ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isVisited
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {idx + 1}
                </span>
              </div>

              <div className="mt-1.5 flex h-10 flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${stage.id}-${isActive}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className={`font-mono text-base font-bold leading-none ${
                      isActive
                        ? "text-blue-300"
                        : isVisited
                          ? "text-emerald-300"
                          : "text-slate-500"
                    }`}
                  >
                    {stage.headlineStat.value}
                  </motion.div>
                </AnimatePresence>
                <div
                  className={`mt-0.5 text-[9px] uppercase tracking-wide ${
                    isActive ? "text-blue-300/80" : "text-slate-500"
                  }`}
                >
                  {stage.headlineStat.label}
                </div>
              </div>

              <h3
                className={`px-1 text-[10px] font-semibold uppercase leading-tight tracking-wide ${
                  isActive
                    ? "text-white"
                    : isVisited
                      ? "text-slate-300"
                      : "text-slate-500"
                }`}
              >
                {stage.title}
              </h3>
            </button>

            {!isLast && <Connector visited={visited.has(idx + 1)} />}
          </div>
        );
      })}
    </div>
  );
}

function Connector({ visited }) {
  const color = visited ? "rgba(16,185,129,0.8)" : "rgba(71,85,105,0.6)";
  return (
    <div className="flex h-12 items-center px-0.5">
      <div className="flex w-full min-w-[16px] items-center">
        <motion.div
          className="h-px flex-1"
          animate={{
            background: visited
              ? "linear-gradient(to right, rgba(16,185,129,0.8), rgba(16,185,129,0.2))"
              : "rgba(71,85,105,0.6)",
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.svg
          width="8"
          height="10"
          viewBox="0 0 8 10"
          fill="none"
          className="-ml-px flex-shrink-0"
          animate={{ opacity: visited ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <path
            d="M1 1L6 5L1 9"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Inspector — single client view                                              */
/* -------------------------------------------------------------------------- */

function Inspector({ stage }) {
  const Icon = ICON_MAP[stage.icon] ?? Inbox;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 lg:grid-cols-12"
      >
        <div className="flex items-start gap-2.5 lg:col-span-4 lg:border-r lg:border-slate-800 lg:pr-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30">
            <Icon className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
              Stage {String(stage.number).padStart(2, "0")} of 08
            </div>
            <h3 className="font-serif text-base font-semibold text-white">
              {stage.title}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--color-muted-text)]">
              {stage.tagline}
            </p>
            {stage.description && (
              <p className="mt-1 text-[11px] leading-snug text-slate-300">
                {stage.description}
              </p>
            )}
            {stage.trustInputs && (
              <div className="mt-2">
                <TrustScoreBadge inputs={stage.trustInputs} />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:border-r lg:border-slate-800 lg:pr-4">
          <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
            What this stage produced
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {stage.sample.slice(0, 4).map((row) => (
              <StatTile key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
            Behind the scenes
          </div>
          <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
            <div className="flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            </div>
            <code className="mt-2 block font-mono text-[10px] leading-snug text-emerald-300/90">
              {stage.behind}
            </code>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* CompareInspector — side-by-side view of two clients                         */
/* -------------------------------------------------------------------------- */

function CompareInspector({ stageA, stageB, clientA, clientB }) {
  const Icon = ICON_MAP[stageA.icon] ?? Inbox;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`compare-${stageA.id}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4"
      >
        {/* Stage identity row */}
        <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30">
            <Icon className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
              Stage {String(stageA.number).padStart(2, "0")} of 08
            </div>
            <h3 className="font-serif text-sm font-semibold text-white">
              {stageA.title}
            </h3>
          </div>
          {stageA.description && (
            <p className="ml-auto text-[11px] leading-snug text-slate-400">
              {stageA.description}
            </p>
          )}
        </div>

        {/* Side-by-side panels */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ComparePanel
            stage={stageA}
            client={clientA}
            accent="blue"
          />
          <ComparePanel
            stage={stageB}
            client={clientB}
            accent="purple"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ComparePanel({ stage, client, accent }) {
  const colors = {
    blue: {
      badge: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
      border: "border-blue-500/30",
      label: "text-blue-300",
    },
    purple: {
      badge: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
      border: "border-purple-500/30",
      label: "text-purple-300",
    },
  }[accent];

  return (
    <div className={`rounded-lg border ${colors.border} bg-slate-950/40 p-3`}>
      {/* Client label */}
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${colors.badge}`}
        >
          {client.shortName}
        </span>
        <span className="text-[10px] text-[var(--color-muted-text)]">
          {client.questionnaire} · {client.dealValue}
        </span>
      </div>

      {/* Tagline */}
      <p className={`text-[11px] font-medium leading-snug ${colors.label}`}>
        {stage.tagline}
      </p>

      {/* Trust score if present */}
      {stage.trustInputs && (
        <div className="mt-2">
          <TrustScoreBadge inputs={stage.trustInputs} />
        </div>
      )}

      {/* Stat tiles */}
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {stage.sample.slice(0, 4).map((row) => (
          <StatTile key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  );
}

function StatTile({ label, value }) {
  const display = value.length > 38 ? value.slice(0, 36) + "…" : value;
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2">
      <div className="font-mono text-[8px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[11px] font-medium leading-tight text-slate-200">
        {display}
      </div>
    </div>
  );
}
