import { StimulusConfig } from '../types/physics';

interface StimulusDiagramProps {
  config: StimulusConfig;
  title?: string;
  highlightedZone?: string | null;
}

export function StimulusDiagram({
  config,
  title = 'Ilustrasi Kondisi Fisis Soal',
  highlightedZone = null
}: StimulusDiagramProps) {
  const { alphaDeg, directionMotion, bulletAngleDeg = 0, showSpring, showFriction, showReboundArrow, showPulseInset, labels } = config;

  // Geometry on 520x270 SVG canvas
  const baseLeftX = 56;
  const baseY = 232;
  const baseRightX = 430;
  const rad = (alphaDeg * Math.PI) / 180;
  const run = 270;
  const rise = Math.min(155, run * Math.tan(rad));
  const topX = baseLeftX;
  const topY = baseY - rise;
  const botX = baseLeftX + run;
  const botY = baseY;

  // Position cannon along incline (fraction 0.58 from top)
  const frac = 0.56;
  const cx = topX + (botX - topX) * frac;
  const cy = topY + (botY - topY) * frac;

  // Incline unit vectors in SVG (x right, y down)
  const dx = botX - topX;
  const dy = botY - topY;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Normal pointing out of incline (up-right in SVG: (uy, -ux))
  const nx = uy;
  const ny = -ux;

  // Cannon center slightly above incline surface
  const cannonX = cx + nx * 18;
  const cannonY = cy + ny * 18;

  // Bullet direction vector in SVG coordinates (y is down)
  const bRad = (bulletAngleDeg * Math.PI) / 180;
  const bx = Math.cos(bRad);
  const by = -Math.sin(bRad);
  const bulletStartX = cannonX + bx * 26;
  const bulletStartY = cannonY + by * 26;
  const bulletEndX = bulletStartX + bx * 70;
  const bulletEndY = bulletStartY + by * 70;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>{title}</span>
        <span className="font-mono text-blue-800">{labels.angle ?? `α = ${alphaDeg}°`}</span>
      </div>
      <svg
        viewBox="0 0 520 270"
        className="w-full h-auto max-h-64 rounded-lg bg-slate-50 border border-slate-100"
        role="img"
        aria-label={`Diagram stimulus bidang miring sudut ${alphaDeg} derajat`}
      >
        <defs>
          <marker id="stim-arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#1D4ED8" />
          </marker>
          <marker id="stim-arrow-gold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#CA8A04" />
          </marker>
          <marker id="stim-arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#DC2626" />
          </marker>
          <pattern id="ground-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#CBD5E1" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Ground */}
        <rect x="24" y={baseY} width="472" height="14" fill="url(#ground-hatch)" />
        <line x1="24" y1={baseY} x2="496" y2={baseY} stroke="#475569" strokeWidth="2" />

        {/* Inclined Plane Wedge */}
        <polygon
          points={`${topX},${topY} ${botX},${botY} ${topX},${botY}`}
          fill="#E2E8F0"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Rough surface ticks if friction */}
        {showFriction &&
          Array.from({ length: 14 }).map((_, i) => {
            const f = (i + 0.5) / 14;
            const px = topX + dx * f;
            const py = topY + dy * f;
            return (
              <line
                key={i}
                x1={px}
                y1={py}
                x2={px - ux * 5 - nx * 4}
                y2={py - uy * 5 - ny * 4}
                stroke="#B45309"
                strokeWidth="1.8"
              />
            );
          })}

        {/* Angle Arc */}
        <path
          d={`M ${botX - 38} ${botY} A 38 38 0 0 1 ${botX - 38 * Math.cos(rad)} ${botY - 38 * Math.sin(rad)}`}
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="2"
        />
        <text x={botX - 94} y={botY - 10} fontSize="13" fontWeight="700" fill="#1E3A8A">
          α = {alphaDeg}°
        </text>

        {/* Spring at top if applicable */}
        {showSpring && (
          <g>
            <line
              x1={topX - nx * 2}
              y1={topY - ny * 2}
              x2={topX + nx * 28}
              y2={topY + ny * 28}
              stroke="#0F172A"
              strokeWidth="3"
            />
            <path
              d={`M ${topX + nx * 14} ${topY + ny * 14} L ${topX + ux * 16 + nx * 22} ${topY + uy * 16 + ny * 22} L ${topX + ux * 28 + nx * 6} ${topY + uy * 28 + ny * 6} L ${topX + ux * 40 + nx * 22} ${topY + uy * 40 + ny * 22} L ${topX + ux * 54 + nx * 14} ${topY + uy * 54 + ny * 14}`}
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.5"
            />
            <text x={topX + 42} y={topY - 8} fontSize="11" fontWeight="600" fill="#1D4ED8">
              Pegas (k, x₀)
            </text>
          </g>
        )}

        {/* Distance Bracket ℓ */}
        {labels.distance && (
          <g>
            <line
              x1={topX + nx * 48}
              y1={topY + ny * 48}
              x2={cx + nx * 48}
              y2={cy + ny * 48}
              stroke="#1D4ED8"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#stim-arrow-blue)"
            />
            <text
              x={(topX + cx) / 2 + nx * 56}
              y={(topY + cy) / 2 + ny * 56 - 4}
              fontSize="12"
              fontWeight="700"
              fill="#1E40AF"
            >
              {labels.distance}
            </text>
          </g>
        )}

        {/* Cannon Ghost at start (for down motion) */}
        {directionMotion === 'down' && (
          <g opacity="0.35">
            <rect
              x={topX + ux * 24 + nx * 14 - 16}
              y={topY + uy * 24 + ny * 14 - 10}
              width="32"
              height="18"
              rx="4"
              transform={`rotate(${alphaDeg}, ${topX + ux * 24 + nx * 14}, ${topY + uy * 24 + ny * 14})`}
              fill="#94A3B8"
              stroke="#475569"
            />
          </g>
        )}

        {/* Active Cannon Body */}
        <g
          className={highlightedZone === 'cannon' ? 'opacity-100' : ''}
          transform={`translate(${cannonX}, ${cannonY})`}
        >
          {/* Carriage rotated to incline */}
          <g transform={`rotate(${alphaDeg})`}>
            <rect
              x="-20"
              y="-10"
              width="40"
              height="20"
              rx="4"
              fill="#1E3A8A"
              stroke="#0F172A"
              strokeWidth="1.8"
            />
            <circle cx="-11" cy="12" r="5.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="11" cy="12" r="5.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
          </g>
          {/* Barrel oriented along bulletAngleDeg */}
          <g transform={`rotate(${-bulletAngleDeg})`}>
            <rect
              x="0"
              y="-7"
              width="28"
              height="11"
              rx="3"
              fill="#334155"
              stroke="#0F172A"
              strokeWidth="1.4"
            />
          </g>
        </g>

        {/* Mass label */}
        {labels.mass && (
          <text x={cannonX - 58} y={cannonY + 38} fontSize="12" fontWeight="700" fill="#0F172A">
            {labels.mass}
          </text>
        )}

        {/* Horizontal dashed reference line & bullet vector */}
        <line
          x1={cannonX - 15}
          y1={cannonY}
          x2={cannonX + 115}
          y2={cannonY}
          stroke="#94A3B8"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        {labels.momentum && (
          <g>
            <circle cx={bulletStartX + bx * 14} cy={bulletStartY + by * 14} r="5.5" fill="#EAB308" stroke="#854D0E" strokeWidth="1.5" />
            <line
              x1={bulletStartX + bx * 20}
              y1={bulletStartY + by * 20}
              x2={bulletEndX}
              y2={bulletEndY}
              stroke="#CA8A04"
              strokeWidth="3"
              markerEnd="url(#stim-arrow-gold)"
            />
            <text
              x={Math.min(485, bulletEndX - 18)}
              y={Math.max(24, bulletEndY - 10)}
              fontSize="12"
              fontWeight="700"
              fill="#854D0E"
            >
              {labels.momentum}
            </text>
          </g>
        )}

        {/* Angle theta arc when bulletAngleDeg > 0 */}
        {bulletAngleDeg > 0 && bulletAngleDeg < 90 && (
          <g>
            <path
              d={`M ${cannonX + 44} ${cannonY} A 44 44 0 0 0 ${cannonX + 44 * Math.cos(bRad)} ${cannonY - 44 * Math.sin(bRad)}`}
              fill="none"
              stroke="#CA8A04"
              strokeWidth="1.8"
            />
            <text x={cannonX + 48} y={cannonY - 12} fontSize="11" fontWeight="700" fill="#A16207">
              θ = {bulletAngleDeg}°
            </text>
          </g>
        )}

        {/* Motion / Rebound indicator */}
        {directionMotion === 'up' && (
          <g>
            <line
              x1={cx + ux * 15 + nx * 42}
              y1={cy + uy * 15 + ny * 42}
              x2={cx - ux * 42 + nx * 42}
              y2={cy - uy * 42 + ny * 42}
              stroke="#DC2626"
              strokeWidth="2.4"
              markerEnd="url(#stim-arrow-red)"
            />
            <text x={cx - 46} y={cy - 48} fontSize="11" fontWeight="700" fill="#B91C1C">
              v₀ naik
            </text>
          </g>
        )}

        {showReboundArrow && (
          <g>
            <line
              x1={cannonX - ux * 24 + nx * 24}
              y1={cannonY - uy * 24 + ny * 24}
              x2={cannonX - ux * 68 + nx * 24}
              y2={cannonY - uy * 68 + ny * 24}
              stroke="#DC2626"
              strokeWidth="2.4"
              markerEnd="url(#stim-arrow-red)"
            />
            <text x={cannonX - 90} y={cannonY - 38} fontSize="11" fontWeight="700" fill="#B91C1C">
              pantul naik
            </text>
          </g>
        )}

        {/* Triangular force pulse inset for Soal 12 */}
        {showPulseInset && (
          <g transform="translate(360, 20)">
            <rect x="0" y="0" width="140" height="84" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <text x="10" y="16" fontSize="10" fontWeight="700" fill="#0F172A">
              Profil Gaya F(t)
            </text>
            <line x1="18" y1="68" x2="128" y2="68" stroke="#64748B" strokeWidth="1.2" />
            <line x1="18" y1="26" x2="18" y2="68" stroke="#64748B" strokeWidth="1.2" />
            <polygon points="22,68 70,30 118,68" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
            <text x="74" y="34" fontSize="9.5" fontWeight="700" fill="#854D0E">
              F_maks
            </text>
            <text x="112" y="79" fontSize="9.5" fontWeight="600" fill="#475569">
              Δt
            </text>
          </g>
        )}

        {/* Gravity arrow */}
        <g transform="translate(465, 42)">
          <line x1="0" y1="0" x2="0" y2="34" stroke="#1D4ED8" strokeWidth="2.2" markerEnd="url(#stim-arrow-blue)" />
          <text x="8" y="22" fontSize="13" fontWeight="700" fill="#1D4ED8">
            g
          </text>
        </g>

        {/* Extra label */}
        {labels.extra && (
          <text x="330" y="258" fontSize="11.5" fontWeight="600" fill="#475569">
            {labels.extra}
          </text>
        )}
      </svg>
    </div>
  );
}
