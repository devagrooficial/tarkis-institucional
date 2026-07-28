import { useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Truck, Ship, Plane, Warehouse, Package, Activity } from 'lucide-react';

/* ── Live counter ──────────────────────────────────── */
function useCounter(base: number, variance: number, ms: number) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const t = setInterval(
      () => setVal(base + Math.floor(Math.random() * variance)),
      ms,
    );
    return () => clearInterval(t);
  }, [base, variance, ms]);
  return val;
}

/* ── Hub node ──────────────────────────────────────── */
function HubNode(_props: NodeProps) {
  const ops = useCounter(47, 9, 3200);
  return (
    <div className="relative" style={{ width: 178 }}>
      <div
        className="absolute rounded-3xl border border-emerald/20 animate-ping pointer-events-none"
        style={{ inset: '-14px', animationDuration: '2.4s' }}
      />
      <div
        className="absolute rounded-3xl border border-emerald/12 pointer-events-none"
        style={{ inset: '-7px' }}
      />

      <Handle type="target" position={Position.Top}    className="opacity-0" />
      <Handle type="source" position={Position.Top}    className="opacity-0" />
      <Handle type="target" position={Position.Left}   className="opacity-0" />
      <Handle type="source" position={Position.Left}   className="opacity-0" />
      <Handle type="target" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Right}  className="opacity-0" />
      <Handle type="source" position={Position.Right}  className="opacity-0" />

      <div
        className="rounded-3xl border border-emerald/55 px-5 py-4 text-center"
        style={{
          background: 'linear-gradient(145deg,#00A896 0%,#007868 100%)',
          boxShadow: '0 0 50px rgba(0,168,150,0.5),0 10px 36px rgba(0,0,0,0.55)',
        }}
      >
        <Activity className="mx-auto mb-2 text-white" size={18} />
        <div className="font-heading font-black text-white text-sm tracking-wider mb-0.5">
          TARKIS
        </div>
        <div className="text-white/60 text-[10px] mb-3">Centro de Controle</div>
        <div
          className="rounded-xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.13)' }}
        >
          <span className="text-white font-black font-heading text-2xl">{ops}</span>
          <span className="text-white/55 text-[9px] block leading-tight mt-0.5">
            operações em tempo real
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Vehicle node ──────────────────────────────────── */
interface VehicleData {
  icon: 'truck' | 'ship' | 'plane';
  label: string;
  sub: string;
  metricLabel: string;
  color: string;
  count: number;
  variance: number;
  ms: number;
}
const ICONS = { truck: Truck, ship: Ship, plane: Plane } as const;

function VehicleNode({ data }: NodeProps) {
  const d = data as VehicleData;
  const Icon = ICONS[d.icon];
  const val = useCounter(d.count, d.variance, d.ms);

  return (
    <div style={{ width: 158 }}>
      <Handle type="target" position={Position.Top}    className="opacity-0" />
      <Handle type="source" position={Position.Top}    className="opacity-0" />
      <Handle type="target" position={Position.Left}   className="opacity-0" />
      <Handle type="source" position={Position.Left}   className="opacity-0" />
      <Handle type="target" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Right}  className="opacity-0" />
      <Handle type="source" position={Position.Right}  className="opacity-0" />

      <div
        className="rounded-2xl border px-4 py-3"
        style={{
          background: 'rgba(7,35,43,0.93)',
          borderColor: `${d.color}55`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.55),0 0 18px ${d.color}18`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${d.color}22`, border: `1.5px solid ${d.color}50` }}
          >
            <Icon size={15} style={{ color: d.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-xs leading-tight truncate">
              {d.label}
            </div>
            <div className="text-white/38 text-[9px]">{d.sub}</div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-white font-black font-heading text-xl leading-none">
              {val}
            </span>
            <span className="text-white/42 text-[9px] ml-1">{d.metricLabel}</span>
          </div>
          <div className="flex items-center gap-1 pb-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-[9px]" style={{ color: d.color }}>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Location node ─────────────────────────────────── */
interface LocationData {
  kind: 'warehouse' | 'package';
  label: string;
  metricLabel: string;
  color: string;
  count: number;
  variance: number;
  ms: number;
}

function LocationNode({ data }: NodeProps) {
  const d = data as LocationData;
  const Icon = d.kind === 'warehouse' ? Warehouse : Package;
  const val = useCounter(d.count, d.variance, d.ms);

  return (
    <div style={{ width: 152 }}>
      <Handle type="target" position={Position.Top}    className="opacity-0" />
      <Handle type="source" position={Position.Top}    className="opacity-0" />
      <Handle type="target" position={Position.Left}   className="opacity-0" />
      <Handle type="source" position={Position.Left}   className="opacity-0" />
      <Handle type="target" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Right}  className="opacity-0" />
      <Handle type="source" position={Position.Right}  className="opacity-0" />

      <div
        className="rounded-2xl border px-4 py-3"
        style={{
          background: 'rgba(7,35,43,0.90)',
          borderColor: `${d.color}40`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.45),0 0 10px ${d.color}12`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon size={14} style={{ color: d.color }} />
          <span className="text-white text-xs font-medium">{d.label}</span>
        </div>
        <div>
          <span className="text-white font-black font-heading text-2xl leading-none">
            {val.toLocaleString('pt-BR')}
          </span>
          <span className="text-white/42 text-[9px] ml-1">{d.metricLabel}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Registry ──────────────────────────────────────── */
const nodeTypes = { hub: HubNode, vehicle: VehicleNode, location: LocationNode };

/* ── Graph data ────────────────────────────────────── */
const NODES: Node[] = [
  {
    id: 'hub',
    type: 'hub',
    position: { x: 198, y: 170 },
    data: {},
  },
  {
    id: 'plane',
    type: 'vehicle',
    position: { x: 210, y: 5 },
    data: {
      icon: 'plane',
      label: 'Carga Aérea',
      sub: 'Aeroporto / Charter',
      metricLabel: 'rotas rastreadas',
      color: '#818cf8',
      count: 14,
      variance: 4,
      ms: 4200,
    },
  },
  {
    id: 'ship',
    type: 'vehicle',
    position: { x: 5, y: 140 },
    data: {
      icon: 'ship',
      label: 'Carga Marítima',
      sub: 'Porto & Cabotagem',
      metricLabel: 'embarcações ativas',
      color: '#22d3ee',
      count: 9,
      variance: 3,
      ms: 5100,
    },
  },
  {
    id: 'truck',
    type: 'vehicle',
    position: { x: 12, y: 325 },
    data: {
      icon: 'truck',
      label: 'Frota Rodoviária',
      sub: 'Last Mile & Cross',
      metricLabel: 'veículos em rota',
      color: '#f97316',
      count: 128,
      variance: 15,
      ms: 3000,
    },
  },
  {
    id: 'warehouse',
    type: 'location',
    position: { x: 408, y: 65 },
    data: {
      kind: 'warehouse',
      label: 'CDs & Armazéns',
      metricLabel: 'unidades ativas',
      color: '#00A896',
      count: 18,
      variance: 2,
      ms: 6000,
    },
  },
  {
    id: 'delivery',
    type: 'location',
    position: { x: 405, y: 310 },
    data: {
      kind: 'package',
      label: 'Entregas',
      metricLabel: 'pedidos hoje',
      color: '#84cc16',
      count: 1847,
      variance: 50,
      ms: 2500,
    },
  },
];

const mkEdge = (
  id: string,
  source: string,
  target: string,
  color: string,
  width = 2,
  opacity = 1,
): Edge => ({
  id,
  source,
  target,
  animated: true,
  type: 'smoothstep',
  style: { stroke: color, strokeWidth: width, opacity },
});

const EDGES: Edge[] = [
  mkEdge('e-plane-hub',        'plane',     'hub',       '#818cf8'),
  mkEdge('e-ship-hub',         'ship',      'hub',       '#22d3ee'),
  mkEdge('e-truck-hub',        'truck',     'hub',       '#f97316'),
  mkEdge('e-hub-warehouse',    'hub',       'warehouse', '#00A896'),
  mkEdge('e-hub-delivery',     'hub',       'delivery',  '#84cc16'),
  mkEdge('e-wh-delivery',      'warehouse', 'delivery',  '#00A896', 1.5, 0.4),
];

/* ── Component ─────────────────────────────────────── */
export default function LogisticsFlow() {
  const [nodes, , onNodesChange] = useNodesState(NODES);
  const [edges, , onEdgesChange] = useEdgesState(EDGES);

  return (
    <div className="w-full h-full" style={{ minHeight: 480 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        panOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(0,168,150,0.10)"
        />
      </ReactFlow>
    </div>
  );
}
