import { AlertCircle, CheckCircle2, HelpCircle, Send, Volume2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { SolutionDrawer } from '../components/SolutionDrawer';
import { StimulusDiagram } from '../components/StimulusDiagram';
import { PRACTICE_PROBLEMS } from '../data/problemsData';
import { DifficultyTier, ProblemAttemptState } from '../types/physics';
import { misterJoNarrator } from '../utils/narrator';

interface PracticeViewProps {
  attempts: Record<number, ProblemAttemptState>;
  onSubmitAnswer: (questionId: number, rawInput: string) => void;
  onToggleSolution: (questionId: number) => void;
  initialQuestionId?: number;
}

const TIERS: Array<'Semua' | DifficultyTier> = [
  'Semua',
  'Fondasi Konsep',
  'Penerapan Konsep',
  'Analisis Menengah',
  'Analisis Kompleks',
  'Tantangan Olimpiade'
];

export function PracticeView({
  attempts,
  onSubmitAnswer,
  onToggleSolution,
  initialQuestionId = 1
}: PracticeViewProps) {
  const [tierFilter, setTierFilter] = useState<'Semua' | DifficultyTier>('Semua');
  const [activeId, setActiveId] = useState<number>(initialQuestionId);
  const [inputValue, setInputValue] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  const filteredProblems =
    tierFilter === 'Semua'
      ? PRACTICE_PROBLEMS
      : PRACTICE_PROBLEMS.filter((p) => p.tier === tierFilter);

  const activeProblem =
    PRACTICE_PROBLEMS.find((p) => p.id === activeId) ?? PRACTICE_PROBLEMS[0];

  const attempt = attempts[activeProblem.id] ?? {
    questionId: activeProblem.id,
    lastInput: '',
    isSolved: false,
    attemptsCount: 0,
    isSolutionOpened: false
  };

  useEffect(() => {
    setInputValue(attempts[activeId]?.lastInput ?? '');
    setShowHint(false);
  }, [activeId, attempts]);

  useEffect(() => {
    if (initialQuestionId >= 1 && initialQuestionId <= 15) {
      setActiveId(initialQuestionId);
    }
  }, [initialQuestionId]);

  const handleTierChange = (tier: 'Semua' | DifficultyTier) => {
    setTierFilter(tier);
    const list =
      tier === 'Semua' ? PRACTICE_PROBLEMS : PRACTICE_PROBLEMS.filter((p) => p.tier === tier);
    if (list.length > 0 && !list.some((p) => p.id === activeId)) {
      setActiveId(list[0].id);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitAnswer(activeProblem.id, inputValue);
  };

  const handleSpeakQuestion = () => {
    misterJoNarrator.playSegments(`Soal ${activeProblem.id} (${activeProblem.code})`, [
      {
        id: `q-${activeProblem.id}`,
        label: `Naskah Soal ${activeProblem.id}`,
        text: activeProblem.narratorQuestionScript
      }
    ]);
  };

  const solvedTotal = Object.values(attempts).filter((a) => a.isSolved).length;
  const attemptedTotal = Object.values(attempts).filter((a) => a.attemptsCount > 0).length;

  return (
    <div className="space-y-6">
      {/* Header & Overall Progress */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-700">
            Latihan Isian Singkat · Format 1 Angka Desimal dengan Koma (contoh: 12,5)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            15 Soal Latihan Bertingkat OSK 2026
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <span>
            Dikerjakan:{' '}
            <strong className="font-mono tabular-nums text-slate-900">{attemptedTotal}/15</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Benar:{' '}
            <strong className="font-mono tabular-nums text-emerald-700">{solvedTotal}/15</strong>
          </span>
        </div>
      </div>

      {/* Tier Filter Bar */}
      <div className="flex flex-wrap gap-1.5">
        {TIERS.map((tier) => (
          <button
            key={tier}
            type="button"
            onClick={() => handleTierChange(tier)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              tierFilter === tier
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Number Selector Grid */}
      <div className="flex flex-wrap gap-2" role="navigation" aria-label="Pilih nomor soal latihan">
        {filteredProblems.map((p) => {
          const st = attempts[p.id];
          const isActive = p.id === activeProblem.id;
          const isSolved = st?.isSolved;
          const hasTried = (st?.attemptsCount ?? 0) > 0;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              aria-label={`Soal nomor ${p.id}: ${p.title}${isSolved ? ' (Benar)' : ''}`}
              className={`h-10 min-w-[44px] rounded-xl border px-3 text-xs font-bold font-mono tabular-nums transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-blue-800 bg-blue-700 text-white ring-2 ring-yellow-300'
                  : isSolved
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  : hasTried
                  ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-blue-400'
              }`}
            >
              {p.id}
              {isSolved ? ' ✓' : ''}
            </button>
          );
        })}
      </div>

      {/* Active Question Workspace */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-blue-700">
              Soal {activeProblem.id} dari 15 · {activeProblem.tier} · Tahap {activeProblem.learningStageRef}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{activeProblem.title}</h2>
            <p className="text-xs text-slate-500">Fokus Kompetensi: {activeProblem.conceptFocus}</p>
          </div>

          <button
            type="button"
            onClick={handleSpeakQuestion}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Dengarkan Soal
          </button>
        </div>

        {/* Question + Stimulus Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-[15.5px] leading-relaxed text-slate-800">
              {activeProblem.questionText}
            </p>

            {/* Hint Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {showHint ? 'Sembunyikan Petunjuk Berpikir' : 'Butuh Petunjuk Berpikir?'}
              </button>
              {showHint && (
                <div className="mt-2 rounded-xl border border-yellow-300 bg-yellow-50/80 p-3.5 text-xs leading-relaxed text-slate-800">
                  {activeProblem.hintText}
                </div>
              )}
            </div>

            {/* Numeric Answer Input Form */}
            <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <label
                htmlFor={`answer-input-${activeProblem.id}`}
                className="block text-xs font-bold text-slate-900"
              >
                Jawaban Numerik Akhir (wajib 1 angka desimal, gunakan tanda koma):
              </label>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center flex-1 min-w-[180px] rounded-xl border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 overflow-hidden">
                  <input
                    id={`answer-input-${activeProblem.id}`}
                    type="text"
                    inputMode="decimal"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="contoh: 32,4"
                    className="w-full px-3.5 py-2.5 text-base font-mono font-semibold text-slate-900 outline-none"
                  />
                  <span className="border-l border-slate-200 bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 whitespace-nowrap">
                    {activeProblem.unit}
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Periksa Jawaban
                </button>
              </div>

              <div className="text-[11px] text-slate-500">
                Ketentuan: gunakan tanda koma (,), bukan titik (.), dan tulis tepat satu digit di belakang koma (misal 9,0 atau -37,8).
              </div>
            </form>

            {/* Validation Feedback Banner */}
            {attempt.lastValidation && (
              <div
                role="status"
                className={`rounded-xl border p-4 text-sm space-y-1 ${
                  attempt.lastValidation.isCorrect
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-red-300 bg-red-50 text-red-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {attempt.lastValidation.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                  )}
                  <span>{attempt.lastValidation.feedbackTitle}</span>
                </div>
                <p className="text-xs leading-relaxed">{attempt.lastValidation.feedbackDetail}</p>
                {!attempt.lastValidation.isCorrect && (
                  <p className="text-xs font-semibold pt-1">
                    Silakan perbaiki jawabanmu dan klik Periksa Jawaban lagi, atau buka pembahasan di bawah.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <StimulusDiagram
              config={activeProblem.stimulus}
              title={`Stimulus Visual — ${activeProblem.code}`}
            />
          </div>
        </div>

        {/* Toggleable Solution Section — unlocks after first attempt so answer is never spoiled prematurely */}
        <div className="border-t border-slate-200 pt-4">
          {attempt.attemptsCount === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              Coba masukkan jawabanmu dan tekan <strong>Periksa Jawaban</strong> terlebih dahulu untuk membuka tombol <strong>LIHAT PEMBAHASAN</strong> (aturan belajar mandiri agar kunci jawaban tidak langsung terlihat).
            </div>
          ) : (
            <SolutionDrawer
              problem={activeProblem}
              isOpen={attempt.isSolutionOpened}
              onToggle={() => onToggleSolution(activeProblem.id)}
              canOpen={true}
            />
          )}
        </div>
      </section>
    </div>
  );
}
