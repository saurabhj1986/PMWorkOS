import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Key, Link2 } from "lucide-react";
import { dataModelTables } from "../../data/dataModel";

/* -------------------------------------------------------------------------- */
/* Color map — matches the card colors in DataModelTab                         */
/* -------------------------------------------------------------------------- */

const NODE_COLORS = {
  blue: { border: "#3b82f6", bg: "#1e3a5f", text: "#93c5fd" },
  purple: { border: "#a855f7", bg: "#3b1f5e", text: "#d8b4fe" },
  emerald: { border: "#10b981", bg: "#1a3a2a", text: "#6ee7b7" },
  cyan: { border: "#06b6d4", bg: "#1a3345", text: "#67e8f9" },
  amber: { border: "#f59e0b", bg: "#3d2e0f", text: "#fcd34d" },
  rose: { border: "#f43f5e", bg: "#3d1520", text: "#fda4af" },
  indigo: { border: "#6366f1", bg: "#1e1b4b", text: "#a5b4fc" },
  slate: { border: "#64748b", bg: "#1e293b", text: "#94a3b8" },
};

/* -------------------------------------------------------------------------- */
/* Layout — 8 tables in 2 rows of 4, positioned for readable edges            */
/* -------------------------------------------------------------------------- */

const NODE_POSITIONS = {
  customers: { x: 0, y: 0 },
  questionnaire_responses: { x: 280, y: 0 },
  control_inventory: { x: 560, y: 0 },
  evidence_submissions: { x: 840, y: 0 },
  approved_answers: { x: 140, y: 300 },
  deals: { x: 420, y: 300 },
  trust_scores: { x: 700, y: 300 },
  audit_log: { x: 960, y: 300 },
};

const NODE_WIDTH = 240;

/* -------------------------------------------------------------------------- */
/* Build nodes + edges from data                                               */
/* -------------------------------------------------------------------------- */

function buildNodes() {
  return dataModelTables.map((table) => ({
    id: table.id,
    position: NODE_POSITIONS[table.id] ?? { x: 0, y: 0 },
    data: { table },
    type: "tableNode",
    style: { width: NODE_WIDTH },
  }));
}

function buildEdges() {
  const edges = [];
  const seen = new Set();

  dataModelTables.forEach((table) => {
    table.columns.forEach((col) => {
      if (col.fk) {
        const edgeId = `${table.id}->${col.fk}`;
        if (!seen.has(edgeId)) {
          seen.add(edgeId);
          edges.push({
            id: edgeId,
            source: table.id,
            target: col.fk,
            animated: true,
            style: { stroke: "#475569", strokeWidth: 1.5 },
          });
        }
      }
    });

    // Also add edges from the relations array for non-FK relations
    table.relations.forEach((rel) => {
      const edgeId1 = `${table.id}->${rel}`;
      const edgeId2 = `${rel}->${table.id}`;
      if (!seen.has(edgeId1) && !seen.has(edgeId2)) {
        seen.add(edgeId1);
        edges.push({
          id: edgeId1,
          source: table.id,
          target: rel,
          animated: false,
          style: { stroke: "#334155", strokeWidth: 1, strokeDasharray: "4 4" },
        });
      }
    });
  });

  return edges;
}

/* -------------------------------------------------------------------------- */
/* Custom table node                                                           */
/* -------------------------------------------------------------------------- */

function TableNode({ data }) {
  const { table } = data;
  const colors = NODE_COLORS[table.color] ?? NODE_COLORS.slate;

  return (
    <div
      className="overflow-hidden rounded-lg shadow-lg"
      style={{
        border: `1.5px solid ${colors.border}40`,
        background: `${colors.bg}`,
        minWidth: NODE_WIDTH,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${colors.border}30` }}
      >
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: colors.border }}
        />
        <span
          className="font-mono text-[11px] font-bold"
          style={{ color: colors.text }}
        >
          {table.name}
        </span>
        <span className="ml-auto font-mono text-[9px]" style={{ color: `${colors.text}80` }}>
          {table.columns.length} cols
        </span>
      </div>

      {/* Columns */}
      <div className="px-2 py-1.5">
        {table.columns.slice(0, 5).map((col) => (
          <div
            key={col.name}
            className="flex items-center gap-1.5 rounded px-1 py-0.5 text-[9px] font-mono"
          >
            {col.pk ? (
              <Key className="h-2.5 w-2.5 flex-shrink-0 text-amber-400" strokeWidth={2.5} />
            ) : col.fk ? (
              <Link2 className="h-2.5 w-2.5 flex-shrink-0 text-blue-400" strokeWidth={2.5} />
            ) : (
              <span className="h-2.5 w-2.5 flex-shrink-0" />
            )}
            <span className="text-slate-200">{col.name}</span>
            <span className="ml-auto text-slate-500">{col.type}</span>
          </div>
        ))}
        {table.columns.length > 5 && (
          <div className="px-1 py-0.5 text-[8px] font-mono text-slate-500">
            +{table.columns.length - 5} more
          </div>
        )}
      </div>
    </div>
  );
}

const nodeTypes = { tableNode: TableNode };

/* -------------------------------------------------------------------------- */
/* ERD Diagram component                                                       */
/* -------------------------------------------------------------------------- */

export default function ErdDiagram({ onSelectTable }) {
  const [nodes, , onNodesChange] = useNodesState(buildNodes());
  const [edges, , onEdgesChange] = useEdgesState(buildEdges());

  const onNodeClick = useCallback(
    (_, node) => {
      if (onSelectTable) onSelectTable(node.data.table.id);
    },
    [onSelectTable],
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-[var(--shadow-card)]"
      style={{ height: 480 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="!border-slate-700 !bg-slate-900/90 [&>button]:!border-slate-700 [&>button]:!bg-slate-800 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700"
        />
      </ReactFlow>
    </div>
  );
}
