import { ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { MathBlock } from '../components/MathBlock';
import { StimulusDiagram } from '../components/StimulusDiagram';
import { ORIGINAL_OSK_15_PROBLEM } from '../data/problemsData';
import { LEARNING_STAGES, THEORY_SECTIONS, TheorySection } from '../data/theoryData';
import { NavPage } from '../types/physics';
import { misterJoNarrator } from '../utils/narrator';

interface TheoryViewProps {
  completedSections: string[];
  onToggleSectionComplete: (sectionId: string) => void;
  onNavigate: (page: NavPage) => void;
}

export function TheoryView({
  completedSections,
  onToggleSectionComplete,
  onNavigate
}: TheoryViewProps) {
  const [activeStageFilter, setActiveStageFilter] = useState<number | 'all'>('all');

  const visibleSections =
    activeStageFilter === 'all'
      ? THEORY_SECTIONS
      : THEORY_SECTIONS.filter((s) => s.stageRef === activeStageFilter);

  const handleNarrateAll = () => {
    misterJoNarrator.playSegments(
      'Modul Teori Lengkap MISTER JO',
      visibleSections.map((sec) => ({
        id: `theory-${sec.id}`,
        label: `Bab ${sec.order}: ${sec.title}`,
        text: sec.narratorScript
      }))
    );
  };

  const handleNarrateSection = (sec: TheorySection) => {
    misterJoNarrator.playSegments(`Bab ${sec.order}: ${sec.title}`, [
      {
        id: `theory-sec-${sec.id}`,
        label: `Bab ${sec.order}: ${sec.title}`,
        text: sec.narratorScript
      },
      ...(sec.formulas ?? []).map((f, idx) => ({
        id: `theory-f-${sec.id}-${idx}`,
        label: f.label,
        text: f.spokenText
      }))
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-blue-700">
            Buku Teks Digital · 13 Bab Terstruktur
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Teori Dasar & Pengembangan Konsep Soal 15 OSK 2026
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Disusun bertahap dari pengenalan fenomena nyata, sumbu koordinat miring, penurunan
            persamaan, miskonsepsi umum, hingga trik cepat olimpiade.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleNarrateAll}
            className="inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-yellow-300 transition-colors whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Dengarkan Materi
          </button>
          <button
            type="button"
            onClick={() => onNavigate('simulasi')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            Uji di Simulasi Fisika
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Stage Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveStageFilter('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeStageFilter === 'all'
              ? 'bg-blue-700 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Semua 13 Bab
        </button>
        {LEARNING_STAGES.map((st) => (
          <button
            key={st.stage}
            type="button"
            onClick={() => setActiveStageFilter(st.stage)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeStageFilter === st.stage
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {st.code}: {st.title}
          </button>
        ))}
      </div>

      {/* Textbook Chapters */}
      <div className="space-y-8">
        {visibleSections.map((sec) => {
          const isDone = completedSections.includes(sec.id);
          return (
            <article
              key={sec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-700 font-mono">
                    Bab {String(sec.order).padStart(2, '0')} · Tahap {sec.stageRef}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{sec.title}</h2>
                  <p className="text-sm font-medium text-slate-600">{sec.summary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleNarrateSection(sec)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Dengarkan Bab {sec.order}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleSectionComplete(sec.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isDone
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {isDone ? 'Sudah Dipahami' : 'Tandai Selesai'}
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-[15px] leading-relaxed text-slate-700 max-w-4xl">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {sec.keyPoints && sec.keyPoints.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Poin Penting
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-800 list-disc list-inside">
                    {sec.keyPoints.map((kp, i) => (
                      <li key={i}>{kp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {sec.formulas && sec.formulas.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  {sec.formulas.map((f, i) => (
                    <MathBlock key={i} label={f.label} latex={f.latex} highlight={true} />
                  ))}
                </div>
              )}

              {/* Contextual Visual Stimuli */}
              {sec.visualType === 'phenomenon-overview' && (
                <StimulusDiagram
                  config={ORIGINAL_OSK_15_PROBLEM.stimulus}
                  title="Stimulus Visual: Meriam Meluncur & Menembak Horizontal"
                />
              )}

              {sec.visualType === 'coordinate-axes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-1.5">
                    <div className="text-xs font-bold text-red-900">
                      Sumbu Horizontal–Vertikal (TIDAK DISARANKAN)
                    </div>
                    <p className="text-xs leading-relaxed text-red-950">
                      Gaya normal impulsif N(t) menyumbang komponen horizontal −∫ N(t) sin α dt yang
                      nilainya besar dan belum diketahui sebelum Δt dicari.
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-900">
                      Sumbu Miring ∥ dan ⊥ (TEPAT & ELEGAN)
                    </div>
                    <p className="text-xs leading-relaxed text-emerald-950">
                      Pada bidang licin, N(t) selalu tegak lurus sumbu ∥ sehingga N∥ = 0. Gaya luar
                      tersisa hanyalah Mg sin α yang konstan dan mudah dihitung!
                    </p>
                  </div>
                </div>
              )}

              {sec.visualType === 'vector-decomposition' && (
                <StimulusDiagram
                  config={{
                    kind: 'vector-projection',
                    alphaDeg: 37,
                    directionMotion: 'down',
                    bulletAngleDeg: 0,
                    labels: {
                      angle: 'α = 37°',
                      momentum: 'p = (p cos α) ∥ + (p sin α) ⊥',
                      extra: 'Proyeksi Orthonormal'
                    }
                  }}
                  title="Stimulus Vektor: Proyeksi Momentum Peluru"
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
