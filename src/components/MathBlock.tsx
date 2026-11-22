import katex from 'katex';
import { useMemo } from 'react';

interface MathBlockProps {
  latex: string;
  displayMode?: boolean;
  label?: string;
  highlight?: boolean;
  isNarrated?: boolean;
  className?: string;
}

export function MathBlock({
  latex,
  displayMode = true,
  label,
  highlight = false,
  isNarrated = false,
  className = ''
}: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  if (!displayMode) {
    return (
      <span
        className={`inline-block align-middle ${isNarrated ? 'bg-yellow-200/80 px-1 rounded' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isNarrated
          ? 'border-yellow-500 bg-yellow-50 shadow-sm ring-2 ring-yellow-300/60'
          : highlight
          ? 'border-blue-200 bg-blue-50/60'
          : 'border-slate-200 bg-slate-50/70'
      } px-4 py-3 ${className}`}
    >
      {label && (
        <div className="mb-1 text-xs font-semibold tracking-wide text-blue-800">
          {label}
        </div>
      )}
      <div
        className="overflow-x-auto text-slate-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
