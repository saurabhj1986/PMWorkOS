import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  ChevronDown,
  ChevronRight,
  Key,
  Link2,
  Table2,
} from "lucide-react";
import { dataModelTables } from "../../data/dataModel";

const COLOR_MAP = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", iconBg: "bg-blue-500/20", text: "text-blue-300", dot: "bg-blue-400" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", iconBg: "bg-purple-500/20", text: "text-purple-300", dot: "bg-purple-400" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", iconBg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400" },
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", iconBg: "bg-cyan-500/20", text: "text-cyan-300", dot: "bg-cyan-400" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", iconBg: "bg-amber-500/20", text: "text-amber-300", dot: "bg-amber-400" },
  rose: { border: "border-rose-500/30", bg: "bg-rose-500/10", iconBg: "bg-rose-500/20", text: "text-rose-300", dot: "bg-rose-400" },
  indigo: { border: "border-indigo-500/30", bg: "bg-indigo-500/10", iconBg: "bg-indigo-500/20", text: "text-indigo-300", dot: "bg-indigo-400" },
  slate: { border: "border-slate-500/30", bg: "bg-slate-500/10", iconBg: "bg-slate-500/20", text: "text-slate-300", dot: "bg-slate-400" },
};

/**
 * DataModelTab — visual ERD of the trust intelligence data lake.
 * 8 table cards with columns, sample rows, and FK relationships.
 */
export default function DataModelTab() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-xl font-semibold text-[var(--color-dark-text)]">
            Data Model
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
            <Database className="h-3 w-3" strokeWidth={2.5} />
            8 tables
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted-text)]">
          Snowflake trust intelligence schema · click any table to see columns
          and sample rows
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-2">
        <QuickStat value="8" label="tables" />
        <QuickStat value="54" label="columns" />
        <QuickStat value="11" label="foreign keys" />
        <QuickStat value="~98K" label="rows (projected)" />
      </div>

      {/* Table cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {dataModelTables.map((table, idx) => (
          <TableCard key={table.id} table={table} idx={idx} />
        ))}
      </div>
    </div>
  );
}

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

function TableCard({ table, idx }) {
  const [open, setOpen] = useState(false);
  const palette = COLOR_MAP[table.color] ?? COLOR_MAP.slate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.3 }}
      className={`overflow-hidden rounded-xl border ${palette.border} bg-[var(--color-card-bg)] shadow-[var(--shadow-card)]`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-3 text-left transition hover:bg-slate-800/30"
      >
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${palette.iconBg} ${palette.text}`}
        >
          <Table2 className="h-4 w-4" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-xs font-bold text-slate-100">
              {table.name}
            </h3>
            <span className="font-mono text-[9px] text-[var(--color-muted-text)]">
              {table.columns.length} cols
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-[var(--color-muted-text)]">
            {table.description}
          </p>
          {table.relations.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {table.relations.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-0.5 rounded bg-slate-800/60 px-1 py-0.5 text-[8px] font-mono text-slate-400 ring-1 ring-inset ring-slate-700"
                >
                  <Link2 className="h-2 w-2" strokeWidth={2.5} />
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-[var(--color-muted-text)]">
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-800/60 bg-slate-950/40 p-3">
              {/* Column definitions */}
              <div className="font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                Columns
              </div>
              <div className="mt-1.5 space-y-0.5">
                {table.columns.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-2 rounded-md px-2 py-1 text-[10px] font-mono hover:bg-slate-800/40"
                  >
                    {col.pk && (
                      <Key className="h-3 w-3 flex-shrink-0 text-amber-400" strokeWidth={2.5} />
                    )}
                    {col.fk && !col.pk && (
                      <Link2 className="h-3 w-3 flex-shrink-0 text-blue-400" strokeWidth={2.5} />
                    )}
                    {!col.pk && !col.fk && (
                      <span className="h-3 w-3 flex-shrink-0" />
                    )}
                    <span className="font-medium text-slate-200">
                      {col.name}
                    </span>
                    <span className="text-slate-500">{col.type}</span>
                    {col.pk && (
                      <span className="rounded bg-amber-500/15 px-1 py-0.5 text-[7px] uppercase text-amber-300 ring-1 ring-inset ring-amber-500/30">
                        PK
                      </span>
                    )}
                    {col.fk && (
                      <span className="rounded bg-blue-500/15 px-1 py-0.5 text-[7px] uppercase text-blue-300 ring-1 ring-inset ring-blue-500/30">
                        FK → {col.fk}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Sample rows */}
              <div className="mt-3 font-mono text-[9px] uppercase tracking-wide text-[var(--color-muted-text)]">
                Sample rows
              </div>
              <div className="mt-1.5 overflow-x-auto">
                <table className="min-w-full text-[10px]">
                  <thead>
                    <tr>
                      {table.columns.slice(0, 5).map((col) => (
                        <th
                          key={col.name}
                          className="whitespace-nowrap border-b border-slate-800/60 px-2 py-1 text-left font-mono font-medium text-slate-400"
                        >
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-800/30"
                      >
                        {table.columns.slice(0, 5).map((col) => (
                          <td
                            key={col.name}
                            className="whitespace-nowrap border-b border-slate-800/30 px-2 py-1 font-mono text-slate-200"
                          >
                            {formatCell(row[col.name])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function formatCell(val) {
  if (val === undefined || val === null) return "—";
  if (typeof val === "number" && val > 100000) {
    return `$${(val / 1_000_000).toFixed(1)}M`;
  }
  const s = String(val);
  return s.length > 30 ? s.slice(0, 28) + "..." : s;
}
