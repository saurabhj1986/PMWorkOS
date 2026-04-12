import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Users,
  Repeat,
  Target,
  Clock,
  Lightbulb,
} from "lucide-react";
import { customerBriefings } from "../../data/customerBriefings";
import { getAgent } from "../../data/agents";
import TrustScoreBadge from "../../components/TrustScoreBadge";
import { formatPct } from "../../lib/trustScore";

export default function CustomerBriefings() {
  const [activeId, setActiveId] = useState(customerBriefings[0].id);
  const briefing = customerBriefings.find((b) => b.id === activeId);

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center gap-2">
        <h2 className="font-serif text-base font-semibold text-[var(--color-dark-text)]">
          Customer Briefings
        </h2>
        <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300 ring-1 ring-inset ring-blue-500/30">
          {customerBriefings.length} deals
        </span>
      </header>

      <div className="mt-3 -mx-1 flex flex-wrap gap-2 px-1">
        {customerBriefings.map((b) => {
          const isActive = b.id === activeId;
          const isAtRisk = b.blockers.critical > 0;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveId(b.id)}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-blue-500/50 bg-blue-500/15 text-slate-100"
                  : "border-slate-800 bg-slate-900/40 text-[var(--color-muted-text)] hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <Building2
                className={`h-3.5 w-3.5 ${
                  isActive ? "text-blue-300" : ""
                }`}
                strokeWidth={2.2}
              />
              <span>{b.customerName}</span>
              <span className="font-mono text-[10px] text-[var(--color-muted-text)]">
                {b.dealValue}
              </span>
              {isAtRisk && (
                <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={briefing.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <BriefingCard briefing={briefing} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function BriefingCard({ briefing }) {
  const q = briefing.questionnaire;
  const pctAnswered = Math.round((q.answered / q.total) * 100);
  const isCritical = briefing.blockers.critical > 0;

  return (
    <div className="mt-3 rounded-xl border border-slate-800/80 bg-slate-900/40">
      <div className="flex flex-col gap-3 border-b border-slate-800/60 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-semibold text-slate-100">
              {briefing.customerName}
            </h3>
            <span className="inline-flex items-center rounded-full bg-slate-800/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-slate-300 ring-1 ring-inset ring-slate-700">
              {briefing.dealStage}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[var(--color-muted-text)]">
            <span className="inline-flex items-center gap-1">
              <Target className="h-3 w-3" strokeWidth={2.5} />
              <span className="font-mono font-medium text-slate-200">
                {briefing.dealValue}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" strokeWidth={2.5} />
              {briefing.daysToClose === 0
                ? "Live"
                : `${briefing.daysToClose} days to close`}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={2.5} />
              {briefing.lastHumanAction}
            </span>
          </div>
        </div>
        <TrustScoreBadge inputs={briefing.trustInputs} variant="expanded" />
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 lg:grid-cols-3">
        <Stat
          label="Questionnaire"
          value={`${q.answered} / ${q.total}`}
          sub={`${q.type} · ${pctAnswered}% complete`}
          progress={pctAnswered}
        />
        <Stat
          label="Reuse rate"
          value={formatPct(briefing.reuseRate)}
          sub={`${q.reused} of ${q.answered} answers reused from library`}
          icon={Repeat}
        />
        <Stat
          label="Avg response"
          value={
            q.avgResponseDays === null
              ? "—"
              : `${q.avgResponseDays.toFixed(1)}d`
          }
          sub={
            q.avgResponseDays === null
              ? "No analyst velocity yet"
              : "per question · target <2.0d"
          }
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-slate-800/60 p-4 lg:grid-cols-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
            Blockers
          </div>
          <div
            className={`mt-2 flex items-start gap-2 rounded-lg border p-3 ${
              isCritical
                ? "border-red-500/30 bg-red-500/10"
                : briefing.blockers.warning > 0
                  ? "border-amber-500/30 bg-amber-500/10"
                  : "border-emerald-500/30 bg-emerald-500/10"
            }`}
          >
            {isCritical ? (
              <AlertTriangle
                className="h-4 w-4 flex-shrink-0 text-red-300"
                strokeWidth={2.5}
              />
            ) : briefing.blockers.warning > 0 ? (
              <AlertTriangle
                className="h-4 w-4 flex-shrink-0 text-amber-300"
                strokeWidth={2.5}
              />
            ) : (
              <CheckCircle2
                className="h-4 w-4 flex-shrink-0 text-emerald-300"
                strokeWidth={2.5}
              />
            )}
            <div className="text-xs">
              <div className="font-semibold text-slate-100">
                {briefing.blockers.critical} critical ·{" "}
                {briefing.blockers.warning} warning
              </div>
              <div className="mt-0.5 text-[var(--color-muted-text)]">
                {briefing.blockers.note}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
            Agents on this deal
          </div>
          <div className="mt-2 space-y-2">
            {briefing.agentsOnDeal.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-3 text-xs text-[var(--color-muted-text)]">
                <Users className="mb-1 h-4 w-4" strokeWidth={2} />
                No agents currently dispatched.
              </div>
            ) : (
              briefing.agentsOnDeal.map((a, i) => {
                const agent = getAgent(a.agentId);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-500/15 ring-1 ring-inset ring-blue-500/30">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                    </div>
                    <div className="min-w-0 text-xs">
                      <div className="font-semibold text-slate-100">
                        {agent?.name ?? a.agentId}
                      </div>
                      <div className="text-[var(--color-muted-text)]">
                        {a.currentAction}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 border-t border-slate-800/60 bg-slate-950/40 p-3">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-500/30">
          <Lightbulb className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        <p className="line-clamp-2 text-[11px] leading-snug text-slate-200">
          {briefing.recommendation}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, progress, icon: Icon }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
          {label}
        </div>
        {Icon && (
          <Icon
            className="h-3.5 w-3.5 text-[var(--color-muted-text)]"
            strokeWidth={2.2}
          />
        )}
      </div>
      <div className="mt-1 font-mono text-lg font-semibold text-slate-100">
        {value}
      </div>
      <div className="mt-0.5 text-[11px] text-[var(--color-muted-text)]">
        {sub}
      </div>
      {typeof progress === "number" && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
