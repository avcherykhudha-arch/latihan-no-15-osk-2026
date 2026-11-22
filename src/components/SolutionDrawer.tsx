import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PracticeProblem } from '../types/physics';
import { misterJoNarrator, NarratorSegment, NarratorSnapshot } from '../utils/narrator';
import { InteractiveFBD } from './InteractiveFBD';
import { MathBlock } from './MathBlock';
import { PhysicsAnimation } from './PhysicsAnimation';

interface SolutionDrawerProps {
  problem: PracticeProblem;
  isOpen: boolean;
  onToggle: () => void;
  canOpen?: boolean;
}

export function SolutionDrawer({
  problem,
  isOpen,
  onToggle,
  canOpen = true
}: SolutionDrawerProps) {
  const [snap, setSnap] = useState<NarratorSnapshot>(() => misterJoNarrator.getSnapshot());

  useEffect(() => {
    return misterJoNarrator.subscribe(setSnap);
  }, []);

  const activeHighlight = snap.activeSegment?.highlightTarget ?? null;

  const handleNarrateFBD = () => {
    const segments: NarratorSegment[] = [
      {
        id: `fbd-intro-${problem.id}`,
        label: `FBD ${problem.code}`,
        text: problem.narratorFbdScript,
        highlightTarget: problem.fbd.forces[0]?.id
      },
      ...problem.fbd.forces.map((f) => ({
        id: `fbd-${problem.id}-${f.id}`,
        label: `Vektor Gaya ${f.label}`,
        text: `${f.label}. ${f.description}`,
        highlightTarget: f.id
      }))
    ];
    misterJoNarrator.playSegments(`Diagram Gaya ${problem.code}`, segments);
  };

  const handleNarrateSolution = () => {
    const s = problem.solution;
    const segments: NarratorSegment[] = [
      {
        id: `sol-intro-${problem.id}`,
        label: `Pembahasan ${problem.code}`,
        text: problem.narratorSolutionScript,
        highlightTarget: 'step-3'
      },
      {
        id: `sol-known-${problem.id}`,
        label: 'Besaran Diketahui & Ditanyakan',
        text: `Diketahui: ${s.known.join(', ')}. Yang ditanyakan adalah: ${s.asked}`,
        highlightTarget: 'step-1'
      },
      {
        id: `sol-principle-${problem.id}`,
        label: 'Prinsip Fisika & Persamaan Dasar',
        text: `Prinsip utama yang berlaku adalah ${s.principleName}. ${s.principleFormulas.map((f) => f.spokenText).join(' ')}`,
        highlightTarget: 'step-7'
      },
      {
        id: `sol-calc-${problem.id}`,
        label: 'Hasil Akhir & Makna Fisis',
        text: `Jawaban akhir yang diperoleh adalah ${s.finalAnswerDisplay}. ${s.physicalInterpretation}`,
        highlightTarget: 'step-14'
      }
    ];
    misterJoNarrator.playSegments(`Pembahasan Lengkap ${problem.code}`, segments);
  };

  const s = problem.solution;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          disabled={!canOpen}
          aria-expanded={isOpen}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
            isOpen
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300 border border-yellow-500/40'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
          {isOpen ? 'TUTUP PEMBAHASAN' : 'LIHAT PEMBAHASAN'}
        </button>

        {isOpen && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleNarrateFBD}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              Dengarkan FBD
            </button>
            <button
              type="button"
              onClick={handleNarrateSolution}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              Dengarkan Pembahasan
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-blue-700">
                Pembahasan Standar Olimpiade · {problem.code}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{problem.title}</h3>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-sm font-bold text-blue-900 font-mono tabular-nums">
              Jawaban Akhir: {problem.correctFormatted} {problem.unit}
            </div>
          </div>

          {/* 1 & 2: Diketahui dan Ditanyakan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`rounded-xl border p-4 transition-colors ${
                activeHighlight === 'step-1' ? 'border-yellow-500 bg-yellow-50' : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                1. Informasi yang Diketahui
              </h4>
              <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
                {s.known.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                2. Besaran yang Ditanyakan
              </h4>
              <p className="text-sm font-medium text-slate-900">{s.asked}</p>
            </div>
          </div>

          {/* 3: Prinsip Fisika */}
          <div
            className={`rounded-xl border p-4 space-y-3 transition-colors ${
              activeHighlight === 'step-3' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-200 bg-blue-50/40'
            }`}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
              3. Prinsip Fisika yang Berlaku: {s.principleName}
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {s.principleFormulas.map((f, i) => (
                <MathBlock
                  key={i}
                  label={f.label}
                  latex={f.latex}
                  highlight={true}
                  isNarrated={activeHighlight === 'step-7'}
                />
              ))}
            </div>
          </div>

          {/* 4 & 5: Analisis Situasi & Visualisasi Fenomena */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Analisis Situasi Fisis
              </h4>
              <p className="text-sm leading-relaxed text-slate-700">{s.physicalSituation}</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                5. Visualisasi Fenomena
              </h4>
              <p className="text-sm leading-relaxed text-slate-700">{s.phenomenonVisualization}</p>
            </div>
          </div>

          {/* 6: Free Body Diagram */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              6. Free Body Diagram (FBD)
            </h4>
            <p className="text-sm text-slate-600">{s.fbdNote}</p>
            <InteractiveFBD
              config={problem.fbd}
              highlightedForceId={activeHighlight?.startsWith('fbd-') ? activeHighlight : null}
            />
          </div>

          {/* 7 & 8: Persamaan Dasar & Penurunan Rumus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              7. Penentuan Persamaan Dasar
            </h4>
            {s.baseEquations.map((eq, i) => (
              <MathBlock
                key={i}
                label={eq.label}
                latex={eq.latex}
                highlight={true}
                isNarrated={activeHighlight === 'step-7'}
              />
            ))}

            <h4 className="pt-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              8. Penurunan Rumus Secara Bertahap
            </h4>
            <div className="space-y-3">
              {s.derivationSteps.map((step, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                  <div className="text-sm font-bold text-slate-900">{step.title}</div>
                  <p className="text-sm text-slate-700">{step.explanation}</p>
                  {step.latex && <MathBlock latex={step.latex} />}
                </div>
              ))}
            </div>
          </div>

          {/* 9 & 10: Substitusi & Perhitungan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                9. Substitusi Angka
              </h4>
              {s.substitution.map((sub, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-sm text-slate-700">{sub.explanation}</p>
                  <MathBlock latex={sub.latex} />
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                10. Perhitungan Matematis
              </h4>
              {s.calculation.map((calc, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-sm text-slate-700">{calc.explanation}</p>
                  <MathBlock latex={calc.latex} highlight={true} />
                </div>
              ))}
            </div>
          </div>

          {/* 11, 12, 13, 14 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                11. Pemeriksaan Dimensi dan Satuan
              </h4>
              <p className="text-sm text-slate-700">{s.dimensionCheck}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                12. Aturan Pembulatan & Angka Penting
              </h4>
              <p className="text-sm text-slate-700">{s.roundingRule}</p>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 space-y-2 transition-colors ${
              activeHighlight === 'step-14'
                ? 'border-yellow-500 bg-yellow-100/70'
                : 'border-blue-200 bg-blue-50/70'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                13. Jawaban Akhir & 14. Interpretasi Makna Fisis
              </h4>
              <span className="rounded-lg bg-yellow-400 px-3 py-1 text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                {s.finalAnswerDisplay}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-800">{s.physicalInterpretation}</p>
          </div>

          {/* Mandatory Physics Proof Animation per Solution */}
          <PhysicsAnimation
            config={problem.animation}
            title={`Animasi Pembuktian Fenomena Fisika — ${problem.code}`}
          />
        </div>
      )}
    </div>
  );
}
