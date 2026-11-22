import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NarratorBar } from './components/NarratorBar';
import { PRACTICE_PROBLEMS } from './data/problemsData';
import { NavPage, UserProgressState } from './types/physics';
import { validateIndonesianNumericAnswer } from './utils/answerValidator';
import { misterJoNarrator } from './utils/narrator';
import { ConceptMapView } from './views/ConceptMapView';
import { DiscussionView } from './views/DiscussionView';
import { HomeView } from './views/HomeView';
import { PracticeView } from './views/PracticeView';
import { ProgressView } from './views/ProgressView';
import { SimulationView } from './views/SimulationView';
import { TheoryView } from './views/TheoryView';

const STORAGE_KEY = 'misterjo_osk2026_soal15_progress_v1';

const DEFAULT_PROGRESS: UserProgressState = {
  attempts: {},
  completedTheorySections: [],
  completedStages: [],
  lastVisitedPage: 'beranda'
};

const NAV_ITEMS: Array<{ id: NavPage; label: string }> = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'peta-konsep', label: 'Peta Konsep' },
  { id: 'modul-teori', label: 'Modul Teori' },
  { id: 'simulasi', label: 'Simulasi' },
  { id: 'latihan', label: '15 Soal' },
  { id: 'pembahasan', label: 'Pembahasan' },
  { id: 'hasil', label: 'Hasil Belajar' }
];

function loadSavedProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgressState>;
    return {
      attempts: parsed.attempts ?? {},
      completedTheorySections: Array.isArray(parsed.completedTheorySections)
        ? parsed.completedTheorySections
        : [],
      completedStages: Array.isArray(parsed.completedStages) ? parsed.completedStages : [],
      lastVisitedPage: parsed.lastVisitedPage ?? 'beranda'
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [progress, setProgress] = useState<UserProgressState>(() => loadSavedProgress());
  const [activePage, setActivePage] = useState<NavPage>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'latihan';
    }
    return 'beranda';
  });
  const [jumpProblemId, setJumpProblemId] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...progress, lastVisitedPage: activePage })
      );
    } catch {
      // ignore storage quota errors
    }
  }, [progress, activePage]);

  useEffect(() => {
    return () => {
      misterJoNarrator.stop();
    };
  }, []);

  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAnswer = (questionId: number, rawInput: string) => {
    const problem = PRACTICE_PROBLEMS.find((p) => p.id === questionId);
    if (!problem) return;

    const validation = validateIndonesianNumericAnswer(
      rawInput,
      problem.correctValue,
      problem.tolerance,
      problem.commonMistakeNote
    );

    setProgress((prev) => {
      const existing = prev.attempts[questionId];
      return {
        ...prev,
        attempts: {
          ...prev.attempts,
          [questionId]: {
            questionId,
            lastInput: rawInput.trim(),
            isSolved: Boolean(existing?.isSolved || validation.isCorrect),
            attemptsCount: (existing?.attemptsCount ?? 0) + 1,
            isSolutionOpened: existing?.isSolutionOpened ?? false,
            lastValidation: validation
          }
        }
      };
    });
  };

  const handleToggleSolution = (questionId: number) => {
    setProgress((prev) => {
      const existing = prev.attempts[questionId];
      if (!existing) return prev;
      return {
        ...prev,
        attempts: {
          ...prev.attempts,
          [questionId]: {
            ...existing,
            isSolutionOpened: !existing.isSolutionOpened
          }
        }
      };
    });
  };

  const handleToggleTheorySection = (sectionId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTheorySections.includes(sectionId);
      const next = exists
        ? prev.completedTheorySections.filter((id) => id !== sectionId)
        : [...prev.completedTheorySections, sectionId];
      return { ...prev, completedTheorySections: next };
    });
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleJumpToProblem = (problemId: number) => {
    setJumpProblemId(problemId);
    handleNavigate('latihan');
  };

  const solvedCount = Object.values(progress.attempts).filter((a) => a.isSolved).length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top Bar Contract: Zone 1 Brand | Zone 2 Concise Nav Links | Zone 3 Primary Action */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('beranda')}
            className="text-left text-base sm:text-lg font-extrabold tracking-tight text-blue-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            MISTER JO <span className="text-yellow-500">OSK 2026</span>
          </button>

          {/* Zone 2: Single-line text navigation links */}
          <nav
            className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
            aria-label="Navigasi utama"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-yellow-400 text-blue-800 font-bold'
                      : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('latihan')}
              className="hidden sm:inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              Mulai Latihan
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 grid grid-cols-2 gap-2"
            aria-label="Navigasi seluler"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 py-8 space-y-6">
        <NarratorBar compact={true} />

        {activePage === 'beranda' && (
          <HomeView onNavigate={handleNavigate} solvedCount={solvedCount} />
        )}
        {activePage === 'peta-konsep' && <ConceptMapView onNavigate={handleNavigate} />}
        {activePage === 'modul-teori' && (
          <TheoryView
            completedSections={progress.completedTheorySections}
            onToggleSectionComplete={handleToggleTheorySection}
            onNavigate={handleNavigate}
          />
        )}
        {activePage === 'simulasi' && <SimulationView />}
        {activePage === 'latihan' && (
          <PracticeView
            attempts={progress.attempts}
            onSubmitAnswer={handleSubmitAnswer}
            onToggleSolution={handleToggleSolution}
            initialQuestionId={jumpProblemId}
          />
        )}
        {activePage === 'pembahasan' && <DiscussionView />}
        {activePage === 'hasil' && (
          <ProgressView
            attempts={progress.attempts}
            completedTheorySections={progress.completedTheorySections}
            onResetProgress={handleResetProgress}
            onJumpToProblem={handleJumpToProblem}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/70 py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <strong className="text-slate-900">MISTER JO</strong> — Platform Pembelajaran Olimpiade
            Sains Fisika Tingkat Kota · Fokus Soal Nomor 15 OSK 2026
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('modul-teori')}
              className="hover:text-blue-700 font-medium"
            >
              Modul Teori
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('simulasi')}
              className="hover:text-blue-700 font-medium"
            >
              Simulasi
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('latihan')}
              className="hover:text-blue-700 font-medium"
            >
              15 Soal Latihan
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('hasil')}
              className="hover:text-blue-700 font-medium"
            >
              Hasil Belajar
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
