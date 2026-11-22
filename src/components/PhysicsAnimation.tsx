import { Pause, Play, RotateCcw, SkipBack } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimationProofConfig } from '../types/physics';
import { degToRad, generateInclineSimulation, getTrig } from '../utils/physicsCalculations';
import { MathBlock } from './MathBlock';

interface PhysicsAnimationProps {
  config: AnimationProofConfig;
  title?: string;
}

export function PhysicsAnimation({
  config,
  title = 'Animasi Pembuktian Fenomena Fisika'
}: PhysicsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 normalized animation timeline

  const sim = useMemo(
    () =>
      generateInclineSimulation({
        M: config.M,
        g: config.g,
        alphaDeg: config.alphaDeg,
        ell: config.ell,
        p: config.p,
        deltaTMs: config.deltaTMs,
        muK: config.muK ?? 0,
        bulletAngleDeg: config.bulletAngleDeg ?? 0,
        springK: config.springK ?? 0,
        springCompression: config.springCompression ?? 0,
        v0: config.v0 ?? 0,
        directionMotion: config.directionMotion,
        thrustShape: config.thrustShape ?? 'constant'
      }),
    [config]
  );

  // Map normalized animation progress [0..1] to physical time t
  // We allocate 42% of animation time to pre-shot slide, 30% to slow-motion firing Δt, 28% to post-shot!
  const mapProgressToTime = (u: number) => {
    const tSlide = sim.slideTime;
    const tShotEnd = sim.slideTime + sim.deltaTSeconds;
    const tTotal = tShotEnd + sim.reboundTime;
    if (u <= 0.42) {
      return { t: (u / 0.42) * tSlide, phase: 'slide' as const, shotFrac: 0 };
    }
    if (u <= 0.72) {
      const f = (u - 0.42) / 0.30;
      return { t: tSlide + f * sim.deltaTSeconds, phase: 'shot' as const, shotFrac: f };
    }
    const fPost = (u - 0.72) / 0.28;
    return { t: tShotEnd + fPost * (tTotal - tShotEnd), phase: 'post' as const, shotFrac: 1 };
  };

  // Interpolate simulation point at physical time t
  const sampleAtTime = (t: number) => {
    const pts = sim.points;
    if (pts.length === 0) {
      return {
        t: 0,
        s: 0,
        v: 0,
        pCannon: 0,
        pBullet: 0,
        pTotalParallel: 0,
        normalForce: 0,
        kineticEnergy: 0,
        potentialEnergy: 0
      };
    }
    if (t <= pts[0].t) return pts[0];
    if (t >= pts[pts.length - 1].t) return pts[pts.length - 1];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (t >= a.t && t <= b.t) {
        const span = Math.max(1e-9, b.t - a.t);
        const alpha = (t - a.t) / span;
        return {
          t,
          s: a.s + (b.s - a.s) * alpha,
          v: a.v + (b.v - a.v) * alpha,
          pCannon: a.pCannon + (b.pCannon - a.pCannon) * alpha,
          pBullet: a.pBullet + (b.pBullet - a.pBullet) * alpha,
          pTotalParallel: a.pTotalParallel + (b.pTotalParallel - a.pTotalParallel) * alpha,
          normalForce: a.normalForce + (b.normalForce - a.normalForce) * alpha,
          kineticEnergy: a.kineticEnergy + (b.kineticEnergy - a.kineticEnergy) * alpha,
          potentialEnergy: a.potentialEnergy + (b.potentialEnergy - a.potentialEnergy) * alpha
        };
      }
    }
    return pts[pts.length - 1];
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      setProgress((prev) => {
        const next = prev + dt * 0.19; // ~5.2s full cycle
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  // Draw canvas frame whenever progress or config changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { t, phase, shotFrac } = mapProgressToTime(progress);
    const state = sampleAtTime(t);
    const { sinA, cosA } = getTrig(config.alphaDeg, false);

    // Background clean grid
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Left 62% = Physical Stage, Right 38% = Live Graphs & Bars
    const stageW = Math.round(W * 0.61);

    // Incline coordinates
    const baseY = H - 36;
    const topX = 48;
    const runPx = stageW - 120;
    const risePx = Math.min(H - 110, runPx * (sinA / cosA));
    const topY = baseY - risePx;
    const botX = topX + runPx;
    const botY = baseY;

    const dx = botX - topX;
    const dy = botY - topY;
    const inclinePxLen = Math.hypot(dx, dy);
    const ux = dx / inclinePxLen;
    const uy = dy / inclinePxLen;
    const nx = uy;
    const ny = -ux;

    // Ground line
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, baseY);
    ctx.lineTo(stageW - 14, baseY);
    ctx.stroke();

    // Wedge body
    ctx.fillStyle = '#E2E8F0';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(botX, botY);
    ctx.lineTo(topX, botY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rough ticks
    if ((config.muK ?? 0) > 0) {
      ctx.strokeStyle = '#B45309';
      ctx.lineWidth = 1.6;
      for (let i = 1; i < 16; i++) {
        const f = i / 16;
        const px = topX + dx * f;
        const py = topY + dy * f;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - ux * 5 - nx * 4, py - uy * 5 - ny * 4);
        ctx.stroke();
      }
    }

    // Angle label positioned cleanly inside wedge
    ctx.fillStyle = '#1E3A8A';
    ctx.font = 'bold 12px "DM Sans", sans-serif';
    ctx.fillText(`α = ${config.alphaDeg}°`, botX - 88, botY - 10);

    // Map physical position s (meters) onto incline pixels
    const maxPhysS = Math.max(config.ell * 1.35, 10);
    let sNorm = 0;
    if (config.directionMotion === 'down') {
      sNorm = Math.max(0.05, Math.min(0.92, 0.1 + (state.s / maxPhysS) * 0.78));
    } else {
      // Uphill starts lower and moves up
      sNorm = Math.max(0.12, Math.min(0.88, 0.78 - (state.s / Math.max(config.ell * 1.4, 5)) * 0.55));
    }

    const posX = topX + dx * sNorm;
    const posY = topY + dy * sNorm;
    const cannonX = posX + nx * 16;
    const cannonY = posY + ny * 16;

    // Trajectory trail along incline
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    if (config.directionMotion === 'down') {
      ctx.moveTo(topX + dx * 0.1 + nx * 16, topY + dy * 0.1 + ny * 16);
    } else {
      ctx.moveTo(topX + dx * 0.78 + nx * 16, topY + dy * 0.78 + ny * 16);
    }
    ctx.lineTo(cannonX, cannonY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw spring at top if spring launch
    if ((config.springK ?? 0) > 0) {
      const springEndFrac = Math.min(sNorm, 0.25);
      const sEndX = topX + dx * springEndFrac + nx * 14;
      const sEndY = topY + dy * springEndFrac + ny * 14;
      ctx.strokeStyle = '#1D4ED8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(topX + nx * 14, topY + ny * 14);
      const coils = 6;
      for (let c = 1; c < coils; c++) {
        const cf = c / coils;
        const bx = topX + (sEndX - (topX + nx * 14)) * cf;
        const by = topY + (sEndY - (topY + ny * 14)) * cf;
        const offset = c % 2 === 0 ? 7 : -7;
        ctx.lineTo(bx + nx * offset, by + ny * offset);
      }
      ctx.lineTo(sEndX, sEndY);
      ctx.stroke();
    }

    // Draw Cannon
    ctx.save();
    ctx.translate(cannonX, cannonY);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = '#1E3A8A';
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(-18, -10, 36, 18, 4);
    ctx.fill();
    ctx.stroke();
    // Wheels
    ctx.fillStyle = '#FACC15';
    ctx.beginPath();
    ctx.arc(-10, 10, 5, 0, Math.PI * 2);
    ctx.arc(10, 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Helper for drawing arrow
    const drawArrow = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      label: string,
      width = 2.4
    ) => {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const len = Math.hypot(x2 - x1, y2 - y1);
      if (len < 6) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 8 * Math.cos(angle - 0.42), y2 - 8 * Math.sin(angle - 0.42));
      ctx.lineTo(x2 - 8 * Math.cos(angle + 0.42), y2 - 8 * Math.sin(angle + 0.42));
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 11px "DM Sans", sans-serif';
      ctx.fillText(label, x2 + 5, y2 + 4);
      ctx.restore();
    };

    // Force vectors on cannon
    // 1. Gravity Mg (always downward)
    drawArrow(cannonX, cannonY, cannonX, cannonY + 42, '#1D4ED8', 'Mg', 2.2);

    // 2. Normal Force N(t) perpendicular out of incline — spikes visually during shot!
    const normalRatio = Math.min(2.3, 0.8 + (state.normalForce / Math.max(1, sim.normalDuringSlide) - 1) * 0.08);
    const nLen = 36 * normalRatio;
    drawArrow(
      cannonX,
      cannonY,
      cannonX + nx * nLen,
      cannonY + ny * nLen,
      phase === 'shot' ? '#047857' : '#059669',
      phase === 'shot' ? 'N(t) LONJAK!' : 'N',
      phase === 'shot' ? 3.5 : 2.2
    );

    // 3. Velocity vector
    if (Math.abs(state.v) > 0.25) {
      const sign = config.directionMotion === 'down' ? Math.sign(state.v) : -Math.sign(state.v);
      const vLen = Math.min(54, Math.abs(state.v) * 4.2);
      drawArrow(
        cannonX + nx * 22,
        cannonY + ny * 22,
        cannonX + nx * 22 + ux * vLen * sign,
        cannonY + ny * 22 + uy * vLen * sign,
        '#CA8A04',
        `v = ${state.v.toFixed(1)} m/s`,
        2.5
      );
    }

    // 4. Projectile & Recoil flash during & after shot
    if ((phase === 'shot' || phase === 'post') && config.p > 0) {
      const bDeg = config.bulletAngleDeg ?? 0;
      const bRad = degToRad(bDeg);
      const bDirX = Math.cos(bRad);
      const bDirY = -Math.sin(bRad);
      const distBullet =
        phase === 'shot' ? 24 + shotFrac * 45 : 69 + ((progress - 0.72) / 0.28) * 110;
      const bx = cannonX + bDirX * distBullet;
      const by = cannonY + bDirY * distBullet + (phase === 'post' ? Math.pow((progress - 0.72) / 0.28, 2) * 28 : 0);

      if (phase === 'shot') {
        // Recoil arrow on cannon
        drawArrow(
          cannonX,
          cannonY,
          cannonX - bDirX * 48,
          cannonY - bDirY * 48,
          '#DC2626',
          'F_reaksi',
          3
        );
        // Muzzle flash
        ctx.fillStyle = 'rgba(250, 204, 21, 0.75)';
        ctx.beginPath();
        ctx.arc(cannonX + bDirX * 22, cannonY + bDirY * 22, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bullet projectile
      if (bx < stageW - 10 && by > 10 && by < H - 10) {
        ctx.fillStyle = '#EAB308';
        ctx.strokeStyle = '#713F12';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx, by, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#854D0E';
        ctx.font = 'bold 11px "DM Sans", sans-serif';
        ctx.fillText('peluru (p)', bx + 8, by - 4);
      }
    }

    // Phase Banner inside Stage top-left
    const phaseLabel =
      phase === 'slide'
        ? 'FASE 1: Meluncur Bebas (Gravitasi Mempercepat)'
        : phase === 'shot'
        ? 'FASE 2: Tembakan Berdurasi Δt (Diperlambat 15×)'
        : 'FASE 3: Pascatembakan (Keadaan Akhir)';
    ctx.font = 'bold 11.5px "DM Sans", sans-serif';
    const bannerW = Math.max(280, ctx.measureText(phaseLabel).width + 24);
    ctx.fillStyle = phase === 'shot' ? '#FEF08A' : '#DBEAFE';
    ctx.strokeStyle = phase === 'shot' ? '#CA8A04' : '#93C5FD';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(14, 12, bannerW, 36, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#0F172A';
    ctx.fillText(phaseLabel, 24, 34);

    // RIGHT PANEL: Live Momentum Bars & N(t) Graph
    const panelX = stageW + 10;
    const panelW = W - panelX - 14;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(panelX, 12, panelW, H - 24, 10);
    ctx.fill();
    ctx.stroke();

    // Telemetry text
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Pembuktian Kuantitatif Real-Time', panelX + 12, 32);

    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#334155';
    ctx.fillText(`t  = ${(t * 1000).toFixed(0)} ms`, panelX + 12, 52);
    ctx.fillText(`v  = ${state.v.toFixed(2)} m/s`, panelX + 130, 52);
    ctx.fillText(`N  = ${(state.normalForce / 1000).toFixed(1)} kN`, panelX + 12, 68);
    ctx.fillText(`P∥ = ${(state.pTotalParallel / 1000).toFixed(2)} kNs`, panelX + 130, 68);

    // Momentum comparison horizontal bars
    const barBaseY = 92;
    const maxP = Math.max(100, Math.abs(sim.vBeforeShot * config.M), Math.abs(sim.pBulletParallel), 1);
    const maxBarW = panelW - 95;

    const drawMomBar = (y: number, label: string, val: number, color: string) => {
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 10.5px "DM Sans", sans-serif';
      ctx.fillText(label, panelX + 12, y + 10);
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(panelX + 82, y, maxBarW, 13);
      const w = Math.min(maxBarW, (Math.abs(val) / maxP) * maxBarW * 0.9);
      ctx.fillStyle = color;
      ctx.fillRect(panelX + 82, y, w, 13);
    };

    drawMomBar(barBaseY, 'P meriam', state.pCannon, '#1D4ED8');
    drawMomBar(barBaseY + 20, 'P peluru∥', state.pBullet, '#EAB308');
    drawMomBar(barBaseY + 40, 'P total∥', state.pTotalParallel, '#059669');

    // Graph: v(t) & N(t) spike over timeline
    const gX = panelX + 16;
    const gY = 166;
    const gW = panelW - 32;
    const gH = H - gY - 30;

    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#CBD5E1';
    ctx.fillRect(gX, gY, gW, gH);
    ctx.strokeRect(gX, gY, gW, gH);

    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 10.5px "DM Sans", sans-serif';
    ctx.fillText('Grafik v(t) [Biru] & N(t) [Hijau]', gX + 4, gY - 6);

    const maxV = Math.max(1, sim.vBeforeShot, Math.abs(config.v0 ?? 0));
    const maxN = Math.max(1, ...sim.points.map((pt) => pt.normalForce));
    const totalPts = sim.points.length;

    // Draw N(t) spike curve
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    sim.points.forEach((pt, idx) => {
      const px = gX + (idx / Math.max(1, totalPts - 1)) * gW;
      const py = gY + gH - (pt.normalForce / maxN) * (gH - 12) - 4;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Draw v(t) curve
    ctx.strokeStyle = '#1D4ED8';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    sim.points.forEach((pt, idx) => {
      const px = gX + (idx / Math.max(1, totalPts - 1)) * gW;
      const vNorm = Math.max(0, Math.min(1, (pt.v + maxV * 0.5) / (maxV * 1.6)));
      const py = gY + gH - vNorm * (gH - 12) - 4;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Current time cursor on graph
    const cursorX = gX + progress * gW;
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cursorX, gY);
    ctx.lineTo(cursorX, gY + gH);
    ctx.stroke();
  }, [progress, config, sim]);

  const handlePlay = () => {
    if (progress >= 0.99) setProgress(0);
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-600">
            Simulasi langsung gerak meriam, pelontaran peluru, vektor gaya, dan pembuktian impuls-momentum.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Play
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3.5 py-2 text-xs font-semibold text-slate-900 hover:bg-yellow-500 transition-colors whitespace-nowrap shrink-0"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              Pause
            </button>
          )}
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Replay
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      {/* Canvas stage */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <canvas
          ref={canvasRef}
          width={760}
          height={310}
          data-testid="physics-proof-canvas"
          className="w-full h-auto block"
        />
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="flex items-center gap-3 text-xs text-slate-600">
        <label htmlFor={`scrub-${config.mode}-${config.p}`} className="font-semibold whitespace-nowrap">
          Garis Waktu:
        </label>
        <input
          id={`scrub-${config.mode}-${config.p}`}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={(e) => {
            setIsPlaying(false);
            setProgress(Number(e.target.value));
          }}
          className="w-full accent-blue-700 cursor-pointer"
        />
        <span className="font-mono tabular-nums w-12 text-right">
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* 4 Mandatory Scientific Proof Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <div className="text-xs font-bold text-blue-900 mb-1">1. Apa yang sedang diamati?</div>
          <p className="text-xs leading-relaxed text-slate-700">{config.whatIsObserved}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <div className="text-xs font-bold text-blue-900 mb-1">2. Prinsip fisika apa yang bekerja?</div>
          <p className="text-xs leading-relaxed text-slate-700">{config.physicsPrinciple}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <div className="text-xs font-bold text-blue-900 mb-1">3. Mengapa fenomena tersebut terjadi?</div>
          <p className="text-xs leading-relaxed text-slate-700">{config.whyItHappens}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
          <div className="text-xs font-bold text-blue-900 mb-1">4. Pembuktian Matematis</div>
          <MathBlock latex={config.mathematicalProofLatex} displayMode={true} highlight={true} />
        </div>
      </div>
    </div>
  );
}
