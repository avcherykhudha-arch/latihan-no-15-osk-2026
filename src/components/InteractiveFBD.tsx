import { useState } from 'react';
import { FBDConfig, FBDForceVector } from '../types/physics';

interface InteractiveFBDProps {
  config: FBDConfig;
  highlightedForceId?: string | null;
  onSelectForce?: (force: FBDForceVector) => void;
}

export function InteractiveFBD({
  config,
  highlightedForceId = null,
  onSelectForce
}: InteractiveFBDProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = highlightedForceId ?? hoveredId ?? selectedId;
  const activeForce = config.forces.find((f) => f.id === activeId) ?? config.forces[0] ?? null;

  const cx = 190;
  const cy = 128;
  const rad = (config.inclineDeg * Math.PI) / 180;

  // Screen SVG coordinates: +x right, +y down
  // Given math directionDeg (0=right, 90=up, 180=left, 270=down)
  const toSvgVec = (deg: number, len: number) => {
    const r = (deg * Math.PI) / 180;
    return {
      dx: Math.cos(r) * len,
      dy: -Math.sin(r) * len
    };
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900">{config.title}</h4>
        <span className="text-xs font-medium text-slate-500">
          Klik atau arahkan kursor ke vektor gaya
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7">
          <svg
            viewBox="0 0 380 256"
            className="w-full h-auto rounded-lg border border-slate-100 bg-slate-50"
            role="img"
            aria-label={config.title}
          >
            <defs>
              {config.forces.map((f) => (
                <marker
                  key={`m-${f.id}`}
                  id={`fbd-arrow-${f.id}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 Z" fill={f.color} />
                </marker>
              ))}
            </defs>

            {/* Incline surface faint reference */}
            <line
              x1={cx - 140 * Math.cos(rad)}
              y1={cy - 140 * Math.sin(rad) + 18}
              x2={cx + 140 * Math.cos(rad)}
              y2={cy + 140 * Math.sin(rad) + 18}
              stroke="#CBD5E1"
              strokeWidth="2"
            />

            {/* Coordinate axes x' (parallel down) and y' (perp out) */}
            {config.showAxes && (
              <g opacity="0.75">
                {/* x' axis parallel down incline */}
                <line
                  x1={cx - 115 * Math.cos(rad)}
                  y1={cy - 115 * Math.sin(rad)}
                  x2={cx + 130 * Math.cos(rad)}
                  y2={cy + 130 * Math.sin(rad)}
                  stroke="#64748B"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <text
                  x={cx + 125 * Math.cos(rad) + 4}
                  y={cy + 125 * Math.sin(rad) + 4}
                  fontSize="11"
                  fontWeight="700"
                  fill="#475569"
                >
                  x′ (∥)
                </text>

                {/* y' axis perpendicular out of incline */}
                <line
                  x1={cx - 90 * Math.sin(rad)}
                  y1={cy + 90 * Math.cos(rad)}
                  x2={cx + 105 * Math.sin(rad)}
                  y2={cy - 105 * Math.cos(rad)}
                  stroke="#64748B"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <text
                  x={cx + 105 * Math.sin(rad) + 4}
                  y={cy - 105 * Math.cos(rad) - 2}
                  fontSize="11"
                  fontWeight="700"
                  fill="#475569"
                >
                  y′ (⊥)
                </text>
              </g>
            )}

            {/* Dashed weight decomposition lines if mg present */}
            {config.forces.some((f) => f.id === 'fbd-mg') && (
              <g opacity="0.55">
                {/* Mg cos alpha projection */}
                <line
                  x1={cx}
                  y1={cy + 74}
                  x2={cx - 74 * Math.cos(rad) * Math.sin(rad)}
                  y2={cy + 74 * Math.cos(rad) * Math.cos(rad)}
                  stroke="#1D4ED8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <line
                  x1={cx}
                  y1={cy + 74}
                  x2={cx + 74 * Math.sin(rad) * Math.cos(rad)}
                  y2={cy + 74 * Math.sin(rad) * Math.sin(rad)}
                  stroke="#1D4ED8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <text x={cx + 8} y={cy + 36} fontSize="10.5" fontWeight="600" fill="#1D4ED8">
                  α={config.inclineDeg}°
                </text>
              </g>
            )}

            {/* Cannon block representation */}
            <g transform={`translate(${cx}, ${cy}) rotate(${config.inclineDeg})`}>
              <rect
                x="-18"
                y="-11"
                width="36"
                height="22"
                rx="4"
                fill="#1E3A8A"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="0" r="3" fill="#FACC15" />
            </g>

            {/* Force Vectors */}
            {config.forces.map((f) => {
              const len = Math.round(78 * f.relativeMagnitude);
              const { dx, dy } = toSvgVec(f.directionDeg, len);
              const isHighlighted = activeId === f.id;
              const endX = cx + dx;
              const endY = cy + dy;

              // Label offset slightly beyond arrow tip
              const labelX = endX + (dx >= 0 ? 6 : -48);
              const labelY = endY + (dy >= 0 ? 14 : -8);

              return (
                <g
                  key={f.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(f.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    setSelectedId(f.id);
                    onSelectForce?.(f);
                  }}
                >
                  {/* Invisible wider hit target */}
                  <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="transparent" strokeWidth="14" />
                  <line
                    x1={cx}
                    y1={cy}
                    x2={endX}
                    y2={endY}
                    stroke={f.color}
                    strokeWidth={isHighlighted ? 4 : 2.6}
                    markerEnd={`url(#fbd-arrow-${f.id})`}
                    opacity={activeId && !isHighlighted ? 0.55 : 1}
                  />
                  <text
                    x={Math.max(8, Math.min(295, labelX))}
                    y={Math.max(16, Math.min(244, labelY))}
                    fontSize="11.5"
                    fontWeight="700"
                    fill={f.color}
                  >
                    {f.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Force Inspector & Axis Summaries */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {config.forces.map((f) => {
              const isActive = activeId === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(f.id);
                    onSelectForce?.(f);
                  }}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-blue-600 bg-blue-700 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {activeForce && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50/80 p-3 text-xs leading-relaxed text-slate-800">
              <div className="font-bold text-slate-900 mb-1">{activeForce.label}</div>
              <p>{activeForce.description}</p>
              {(activeForce.componentX || activeForce.componentY) && (
                <div className="mt-2 pt-2 border-t border-yellow-200 font-mono text-[11px] text-slate-700 space-y-0.5">
                  {activeForce.componentX && <div>Sumbu ∥: {activeForce.componentX}</div>}
                  {activeForce.componentY && <div>Sumbu ⊥: {activeForce.componentY}</div>}
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs space-y-1.5">
            <div className="font-semibold text-blue-900">Ringkasan Komponen Sumbu</div>
            <div className="font-mono text-[11px] text-slate-800">
              <span className="font-semibold">Sumbu x′ (∥):</span> {config.xComponentSummary}
            </div>
            <div className="font-mono text-[11px] text-slate-800">
              <span className="font-semibold">Sumbu y′ (⊥):</span> {config.yComponentSummary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
