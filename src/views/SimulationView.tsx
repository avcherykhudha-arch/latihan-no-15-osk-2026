import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { InteractiveFBD } from '../components/InteractiveFBD';
import { MathBlock } from '../components/MathBlock';
import { PhysicsAnimation } from '../components/PhysicsAnimation';
import { generateInclineSimulation, getTrig } from '../utils/physicsCalculations';

export function SimulationView() {
  // Default to exact OSK 2026 Problem 15 parameters!
  const [massKg, setMassKg] = useState(800);
  const [alphaDeg, setAlphaDeg] = useState(37);
  const [ell, setEll] = useState(8.0);
  const [pNs, setPNs] = useState(9890);
  const [muK, setMuK] = useState(0);
  const [bulletAngleDeg, setBulletAngleDeg] = useState(0);

  const g = 9.8;
  const { sinA, cosA } = getTrig(alphaDeg, false);

  // Compute physical duration Δt that stops the cannon (when physically valid), or clamp for demo
  const computedStats = useMemo(() => {
    const aSlide = g * (sinA - muK * cosA);
    const vBefore = Math.sqrt(Math.max(0, 2 * Math.max(0, aSlide) * ell));
    const bRad = (bulletAngleDeg * Math.PI) / 180;
    const cosB = Math.cos(bRad);
    const sinB = Math.sin(bRad);
    const pPar = pNs * (cosA * cosB - sinA * sinB);
    const pPerp = pNs * (sinA * cosB + cosA * sinB);
    const denom = massKg * g * (sinA - muK * cosA);
    const numer = pPar + muK * pPerp - massKg * vBefore;
    const rawDeltaTMs = denom > 1e-6 ? (numer / denom) * 1000 : 32.4;
    const isStoppable = rawDeltaTMs > 1 && rawDeltaTMs < 500;
    const usedDeltaTMs = isStoppable ? rawDeltaTMs : 40.0;

    const sim = generateInclineSimulation({
      M: massKg,
      g,
      alphaDeg,
      ell,
      p: pNs,
      deltaTMs: usedDeltaTMs,
      muK,
      bulletAngleDeg
    });

    return {
      vBefore,
      rawDeltaTMs,
      usedDeltaTMs,
      isStoppable,
      sim
    };
  }, [massKg, alphaDeg, ell, pNs, muK, bulletAngleDeg, sinA, cosA]);

  const handleResetOSK15 = () => {
    setMassKg(800);
    setAlphaDeg(37);
    setEll(8.0);
    setPNs(9890);
    setMuK(0);
    setBulletAngleDeg(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-700">Laboratorium Virtual Soal 15 OSK 2026</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Simulasi Interaktif Bidang Miring & Pembuktian Impuls
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Ubah parameter massa, sudut kemiringan, jarak luncur, gesekan, atau sudut tembak peluru
            untuk mengamati bagaimana durasi tembakan Δt dan lonjakan gaya normal N(t) berubah.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetOSK15}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset ke Soal 15 OSK 2026
        </button>
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone (Interactive Stage) */}
        <div className="lg:col-span-8 space-y-6">
          <PhysicsAnimation
            title="Simulasi Langsung Meriam di Bidang Miring"
            config={{
              mode: muK > 0 ? 'rough-stop' : computedStats.sim.vAfterShot < -0.2 ? 'rebound' : 'cannon-stop',
              alphaDeg,
              M: massKg,
              g,
              ell,
              p: pNs,
              deltaTMs: computedStats.usedDeltaTMs,
              muK,
              bulletAngleDeg,
              directionMotion: 'down',
              whatIsObserved: `Meriam ${massKg} kg meluncur ${ell.toFixed(1).replace('.', ',')} m di bidang ${alphaDeg}° mencapai laju ${computedStats.vBefore.toFixed(2).replace('.', ',')} m/s sebelum menembak peluru ${pNs} Ns.`,
              physicsPrinciple: 'Teorema Impuls–Momentum Sejajar Bidang & Lonjakan Gaya Normal Tegak Lurus Bidang',
              whyItHappens:
                computedStats.isStoppable
                  ? `Agar meriam tepat berhenti, gravitasi dan gesekan memasok selisih momentum selama ${computedStats.usedDeltaTMs.toFixed(1).replace('.', ',')} ms.`
                  : 'Dengan kombinasi parameter saat ini, tembakan 40,0 ms menghasilkan keadaan akhir tak-berhenti (meluncur terus atau terpental naik).',
              mathematicalProofLatex: `\\Delta t = \\frac{${Math.round(computedStats.sim.pBulletParallel)} - ${Math.round(massKg * computedStats.vBefore)}}{${Math.round(massKg * g * sinA)}} \\approx ${computedStats.usedDeltaTMs.toFixed(1).replace('.', ',')}\\text{ ms}`
            }}
          />

          <InteractiveFBD
            config={{
              title: 'Free Body Diagram Sinkron Parameter Simulasi',
              inclineDeg: alphaDeg,
              directionMotion: 'down',
              showAxes: true,
              showShotForces: true,
              bulletAngleDeg,
              forces: [
                {
                  id: 'fbd-mg',
                  label: `Mg (${(massKg * g / 1000).toFixed(2)} kN)`,
                  latexLabel: 'M\\vec{g}',
                  directionDeg: 270,
                  relativeMagnitude: 0.85,
                  color: '#1D4ED8',
                  phase: 'all',
                  description: `Berat total ${(massKg * g).toFixed(0)} N.`,
                  componentX: `Mg sin ${alphaDeg}° = ${(massKg * g * sinA).toFixed(0)} N`,
                  componentY: `-Mg cos ${alphaDeg}° = -${(massKg * g * cosA).toFixed(0)} N`
                },
                {
                  id: 'fbd-normal',
                  label: `N̄ (${(computedStats.sim.averageNormalDuringShot / 1000).toFixed(1)} kN)`,
                  latexLabel: '\\bar{N}',
                  directionDeg: 90 - alphaDeg,
                  relativeMagnitude: 1.15,
                  color: '#059669',
                  phase: 'shot',
                  description: `Gaya normal melonjak dari ${(computedStats.sim.normalDuringSlide / 1000).toFixed(2)} kN saat meluncur menjadi rata-rata ${(computedStats.sim.averageNormalDuringShot / 1000).toFixed(1)} kN saat tembakan.`
                },
                {
                  id: 'fbd-recoil',
                  label: 'F_reaksi',
                  latexLabel: '\\vec{F}_{\\text{reaksi}}',
                  directionDeg: 180 + bulletAngleDeg,
                  relativeMagnitude: 1.0,
                  color: '#DC2626',
                  phase: 'shot',
                  description: `Gaya dorong balik berlawanan arah tembakan peluru (${bulletAngleDeg}° terhadap horizontal).`
                },
                ...(muK > 0
                  ? [
                      {
                        id: 'fbd-friction',
                        label: `f_k (μ=${muK.toFixed(2)})`,
                        latexLabel: '\\vec{f}_k',
                        directionDeg: 180 - alphaDeg,
                        relativeMagnitude: 0.7,
                        color: '#D97706',
                        phase: 'all' as const,
                        description: 'Gaya gesekan kinetik ke atas bidang selama meriam bergerak turun.'
                      }
                    ]
                  : [])
              ],
              xComponentSummary: `P_awal = ${(massKg * computedStats.vBefore).toFixed(0)} Ns, p∥ = ${computedStats.sim.pBulletParallel.toFixed(0)} Ns`,
              yComponentSummary: `N̄ = ${(computedStats.sim.averageNormalDuringShot / 1000).toFixed(1)} kN`
            }}
          />
        </div>

        {/* Right Zone (Control & Concept Deck) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Panel Kendali Parameter Fisis
          </h2>

          {/* Sliders with explicit units */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-mass" className="text-slate-700">Massa Meriam (M)</label>
                <span className="font-mono tabular-nums text-blue-800">{massKg} kg</span>
              </div>
              <input
                id="sim-mass"
                type="range"
                min={200}
                max={1200}
                step={50}
                value={massKg}
                onChange={(e) => setMassKg(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-alpha" className="text-slate-700">Sudut Kemiringan (α)</label>
                <span className="font-mono tabular-nums text-blue-800">{alphaDeg}°</span>
              </div>
              <input
                id="sim-alpha"
                type="range"
                min={15}
                max={60}
                step={1}
                value={alphaDeg}
                onChange={(e) => setAlphaDeg(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-ell" className="text-slate-700">Jarak Luncur (ℓ)</label>
                <span className="font-mono tabular-nums text-blue-800">{ell.toFixed(1).replace('.', ',')} m</span>
              </div>
              <input
                id="sim-ell"
                type="range"
                min={2}
                max={20}
                step={0.5}
                value={ell}
                onChange={(e) => setEll(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-p" className="text-slate-700">Momentum Peluru (p)</label>
                <span className="font-mono tabular-nums text-blue-800">{pNs} Ns</span>
              </div>
              <input
                id="sim-p"
                type="range"
                min={2000}
                max={18000}
                step={10}
                value={pNs}
                onChange={(e) => setPNs(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-mu" className="text-slate-700">Koefisien Gesek (μ_k)</label>
                <span className="font-mono tabular-nums text-blue-800">{muK.toFixed(2).replace('.', ',')}</span>
              </div>
              <input
                id="sim-mu"
                type="range"
                min={0}
                max={0.4}
                step={0.05}
                value={muK}
                onChange={(e) => setMuK(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label htmlFor="sim-theta" className="text-slate-700">Sudut Elevasi Tembak (θ)</label>
                <span className="font-mono tabular-nums text-blue-800">{bulletAngleDeg}°</span>
              </div>
              <input
                id="sim-theta"
                type="range"
                min={0}
                max={35}
                step={1}
                value={bulletAngleDeg}
                onChange={(e) => setBulletAngleDeg(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Readout */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-2.5 text-xs">
            <div className="font-bold text-blue-950">Hasil Perhitungan Fisika Real-Time</div>
            <div className="flex justify-between">
              <span className="text-slate-600">Laju Sebelum Tembakan (v):</span>
              <span className="font-mono font-bold tabular-nums text-slate-900">
                {computedStats.vBefore.toFixed(2).replace('.', ',')} m/s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Momentum Awal (Mv):</span>
              <span className="font-mono font-bold tabular-nums text-slate-900">
                {(massKg * computedStats.vBefore).toFixed(0)} Ns
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Proyeksi Peluru (p∥):</span>
              <span className="font-mono font-bold tabular-nums text-slate-900">
                {computedStats.sim.pBulletParallel.toFixed(0)} Ns
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Gaya Normal Rata-Rata (N̄):</span>
              <span className="font-mono font-bold tabular-nums text-emerald-800">
                {(computedStats.sim.averageNormalDuringShot / 1000).toFixed(1).replace('.', ',')} kN
              </span>
            </div>
            <div className="pt-2 border-t border-blue-200 flex justify-between items-center">
              <span className="font-semibold text-blue-950">Durasi Tembakan (Δt):</span>
              <span className="rounded bg-yellow-300 px-2 py-0.5 font-mono font-extrabold tabular-nums text-slate-900">
                {computedStats.isStoppable
                  ? `${computedStats.usedDeltaTMs.toFixed(1).replace('.', ',')} ms`
                  : 'Tak Tepat Berhenti'}
              </span>
            </div>
          </div>

          <MathBlock
            label="Rumus yang Diterapkan"
            latex={`\\Delta t = \\frac{p\\cos(\\alpha+\\theta) + \\mu_k p\\sin(\\alpha+\\theta) - Mv}{Mg(\\sin\\alpha - \\mu_k\\cos\\alpha)}`}
          />
        </div>
      </div>
    </div>
  );
}
