import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Key, Link2 } from "lucide-react";
import { dataModelTables, relationships } from "../../data/dataModel";

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
/* 3-row layout — parent tables top, operational middle, derived bottom        */
/* -------------------------------------------------------------------------- */

const NODE_POSITIONS = {
  customers: { x: 50, y: 0 },
  control_inventory: { x: 650, y: 0 },
  deals: { x: 0, y: 260 },
  questionnaire_responses: { x: 280, y: 260 },
  approved_answers: { x: 560, y: 260 },
  evidence_submissions: { x: 840, y: 260 },
  trust_scores: { x: 380, y: 500 },
  audit_log: { x: 700, y: 500 },
};

const NODE_WIDTH = 230;

/* -------------------------------------------------------------------------- */
/* Compute optimal handle direction based on relative node positions           */
/* -------------------------------------------------------------------------- */

function getHandles(sourceId, targetId) {
  const sp = NODE_POSITIONS[sourceId];
  const tp = NODE_POSITIONS[targetId];
  const dx = tp.x - sp.x;
  const dy = tp.y - sp.y;

  if (Math.abs(dy) > Math.abs(dx) * 0.5) {
    return dy > 0
      ? { sourceHandle: "s-bottom", targetHandle: "t-top" }
      : { sourceHandle: "s-top", targetHandle: "t-bottom" };
  }
  return dx > 0
    ? { sourceHandle: "s-right", targetHandle: "t-left" }
    : { sourceHandle: "s-left", targetHandle: "t-right" };
}

/* -------------------------------------------------------------------------- */
/* Build nodes + edges                                                         */
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
  return relationships.map((rel) => {
    const handles = getHandles(rel.source, rel.target);
    const strokeColor = rel.dashed ? "#334155" : "#475569";

    return {
      id: rel.id,
      source: rel.source,
      target: rel.target,
      sourceHandle: handles.sourceHandle,
      targetHandle: handles.targetHandle,
      type: "smoothstep",
      label: rel.cardinality,
      labelStyle: {
        fill: "#94a3b8",
        fontSize: 10,
        fontFamily: "ui-monospace, monospace",
        fontWeight: 600,
      },
      labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9 },
      labelBgPadding: [4, 2],
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: strokeColor,
      },
      style: {
        stroke: strokeColor,
        strokeWidth: 1.5,
        strokeDasharray: rel.dashed ? "5 3" : undefined,
      },
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Custom table node with connection handles at all 4 edges                    */
/* -------------------------------------------------------------------------- */

const HANDLE_STYLE = { background: "transparent", border: "none", width: 8, height: 8 };

function TableNode({ data }) {
  const { table } = data;
  const colors = NODE_COLORS[table.color] ?? NODE_COLORS.slate;

  return (
    <div
      className="overflow-hidden rounded-lg shadow-lg"
      style={{
        border: `1.5px solid ${colors.border}40`,
        background: colors.bg,
        minWidth: NODE_WIDTH,
      }}
    >
      {/* Connection handles — transparent dots at all 4 edges */}
      <Handle type="source" position={Position.Top} id="s-top" style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Top} id="t-top" style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Bottom} id="s-bottom" style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Bottom} id="t-bottom" style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Left} id="s-left" style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Left} id="t-left" style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Right} id="s-right" style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Right} id="t-right" style={HANDLE_STYLE} />

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
      style={{ height: 560 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: 0.12 }}
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
