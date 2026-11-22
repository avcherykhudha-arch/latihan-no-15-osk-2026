import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { MathBlock } from '../components/MathBlock';
import { CONCEPT_MAP_NODES } from '../data/theoryData';
import { NavPage } from '../types/physics';

interface ConceptMapViewProps {
  onNavigate: (page: NavPage) => void;
}

export function ConceptMapView({ onNavigate }: ConceptMapViewProps) {
  const [selectedId, setSelectedId] = useState<string>('core-axes');

  const selectedNode =
    CONCEPT_MAP_NODES.find((n) => n.id === selectedId) ?? CONCEPT_MAP_NODES[0];

  const categoryColor = (cat: string, isSelected: boolean) => {
    if (isSelected) return 'bg-blue-700 text-white border-blue-900 ring-4 ring-yellow-300';
    switch (cat) {
      case 'Prasyarat':
        return 'bg-white text-slate-900 border-slate-300 hover:border-blue-500';
      case 'Inti OSK 15':
        return 'bg-yellow-300 text-slate-900 border-yellow-500 hover:bg-yellow-200';
      case 'Pendukung':
        return 'bg-blue-50 text-blue-950 border-blue-300 hover:border-blue-600';
      default:
        return 'bg-slate-50 text-slate-900 border-slate-300 hover:border-blue-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-700">Peta Konsep Terintegrasi</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Arsitektur Hubungan Konsep Soal 15 OSK 2026
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Klik setiap simpul konsep untuk menelusuri prasyarat, konsep inti, persamaan matematis,
            dan jebakan yang harus dihindari.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('modul-teori')}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
        >
          Lanjut ke Modul Teori
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2 font-medium">
          <span className="h-3 w-3 rounded border border-slate-400 bg-white inline-block" />
          Materi Prasyarat
        </span>
        <span className="inline-flex items-center gap-2 font-medium">
          <span className="h-3 w-3 rounded border border-yellow-600 bg-yellow-300 inline-block" />
          Konsep Inti Soal 15
        </span>
        <span className="inline-flex items-center gap-2 font-medium">
          <span className="h-3 w-3 rounded border border-blue-400 bg-blue-50 inline-block" />
          Konsep Pendukung
        </span>
        <span className="inline-flex items-center gap-2 font-medium">
          <span className="h-3 w-3 rounded border border-slate-400 bg-slate-100 inline-block" />
          Pengembangan Olimpiade
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Concept Map Stage */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 overflow-x-auto">
          <div className="relative min-w-[640px] h-[440px]">
            {/* SVG Edges connecting nodes */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full pointer-events-none"
            >
              <defs>
                <marker id="map-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#64748B" />
                </marker>
              </defs>
              {CONCEPT_MAP_NODES.flatMap((node) =>
                node.connectedTo.map((targetId) => {
                  const target = CONCEPT_MAP_NODES.find((t) => t.id === targetId);
                  if (!target) return null;
                  const active =
                    node.id === selectedId || targetId === selectedId;
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={active ? '#1D4ED8' : '#94A3B8'}
                      strokeWidth={active ? '0.65' : '0.35'}
                      strokeDasharray={active ? undefined : '1.2 0.8'}
                      markerEnd="url(#map-arrow)"
                    />
                  );
                })
              )}
            </svg>

            {/* Interactive Node Buttons */}
            {CONCEPT_MAP_NODES.map((node) => {
              const isSelected = node.id === selectedId;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute w-44 rounded-xl border p-2.5 text-left transition-all cursor-pointer shadow-xs ${categoryColor(
                    node.category,
                    isSelected
                  )}`}
                >
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                      isSelected ? 'text-yellow-300' : 'text-blue-700'
                    }`}
                  >
                    {node.category}
                  </div>
                  <div className="text-xs font-bold leading-snug">{node.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Concept Inspector */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <div>
            <div className="text-xs font-bold text-blue-700">{selectedNode.category}</div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{selectedNode.title}</h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-700">{selectedNode.summary}</p>

          <MathBlock
            label="Persamaan Kunci"
            latex={selectedNode.equationLatex}
            highlight={true}
          />

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-950 flex gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-bold">Jebakan Umum: </span>
              {selectedNode.warningNote}
            </div>
          </div>

          {selectedNode.connectedTo.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-xs font-semibold text-slate-600">Mengarah ke konsep:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.connectedTo.map((cid) => {
                  const target = CONCEPT_MAP_NODES.find((c) => c.id === cid);
                  if (!target) return null;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => setSelectedId(cid)}
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-900 hover:bg-blue-100"
                    >
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {target.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
