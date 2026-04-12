import { useState } from "react";
import {
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Users,
  Repeat,
  Target,
  Clock,
} from "lucide-react";
import { customerBriefings } from "../../data/customerBriefings";
import { getAgent } from "../../data/agents";
import TrustScoreBadge from "../../components/TrustScoreBadge";
import { formatPct } from "../../lib/trustScore";

export default function CustomerBriefings() {
  const [activeId, setActiveId] = useState(customerBriefings[0].id);
  const briefing = customerBriefings.find((b) => b.id === activeId);

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[var(--color-dark-text)]">
            Customer Briefings
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted-text)]">
            One-click "what's happening on this deal?" Click any customer chip
            to see questionnaire status, blockers, the agents currently working
            it, and a recommendation.
          </p>
        </div>
      </header>

      <div className="mt-4 -mx-1 flex flex-wrap gap-2 px-1">
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
                  ? "border-[var(--color-accent-blue)] bg-blue-50 text-[var(--color-dark-text)] shadow-sm"
                  : "border-slate-200 bg-white text-[var(--color-muted-text)] hover:border-slate-300 hover:text-[var(--color-dark-text)]"
              }`}
            >
              <Building2
                className={`h-3.5 w-3.5 ${
                  isActive ? "text-[var(--color-accent-blue)]" : ""
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

      <BriefingCard briefing={briefing} />
    </section>
  );
}

function BriefingCard({ briefing }) {
  const q = briefing.questionnaire;
  const pctAnswered = Math.round((q.answered / q.total) * 100);
  const isCritical = briefing.blockers.critical > 0;

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
              {briefing.customerName}
            </h3>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[var(--color-muted-text)]">
              {briefing.dealStage}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted-text)]">
            <span className="inline-flex items-center gap-1">
              <Target className="h-3 w-3" strokeWidth={2.5} />
              <span className="font-mono font-medium text-[var(--color-dark-text)]">
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

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-4 border-t border-slate-100 p-4 lg:grid-cols-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
            Blockers
          </div>
          <div
            className={`mt-2 flex items-start gap-2 rounded-lg border p-3 ${
              isCritical
                ? "border-red-200 bg-red-50"
                : briefing.blockers.warning > 0
                  ? "border-amber-200 bg-amber-50"
                  : "border-emerald-200 bg-emerald-50"
            }`}
          >
            {isCritical ? (
              <AlertTriangle
                className="h-4 w-4 flex-shrink-0 text-red-600"
                strokeWidth={2.5}
              />
            ) : briefing.blockers.warning > 0 ? (
              <AlertTriangle
                className="h-4 w-4 flex-shrink-0 text-amber-600"
                strokeWidth={2.5}
              />
            ) : (
              <CheckCircle2
                className="h-4 w-4 flex-shrink-0 text-emerald-600"
                strokeWidth={2.5}
              />
            )}
            <div className="text-xs">
              <div className="font-semibold text-[var(--color-dark-text)]">
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
              <div className="rounded-lg border border-dashed border-slate-200 bg-white p-3 text-xs text-[var(--color-muted-text)]">
                <Users className="mb-1 h-4 w-4" strokeWidth={2} />
                No agents currently dispatched.
              </div>
            ) : (
              briefing.agentsOnDeal.map((a, i) => {
                const agent = getAgent(a.agentId);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-50">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                    </div>
                    <div className="min-w-0 text-xs">
                      <div className="font-semibold text-[var(--color-dark-text)]">
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

      <div className="border-t border-slate-100 bg-slate-50/40 p-4">
        <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-text)]">
          Recommendation
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-dark-text)]">
          {briefing.recommendation}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, progress, icon: Icon }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
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
      <div className="mt-1 font-mono text-lg font-semibold text-[var(--color-dark-text)]">
        {value}
      </div>
      <div className="mt-0.5 text-[11px] text-[var(--color-muted-text)]">
        {sub}
      </div>
      {typeof progress === "number" && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
