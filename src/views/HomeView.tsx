import { ArrowRight, BookOpen, Compass, PlayCircle, Target, Volume2 } from 'lucide-react';
import { MathBlock } from '../components/MathBlock';
import { StimulusDiagram } from '../components/StimulusDiagram';
import { ORIGINAL_OSK_15_PROBLEM } from '../data/problemsData';
import { LEARNING_STAGES, OSK_2026_PROBLEM_15_ANALYSIS } from '../data/theoryData';
import { NavPage } from '../types/physics';
import { misterJoNarrator } from '../utils/narrator';

interface HomeViewProps {
  onNavigate: (page: NavPage) => void;
  solvedCount: number;
}

export function HomeView({ onNavigate, solvedCount }: HomeViewProps) {
  const handleSpeakWelcome = () => {
    misterJoNarrator.playSegments('Pengantar MISTER JO — Soal 15 OSK 2026', [
      {
        id: 'home-welcome',
        label: 'Sambutan MISTER JO',
        text: 'Halo calon juara Olimpiade Sains Nasional! Saya Mister Jo. Di platform ini kita akan membedah secara tuntas satu soal mekanika klasik yang sangat elegan dari OSK Fisika dua ribu dua puluh enam, yaitu Soal Nomor lima belas tentang meriam di bidang miring dan durasi tembakan peluru.'
      },
      {
        id: 'home-source',
        label: 'Inti Soal 15 OSK 2026',
        text: OSK_2026_PROBLEM_15_ANALYSIS.fastestStrategy
      }
    ]);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-4">
            <div className="text-xs font-bold tracking-wide text-blue-700">
              MISTER JO · Olimpiade Sains Fisika Tingkat Kota 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
              Kuasai Dinamika Bidang Miring & Impuls–Momentum dari Soal 15 OSK 2026
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Platform belajar terstruktur dari nol hingga tingkat olimpiade: teori buku teks,
              Free Body Diagram interaktif, animasi pembuktian hukum fisika, 15 soal isian singkat
              bertingkat, dan bimbingan suara tegas bersama <strong className="text-slate-900">MISTER JO</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('modul-teori')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              Mulai Belajar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('latihan')}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition-colors whitespace-nowrap shrink-0"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              Langsung ke 15 Soal ({solvedCount}/15)
            </button>
            <button
              type="button"
              onClick={handleSpeakWelcome}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Volume2 className="h-4 w-4 text-blue-700" aria-hidden="true" />
              Dengarkan MISTER JO
            </button>
          </div>

          {/* Clean unboxed KPI strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-slate-200">
            <div>
              <div className="text-2xl font-extrabold text-blue-800 font-mono tabular-nums">13</div>
              <div className="text-xs text-slate-600">Bab Teori Mendalam</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-800 font-mono tabular-nums">7</div>
              <div className="text-xs text-slate-600">Tahap Pemula–Ahli</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-800 font-mono tabular-nums">15</div>
              <div className="text-xs text-slate-600">Soal Isian 1 Desimal</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-800 font-mono tabular-nums">14</div>
              <div className="text-xs text-slate-600">Langkah Pembahasan</div>
            </div>
          </div>
        </div>

        {/* Right Hero Card: Original OSK 2026 Problem 15 Visual */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Acuan Tunggal · OSK Fisika SMA 2026</span>
            <span className="font-mono text-blue-800">Soal No. 15</span>
          </div>
          <StimulusDiagram
            config={ORIGINAL_OSK_15_PROBLEM.stimulus}
            title="Skema Asli Soal Nomor 15 OSK 2026"
          />
          <blockquote className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-white rounded-xl border border-slate-200 p-4">
            “{OSK_2026_PROBLEM_15_ANALYSIS.originalText}”
          </blockquote>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigate('simulasi')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
            >
              <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Buka Simulasi Soal 15
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pembahasan')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Lihat Bedah Jawaban (32,4 ms)
            </button>
          </div>
        </div>
      </section>

      {/* Deep Dissection of Source Problem 15 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-blue-700">Analisis Dokumen Sumber Wajib</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Anatomi Fisika Soal Nomor 15 OSK 2026
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('peta-konsep')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Lihat Peta Hubungan Konsep
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Konsep Utama & Cabang Ilmu</h3>
            <p className="text-sm leading-relaxed text-slate-700">
              {OSK_2026_PROBLEM_15_ANALYSIS.mainConcept}
            </p>
            <p className="text-xs text-slate-500">{OSK_2026_PROBLEM_15_ANALYSIS.physicsBranch}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Prinsip & Hukum Fisika</h3>
            <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
              {OSK_2026_PROBLEM_15_ANALYSIS.principlesUsed.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-yellow-300 bg-yellow-50/70 p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Strategi Tercepat & Tepat (MISTER JO)</h3>
            <p className="text-sm leading-relaxed text-slate-800">
              {OSK_2026_PROBLEM_15_ANALYSIS.fastestStrategy}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OSK_2026_PROBLEM_15_ANALYSIS.keyEquations.map((eq, i) => (
            <MathBlock key={i} label={eq.label} latex={eq.latex} highlight={true} />
          ))}
        </div>
      </section>

      {/* 7-Stage Learning Path */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-700">Alur Belajar Adaptif</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              7 Tahap Penguasaan dari Pemula hingga Olimpiade
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('modul-teori')}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Pelajari di Modul Teori →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARNING_STAGES.map((st) => (
            <div
              key={st.stage}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-blue-700 font-mono">
                  {st.code} · Soal {st.recommendedProblemIds.join(', ')}
                </div>
                <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{st.goal}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900">Strategi: </span>
                {st.thinkingStrategy}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
