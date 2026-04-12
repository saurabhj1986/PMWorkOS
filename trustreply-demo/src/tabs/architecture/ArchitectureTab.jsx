import { motion } from "framer-motion";
import {
  // Layer icons
  Globe,
  ArrowRightLeft,
  Database,
  Brain,
  Send,
  // Component icons
  Shield,
  KeyRound,
  Activity,
  ScanSearch,
  Cloud,
  Users,
  Cpu,
  Zap,
  Plug,
  GitBranch,
  Clock,
  HardDrive,
  Layers,
  BarChart3,
  Server,
  Sparkles,
  ShieldCheck,
  Award,
  GitCompareArrows,
  MessageSquare,
  Bell,
  Mail,
  LayoutDashboard,
  RefreshCw,
  // UI icons
  Network,
  ChevronRight,
} from "lucide-react";
import { architectureLayers, buyBuildBoundary } from "../../data/architecture";

/* -------------------------------------------------------------------------- */
/* Icon resolver                                                               */
/* -------------------------------------------------------------------------- */

const ICON_MAP = {
  Globe, ArrowRightLeft, Database, Brain, Send,
  Shield, KeyRound, Activity, ScanSearch, Cloud, Users, Cpu,
  Zap, Plug, GitBranch, Clock,
  HardDrive, Layers, BarChart3, Server,
  Sparkles, ShieldCheck, Award, GitCompareArrows,
  MessageSquare, Bell, Mail, LayoutDashboard, RefreshCw,
  Network,
};

function resolveIcon(name) {
  return ICON_MAP[name] ?? Database;
}

/* -------------------------------------------------------------------------- */
/* Color palettes                                                              */
/* -------------------------------------------------------------------------- */

const LAYER_COLORS = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-500/8",
    iconBg: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    pill: "bg-blue-500/10 text-blue-300 ring-blue-500/20",
    text: "text-blue-300",
    dot: "bg-blue-400",
    badge: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  },
  cyan: {
    border: "border-cyan-500",
    bg: "bg-cyan-500/8",
    iconBg: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    pill: "bg-cyan-500/10 text-cyan-300 ring-cyan-500/20",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
  },
  emerald: {
    border: "border-emerald-500",
    bg: "bg-emerald-500/8",
    iconBg: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    pill: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-500/8",
    iconBg: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
    pill: "bg-purple-500/10 text-purple-300 ring-purple-500/20",
    text: "text-purple-300",
    dot: "bg-purple-400",
    badge: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-500/8",
    iconBg: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    pill: "bg-amber-500/10 text-amber-300 ring-amber-500/20",
    text: "text-amber-300",
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  },
};

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

export default function ArchitectureTab() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
            Data Architecture
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
            <Network className="h-3 w-3" strokeWidth={2.5} />
            5 layers
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted-text)]">
          End-to-end trust intelligence stack · Buy the GRC layer, build the
          intelligence layer on Snowflake
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <ArchitectureFlow />

      {/* Stats strip */}
      <div className="grid grid-cols-5 gap-2">
        <QuickStat value="8" label="source systems" />
        <QuickStat value="4" label="ingestion methods" />
        <QuickStat value="3+9" label="schemas · tables" />
        <QuickStat value="4" label="AI functions" />
        <QuickStat value="5" label="delivery channels" />
      </div>

      {/* Layer detail sections */}
      {architectureLayers.map((layer, i) => (
        <LayerSection key={layer.id} layer={layer} index={i} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Architecture Flow Diagram                                                   */
/* -------------------------------------------------------------------------- */

function ArchitectureFlow() {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      {/* Buy / Build labels */}
      <div className="mb-3 flex items-center gap-0">
        <div className="flex-shrink-0" style={{ width: "calc(20% - 8px)" }}>
          <div className="flex items-center justify-center gap-1.5 rounded-full border border-dashed border-blue-500/40 bg-blue-500/5 px-2 py-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-blue-300">
              {buyBuildBoundary.buyLabel}
            </span>
          </div>
        </div>
        <div className="mx-2 flex-shrink-0 text-slate-600">
          <div className="h-px w-4 border-t border-dashed border-slate-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center gap-1.5 rounded-full border border-dashed border-emerald-500/40 bg-emerald-500/5 px-2 py-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-300">
              {buyBuildBoundary.buildLabel}
            </span>
            <span className="font-mono text-[8px] text-emerald-300/60">
              — {buyBuildBoundary.buildDescription}
            </span>
          </div>
        </div>
      </div>

      {/* Flow columns */}
      <div className="flex items-stretch gap-0 overflow-x-auto">
        {architectureLayers.map((layer, i) => {
          const palette = LAYER_COLORS[layer.color];
          const LayerIcon = resolveIcon(layer.icon);

          return (
            <div key={layer.id} className="flex items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className={`flex w-44 flex-shrink-0 flex-col rounded-xl border-t-[3px] ${palette.border} ${palette.bg} p-3`}
              >
                {/* Layer header */}
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset ${palette.iconBg}`}
                  >
                    <LayerIcon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className={`text-[11px] font-bold ${palette.text}`}>
                      {layer.label}
                    </div>
                    <div className="text-[8px] text-slate-500">
                      {layer.subtitle}
                    </div>
                  </div>
                </div>

                {/* Component pills */}
                <div className="mt-3 flex flex-col gap-1">
                  {layer.components.map((comp) => (
                    <div
                      key={comp.name}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono ring-1 ring-inset ${palette.pill}`}
                    >
                      {(() => {
                        const CompIcon = resolveIcon(comp.icon);
                        return (
                          <CompIcon
                            className="h-2.5 w-2.5 flex-shrink-0"
                            strokeWidth={2.5}
                          />
                        );
                      })()}
                      <span className="truncate">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow between columns */}
              {i < architectureLayers.length - 1 && (
                <div className="flex flex-shrink-0 items-center px-1.5">
                  <ChevronRight className="h-4 w-4 text-slate-600" strokeWidth={2} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick stat                                                                  */
/* -------------------------------------------------------------------------- */

function QuickStat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-[var(--color-card-bg)] p-3 text-center shadow-[var(--shadow-card)]">
      <div className="font-mono text-lg font-bold text-slate-100">{value}</div>
      <div className="font-mono text-[8px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Layer detail section                                                        */
/* -------------------------------------------------------------------------- */

function LayerSection({ layer, index }) {
  const palette = LAYER_COLORS[layer.color];
  const LayerIcon = resolveIcon(layer.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-4 shadow-[var(--shadow-card)]"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ring-1 ring-inset ${palette.iconBg}`}
        >
          <LayerIcon className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <h3 className="font-serif text-sm font-semibold text-[var(--color-dark-text)]">
          {layer.label}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ring-1 ring-inset ${palette.badge}`}
        >
          {layer.boundary}
        </span>
        <span className="text-[10px] text-[var(--color-muted-text)]">
          · {layer.components.length} components
        </span>
      </div>
      <p className="mt-1 pl-9 text-[10px] text-[var(--color-muted-text)]">
        {layer.description}
      </p>

      {/* Component cards grid */}
      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
        {layer.components.map((comp, i) => (
          <ComponentCard
            key={comp.name}
            comp={comp}
            color={layer.color}
            delay={i * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Component card                                                              */
/* -------------------------------------------------------------------------- */

function ComponentCard({ comp, color, delay }) {
  const palette = LAYER_COLORS[color];
  const CompIcon = resolveIcon(comp.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className="rounded-lg border border-slate-800 bg-slate-900/40 p-3"
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md ring-1 ring-inset ${palette.iconBg}`}
        >
          <CompIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-[11px] font-semibold text-slate-100">
              {comp.name}
            </h4>
            <span className="rounded bg-slate-800/60 px-1 py-0.5 text-[8px] font-mono uppercase tracking-wide text-slate-400 ring-1 ring-inset ring-slate-700">
              {comp.type}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-1.5 pl-8 text-[10px] leading-snug text-[var(--color-muted-text)]">
        {comp.description}
      </p>
      {/* Data flow pills */}
      <div className="mt-2 flex flex-wrap gap-1 pl-8">
        {comp.dataFlows.map((flow) => (
          <span
            key={flow}
            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[8px] font-mono ring-1 ring-inset ${palette.pill}`}
          >
            {flow}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
