import { Volume2 } from 'lucide-react';
import { useState } from 'react';
import { SolutionDrawer } from '../components/SolutionDrawer';
import { StimulusDiagram } from '../components/StimulusDiagram';
import { ORIGINAL_OSK_15_PROBLEM, PRACTICE_PROBLEMS } from '../data/problemsData';
import { misterJoNarrator } from '../utils/narrator';

export function DiscussionView() {
  const [selectedId, setSelectedId] = useState<number>(0); // 0 = OSK 2026 Soal 15 original
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({ 0: true });

  const allItems = [ORIGINAL_OSK_15_PROBLEM, ...PRACTICE_PROBLEMS];
  const current = allItems.find((p) => p.id === selectedId) ?? ORIGINAL_OSK_15_PROBLEM;

  const isOpen = openMap[current.id] ?? true;
  const toggleOpen = () =>
    setOpenMap((prev) => ({
      ...prev,
      [current.id]: !(prev[current.id] ?? true)
    }));

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 space-y-1">
        <div className="text-xs font-bold text-blue-700">
          Arsip Pembahasan Buku Teks · Soal 15 OSK 2026 + 15 Soal Pengembangan
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Pembahasan Interaktif 14 Langkah & Animasi Pembuktian
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Setiap pembahasan memuat identifikasi besaran, FBD interaktif, penurunan rumus KaTeX
          bertahap, pemeriksaan dimensi, animasi pembuktian fisika, serta narasi MISTER JO.
        </p>
      </div>

      {/* Selector Rail */}
      <div className="flex flex-wrap gap-2">
        {allItems.map((item) => {
          const active = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setOpenMap((prev) => ({ ...prev, [item.id]: true }));
              }}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                active
                  ? 'border-blue-800 bg-blue-700 text-white'
                  : item.id === 0
                  ? 'border-yellow-500 bg-yellow-300 text-slate-900 hover:bg-yellow-200'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-blue-400'
              }`}
            >
              {item.id === 0 ? 'OSK 2026 Soal 15 (Asli)' : `Soal ${item.id}`}
            </button>
          );
        })}
      </div>

      {/* Selected Problem Summary + Solution Drawer */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-blue-700">
              {current.code} · {current.tier}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{current.title}</h2>
          </div>
          <button
            type="button"
            onClick={() =>
              misterJoNarrator.playSegments(`Naskah ${current.code}`, [
                {
                  id: `disc-q-${current.id}`,
                  label: `Naskah ${current.code}`,
                  text: current.narratorQuestionScript
                }
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Dengarkan Soal
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <p className="lg:col-span-6 text-[15px] leading-relaxed text-slate-800">
            {current.questionText}
          </p>
          <div className="lg:col-span-6">
            <StimulusDiagram config={current.stimulus} title={`Stimulus ${current.code}`} />
          </div>
        </div>

        <SolutionDrawer problem={current} isOpen={isOpen} onToggle={toggleOpen} canOpen={true} />
      </div>
    </div>
  );
}
