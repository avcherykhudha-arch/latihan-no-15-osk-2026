import { Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { misterJoNarrator, NarratorSnapshot } from '../utils/narrator';

interface NarratorBarProps {
  compact?: boolean;
  className?: string;
}

export function NarratorBar({ compact = false, className = '' }: NarratorBarProps) {
  const [snap, setSnap] = useState<NarratorSnapshot>(() => misterJoNarrator.getSnapshot());

  useEffect(() => {
    return misterJoNarrator.subscribe(setSnap);
  }, []);

  if (snap.status === 'idle' && compact) {
    return null;
  }

  return (
    <div
      className={`rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-slate-900 ${className}`}
      role="region"
      aria-label="Kontrol Narator Suara MISTER JO"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-yellow-300">
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <span>Narator Fisika: MISTER JO</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600">
                {snap.status === 'speaking'
                  ? 'Sedang menjelaskan'
                  : snap.status === 'paused'
                  ? 'Dijeda'
                  : 'Siap membimbing'}
              </span>
            </div>
            <p className="truncate text-sm font-medium text-slate-800">
              {snap.activeSegment
                ? `${snap.activeSegment.label} (${snap.activeSegmentIndex + 1}/${snap.totalSegments})`
                : snap.contextTitle || 'Klik tombol Dengarkan pada materi, soal, FBD, atau pembahasan.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {snap.status === 'speaking' ? (
            <button
              type="button"
              onClick={() => misterJoNarrator.pause()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              Pause
            </button>
          ) : snap.status === 'paused' ? (
            <button
              type="button"
              onClick={() => misterJoNarrator.resume()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </button>
          ) : null}

          {snap.totalSegments > 0 && (
            <>
              <button
                type="button"
                onClick={() => misterJoNarrator.replay()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Ulangi
              </button>
              <button
                type="button"
                onClick={() => misterJoNarrator.stop()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors whitespace-nowrap shrink-0"
              >
                <Square className="h-3.5 w-3.5" aria-hidden="true" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      {snap.activeSegment && (
        <p className="mt-2.5 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs leading-relaxed text-slate-800">
          “{snap.activeSegment.text}”
        </p>
      )}
    </div>
  );
}
