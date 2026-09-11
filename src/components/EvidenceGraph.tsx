import React, { useState } from 'react';
import { GraphNode, GraphEdge, InvestigationReport } from '../types';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Shield,
  Filter,
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { VERDICT_CONFIGS } from '../data/verdictConfig';

interface Props {
  report: InvestigationReport;
  onOpenCopilotWithQuery?: (query: string) => void;
}

export const EvidenceGraph: React.FC<Props> = ({ report, onOpenCopilotWithQuery }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterStance, setFilterStance] = useState<'all' | 'supports' | 'contradicts'>('all');

  // Fallback default nodes if not provided
  const nodes = report.graphData?.nodes || [];
  const edges = report.graphData?.edges || [];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Layout calculations: arrange nodes in stages
  // Stage 1: Claim (x: 80, y: 220)
  // Stage 2: Sub-claims / Sources (x: 280, y: staggered)
  // Stage 3: Evidence (x: 520, y: staggered)
  // Stage 4: Verdict (x: 740, y: 220)
  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'claim':
        return { border: '#06B6D4', bg: '#083344', text: '#22D3EE', glow: 'rgba(6,182,212,0.4)' };
      case 'subclaim':
        return { border: '#3B82F6', bg: '#1E3A8A', text: '#60A5FA', glow: 'rgba(59,130,246,0.3)' };
      case 'source':
        return { border: '#A855F7', bg: '#3B0764', text: '#C084FC', glow: 'rgba(168,85,247,0.3)' };
      case 'evidence_support':
        return { border: '#10B981', bg: '#064E3B', text: '#34D399', glow: 'rgba(16,185,129,0.4)' };
      case 'evidence_contradict':
        return { border: '#EF4444', bg: '#450A0A', text: '#F87171', glow: 'rgba(239,68,68,0.4)' };
      case 'verdict':
        const vConfig = VERDICT_CONFIGS[report.verdict] || VERDICT_CONFIGS.UNVERIFIED;
        return { border: vConfig.color, bg: '#0F172A', text: '#FFFFFF', glow: vConfig.color };
      default:
        return { border: '#64748B', bg: '#1E293B', text: '#94A3B8', glow: 'rgba(100,116,139,0.2)' };
    }
  };

  // Structured positions
  const structuredPositions: Record<string, { x: number; y: number }> = {};
  const claimNodes = nodes.filter((n) => n.type === 'claim');
  const subNodes = nodes.filter((n) => n.type === 'subclaim' || n.type === 'source');
  const evidenceNodes = nodes.filter((n) => n.type === 'evidence_support' || n.type === 'evidence_contradict');
  const verdictNodes = nodes.filter((n) => n.type === 'verdict');

  claimNodes.forEach((n, idx) => {
    structuredPositions[n.id] = { x: 90, y: 180 + idx * 100 };
  });

  subNodes.forEach((n, idx) => {
    const spacing = Math.min(75, 340 / (subNodes.length || 1));
    structuredPositions[n.id] = { x: 300, y: 80 + idx * spacing };
  });

  evidenceNodes.forEach((n, idx) => {
    const spacing = Math.min(80, 360 / (evidenceNodes.length || 1));
    structuredPositions[n.id] = { x: 530, y: 90 + idx * spacing };
  });

  verdictNodes.forEach((n, idx) => {
    structuredPositions[n.id] = { x: 740, y: 190 + idx * 90 };
  });

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
      {/* Graph Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Evidence Graph
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Live Trace
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Claim → Decomposed Sub-claims → Authoritative Sources → Verified Grounding → Final Assessment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1 text-slate-300 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
              className="p-1.5 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px]">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
              className="p-1.5 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition ml-1 border-l border-slate-800"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* SVG Interactive Graph Canvas */}
        <div className="lg:col-span-2 relative min-h-[440px] max-h-[560px] overflow-auto p-4 bg-[#050811] flex items-center justify-center">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <svg
            viewBox="0 0 860 420"
            className="w-full h-full max-w-4xl transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              <marker
                id="arrow-supports"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
              </marker>
              <marker
                id="arrow-contradicts"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
              </marker>
              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#06B6D4" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map((edge) => {
              const from = structuredPositions[edge.source];
              const to = structuredPositions[edge.target];
              if (!from || !to) return null;

              const isContradict = edge.type === 'contradicts';
              const isSupport = edge.type === 'supports';
              const strokeColor = isContradict ? '#EF4444' : isSupport ? '#10B981' : '#06B6D4';
              const markerId = isContradict
                ? 'url(#arrow-contradicts)'
                : isSupport
                ? 'url(#arrow-supports)'
                : 'url(#arrow-default)';

              // Curved bezier path
              const dx = to.x - from.x;
              const controlX1 = from.x + dx * 0.5;
              const controlX2 = to.x - dx * 0.5;
              const pathD = `M ${from.x} ${from.y} C ${controlX1} ${from.y}, ${controlX2} ${to.y}, ${to.x} ${to.y}`;

              return (
                <g key={edge.id} className="group">
                  <path
                    d={pathD}
                    stroke={strokeColor}
                    strokeWidth={edge.source === selectedNodeId || edge.target === selectedNodeId ? '3' : '1.5'}
                    strokeDasharray={isContradict ? '4,3' : undefined}
                    fill="none"
                    opacity={edge.source === selectedNodeId || edge.target === selectedNodeId ? 1 : 0.65}
                    markerEnd={markerId}
                    className="transition-all duration-300"
                  />
                  {edge.label && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 4}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const pos = structuredPositions[node.id];
              if (!pos) return null;
              const colors = getNodeColor(node.type);
              const isSelected = selectedNodeId === node.id;
              const isVerdict = node.type === 'verdict';

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer group select-none transition-all"
                >
                  {/* Glow halo on select */}
                  {isSelected && (
                    <circle
                      r={isVerdict ? 42 : 32}
                      fill={colors.glow}
                      className="animate-pulse opacity-40"
                    />
                  )}

                  {/* Node Outer Circle / Rounded Rect */}
                  <circle
                    r={isVerdict ? 32 : 24}
                    fill={colors.bg}
                    stroke={isSelected ? '#FFFFFF' : colors.border}
                    strokeWidth={isSelected ? 3 : 2}
                    className="group-hover:stroke-white transition-all shadow-lg"
                  />

                  {/* Confidence or Score indicator */}
                  {node.confidence !== undefined && (
                    <text
                      y={4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={isVerdict ? '12' : '10'}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.confidence}%
                    </text>
                  )}

                  {/* Label below node */}
                  <text
                    y={isVerdict ? 46 : 38}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : colors.text}
                    fontSize="11"
                    fontWeight="600"
                    className="group-hover:fill-white transition-colors"
                  >
                    {node.label.length > 22 ? `${node.label.slice(0, 20)}...` : node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick legend on bottom left */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] space-y-1 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Claim / Inquiry</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Supporting Evidence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span>Contradicting Evidence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>Independent Source</span>
            </div>
          </div>
        </div>

        {/* Node Inspector Details Drawer */}
        <div className="p-6 bg-[#080D1A] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Node Inspector
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                Type: {selectedNode?.type || 'Node'}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-1.5">
                {selectedNode?.label || 'Select any node to inspect evidence'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode?.details ||
                  'Click on any node in the evidence graph above to inspect how that specific claim, source, or piece of data directly impacted the final credibility verdict.'}
              </p>
            </div>

            {selectedNode && (
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Node Confidence</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">
                    {selectedNode.confidence || report.confidenceScore}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Influence Weight</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {selectedNode.score || 85}/100
                  </span>
                </div>
              </div>
            )}

            {/* Connected sources recommendation */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 font-medium block mb-2">
                Grounding References in Investigation:
              </span>
              <div className="space-y-1.5">
                {(report.sources || []).slice(0, 2).map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs flex items-start justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{s.sourceName}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{s.snippet}</div>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ml-2 ${
                        s.stance === 'contradicts'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {s.stance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action bottom button */}
          {onOpenCopilotWithQuery && (
            <div className="pt-4 border-t border-slate-800 mt-4">
              <button
                onClick={() =>
                  onOpenCopilotWithQuery(
                    `Tell me why node "${selectedNode?.label}" influenced the final verdict.`
                  )
                }
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask TruthLens Copilot About This Node</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
