import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { PRACTICE_PROBLEMS } from '../data/problemsData';
import { LEARNING_STAGES, THEORY_SECTIONS } from '../data/theoryData';
import { DifficultyTier, NavPage, ProblemAttemptState } from '../types/physics';

interface ProgressViewProps {
  attempts: Record<number, ProblemAttemptState>;
  completedTheorySections: string[];
  onResetProgress: () => void;
  onJumpToProblem: (problemId: number) => void;
  onNavigate: (page: NavPage) => void;
}

const TIERS: DifficultyTier[] = [
  'Fondasi Konsep',
  'Penerapan Konsep',
  'Analisis Menengah',
  'Analisis Kompleks',
  'Tantangan Olimpiade'
];

export function ProgressView({
  attempts,
  completedTheorySections,
  onResetProgress,
  onJumpToProblem,
  onNavigate
}: ProgressViewProps) {
  const totalProblems = PRACTICE_PROBLEMS.length;
  const solvedList = PRACTICE_PROBLEMS.filter((p) => attempts[p.id]?.isSolved);
  const attemptedList = PRACTICE_PROBLEMS.filter(
    (p) => (attempts[p.id]?.attemptsCount ?? 0) > 0
  );
  const scorePercent = Math.round((solvedList.length / totalProblems) * 100);
  const theoryPercent = Math.round(
    (completedTheorySections.length / THEORY_SECTIONS.length) * 100
  );

  const masteryLabel =
    scorePercent >= 85
      ? 'Siap Juara OSK — Penguasaan Penuh'
      : scorePercent >= 60
      ? 'Analisis Kuat — Teruskan ke Tantangan Olimpiade'
      : scorePercent >= 30
      ? 'Fondasi Terbentuk — Perdalam Soal Menengah'
      : 'Tahap Awal — Pelajari Modul Teori & Mulai dari Soal 1';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-700">
            Rekapitulasi Tersimpan Otomatis di Browser (localStorage)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hasil Belajar & Evaluasi Kemampuan
          </h1>
        </div>

        <button
          type="button"
          onClick={onResetProgress}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset Progres Latihan
        </button>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
          <div className="text-xs font-semibold text-blue-900">Skor Penguasaan Soal</div>
          <div className="mt-1 text-3xl font-extrabold text-blue-950 font-mono tabular-nums">
            {scorePercent}%
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {solvedList.length} dari {totalProblems} soal benar
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold text-slate-600">Soal Sudah Dikerjakan</div>
          <div className="mt-1 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {attemptedList.length}/{totalProblems}
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {totalProblems - attemptedList.length} soal belum dicoba
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold text-slate-600">Progres Modul Teori</div>
          <div className="mt-1 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {theoryPercent}%
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {completedTheorySections.length} dari {THEORY_SECTIONS.length} bab selesai
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-300 bg-yellow-50/80 p-5">
          <div className="text-xs font-semibold text-slate-700">Evaluasi MISTER JO</div>
          <div className="mt-1 text-sm font-bold text-slate-900 leading-snug">
            {masteryLabel}
          </div>
        </div>
      </div>

      {/* Mastery per Difficulty Tier */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Penguasaan Konsep Berdasarkan Tingkat Kesulitan</h2>
        <div className="space-y-3">
          {TIERS.map((tier) => {
            const list = PRACTICE_PROBLEMS.filter((p) => p.tier === tier);
            const solved = list.filter((p) => attempts[p.id]?.isSolved).length;
            const pct = Math.round((solved / list.length) * 100);
            return (
              <div key={tier} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{tier}</span>
                  <span className="font-mono tabular-nums text-blue-800">
                    {solved}/{list.length} ({pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-700 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7-Stage Mastery Check */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">Progres 7 Tahap Pemula hingga Ahli</h2>
          <button
            type="button"
            onClick={() => onNavigate('modul-teori')}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Buka Modul Teori →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEARNING_STAGES.map((st) => {
            const stageProblemsSolved = st.recommendedProblemIds.every(
              (pid) => attempts[pid]?.isSolved
            );
            return (
              <div
                key={st.stage}
                className={`rounded-xl border p-4 space-y-1 ${
                  stageProblemsSolved
                    ? 'border-emerald-300 bg-emerald-50/60'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-blue-800 font-mono">{st.code}</span>
                  <span className={stageProblemsSolved ? 'text-emerald-700' : 'text-slate-500'}>
                    {stageProblemsSolved ? 'Tuntas ✓' : 'Dalam Progres'}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">{st.title}</div>
                <div className="text-xs text-slate-600">
                  Soal acuan: {st.recommendedProblemIds.join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full List of 15 Questions Status */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Daftar Status 15 Soal Latihan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-600">
                <th className="py-2.5 pr-3">No</th>
                <th className="py-2.5 pr-3">Judul & Fokus Konsep</th>
                <th className="py-2.5 pr-3">Tingkat</th>
                <th className="py-2.5 pr-3">Jawaban Terakhir</th>
                <th className="py-2.5 pr-3">Status</th>
                <th className="py-2.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRACTICE_PROBLEMS.map((p) => {
                const st = attempts[p.id];
                const isSolved = st?.isSolved ?? false;
                const tried = (st?.attemptsCount ?? 0) > 0;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="py-3 pr-3 font-mono font-bold tabular-nums text-slate-900">
                      {p.id}
                    </td>
                    <td className="py-3 pr-3">
                      <div className="font-semibold text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500">{p.conceptFocus}</div>
                    </td>
                    <td className="py-3 pr-3 text-xs text-slate-700 whitespace-nowrap">
                      {p.tier}
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs tabular-nums text-slate-700">
                      {st?.lastInput ? `${st.lastInput} ${p.unit}` : '—'}
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap text-xs font-semibold">
                      {isSolved ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          Benar
                        </span>
                      ) : tried ? (
                        <span className="inline-flex items-center gap-1 text-red-700">
                          <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          Perlu Coba Lagi
                        </span>
                      ) : (
                        <span className="text-slate-500">Belum Dikerjakan</span>
                      )}
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onJumpToProblem(p.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                      >
                        {isSolved ? 'Tinjau' : 'Kerjakan'}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
