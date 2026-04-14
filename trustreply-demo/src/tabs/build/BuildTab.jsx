import { motion } from "framer-motion";
import {
  Lightbulb,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Layers,
  Cpu,
  BarChart3,
  GitBranch,
  Shield,
  Zap,
} from "lucide-react";

const DECISIONS = [
  {
    title: "Trust Index as the unifying metric",
    detail: "Weighted composite (confidence 0.4 + accuracy 0.3 + freshness 0.2 + benchmark 0.1) with three bands: TRUSTED / REVIEW / FLAG. Every AI output in the system carries one.",
    Icon: Shield,
  },
  {
    title: "8-stage pipeline, not a chatbot",
    detail: "Questionnaires are batch workflows, not conversations. The pipeline model maps directly to how trust teams actually work — inbound, parse, classify, map, retrieve, draft, review, deliver.",
    Icon: GitBranch,
  },
  {
    title: "Agent roster with specialization",
    detail: "6 agents with distinct jobs (draft, collect evidence, detect drift, remediate, triage, notify) instead of one monolithic agent. Mirrors team structure and makes trust scoring per-agent possible.",
    Icon: Cpu,
  },
  {
    title: "Compounding reuse as the flywheel",
    detail: "Stage 8 outputs become Stage 5 inputs. Every approved answer makes the next questionnaire faster. This is the business model — the 84% reuse rate climbs every quarter without hiring.",
    Icon: BarChart3,
  },
  {
    title: "Due diligence scope, not real-time monitoring",
    detail: "This pipeline handles customer due diligence (pre-sales questionnaires) — point-in-time attestation, not continuous monitoring. Evidence references third-party reports (SOC 2 Type II, ISO certs) alongside internal configs. A separate due care workflow would handle post-acquisition audits.",
    Icon: Layers,
  },
];

const DISCOVERY_QUESTIONS = [
  "What's your evidence currency SLA today — 90 days? 365? Varies by control family?",
  "How do you handle multi-part questions where one control maps to several sub-questions?",
  "Is there an existing approved_answers library, or is everyone copy-pasting from old responses?",
  "Which CRM feeds deal data — Salesforce? HubSpot? How stale is the deal-to-questionnaire link?",
  "How many analysts are on the team today, and how do you measure analyst velocity?",
  "What's the current handoff from security review to legal review? Is there a gate?",
  "Where's the risk tolerance line — should customers see real-time posture or point-in-time reports?",
];

const GAPS = [
  { label: "No real Snowflake connection", note: "All data is mock. The schema is designed for Snowflake but nothing queries it." },
  { label: "Due diligence only", note: "Pipeline covers pre-sales questionnaires. A full platform needs a separate due care workflow for post-acquisition audits and continuous monitoring." },
  { label: "No auth or RBAC", note: "A trust platform needs role-based access (analyst vs. engineer vs. CISO). This demo has none." },
  { label: "Evidence collection is simulated", note: "The Evidence Collector agent has no real integrations (Anecdotes, CrowdStrike, Okta). It's a mock dispatch." },
];

const WHATS_NEXT = [
  "Connect to Snowflake and run real queries against the schema",
  "Build the actual TrustReply agent on Claude with RAG over evidence artifacts",
  "Add Slack + PagerDuty integrations for the Notification Agent",
  "Build an analyst workspace with side-by-side question + draft + evidence view",
  "Implement RBAC and customer-facing portal for questionnaire status",
];

/**
 * BuildTab — the meta-tab. Product thinking: decisions made, discovery questions,
 * honest gaps, what's next. Compact card layout, minimal prose.
 */
export default function BuildTab() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
            How I Built This
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-inset ring-amber-500/30">
            <Layers className="h-3 w-3" strokeWidth={2.5} />
            Product thinking
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted-text)]">
          Design decisions, discovery questions, honest gaps, and what comes next
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Decisions Made */}
        <Section title="Decisions made" Icon={Lightbulb} color="emerald">
          <div className="space-y-2">
            {DECISIONS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="rounded-lg border border-slate-800 bg-slate-900/40 p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                    <d.Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-[11px] font-semibold text-slate-100">
                    {d.title}
                  </h4>
                </div>
                <p className="mt-1.5 pl-8 text-[10px] leading-snug text-[var(--color-muted-text)]">
                  {d.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Discovery Questions */}
        <Section title="Discovery questions" Icon={HelpCircle} color="blue">
          <ul className="space-y-1.5">
            {DISCOVERY_QUESTIONS.map((q, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-2.5"
              >
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-mono text-[9px] font-bold text-blue-300 ring-1 ring-inset ring-blue-500/30">
                  {i + 1}
                </span>
                <span className="text-[10px] leading-snug text-slate-200">
                  {q}
                </span>
              </motion.li>
            ))}
          </ul>
        </Section>

        {/* Honest Gaps */}
        <Section title="Honest gaps" Icon={AlertCircle} color="amber">
          <div className="space-y-1.5">
            {GAPS.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5"
              >
                <div className="text-[11px] font-semibold text-amber-200">
                  {g.label}
                </div>
                <div className="mt-0.5 text-[10px] leading-snug text-[var(--color-muted-text)]">
                  {g.note}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* What's Next */}
        <Section title="What's next" Icon={Zap} color="purple">
          <ol className="space-y-1.5">
            {WHATS_NEXT.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-2.5"
              >
                <ArrowRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-purple-400" strokeWidth={2.5} />
                <span className="text-[10px] leading-snug text-slate-200">
                  {item}
                </span>
              </motion.li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, Icon, color, children }) {
  const colorStyles = {
    emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    blue: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    amber: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    purple: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[var(--color-card-bg)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ring-1 ring-inset ${colorStyles[color]}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <h3 className="font-serif text-sm font-semibold text-[var(--color-dark-text)]">
          {title}
        </h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
