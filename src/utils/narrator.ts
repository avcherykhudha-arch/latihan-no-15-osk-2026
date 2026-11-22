export interface NarratorSegment {
  id: string;
  label: string;
  text: string;
  highlightTarget?: string; // e.g., 'fbd-mg', 'fbd-normal', 'formula-impulse', 'step-8'
}

export type NarratorStatus = 'idle' | 'speaking' | 'paused';

export interface NarratorSnapshot {
  status: NarratorStatus;
  contextTitle: string;
  activeSegmentIndex: number;
  totalSegments: number;
  activeSegment: NarratorSegment | null;
  supported: boolean;
}

/**
 * Converts physics symbols into natural Indonesian spoken prose for MISTER JO.
 */
export function formatPhysicsSpeech(raw: string): string {
  return raw
    .replace(/∑F\s*=\s*ma/gi, 'Resultan seluruh gaya sama dengan massa benda dikalikan percepatan')
    .replace(/ΣF\s*=\s*ma/gi, 'Resultan seluruh gaya sama dengan massa benda dikalikan percepatan')
    .replace(/Δt/g, 'delta t, atau durasi waktu')
    .replace(/ΔP/g, 'perubahan momentum linear')
    .replace(/Δs/g, 'pergeseran jarak')
    .replace(/μ_k|μk/g, 'koefisien gesekan kinetik miu k')
    .replace(/sin\s*α/g, 'sinus sudut alfa')
    .replace(/cos\s*α/g, 'kosinus sudut alfa')
    .replace(/sin\s*37°/g, 'sinus tiga puluh tujuh derajat')
    .replace(/cos\s*37°/g, 'kosinus tiga puluh tujuh derajat')
    .replace(/sin\s*53°/g, 'sinus lima puluh tiga derajat')
    .replace(/cos\s*53°/g, 'kosinus lima puluh tiga derajat')
    .replace(/sin\s*30°/g, 'sinus tiga puluh derajat')
    .replace(/cos\s*30°/g, 'kosinus tiga puluh derajat')
    .replace(/m\/s²|m\/s\^2/g, 'meter per sekon kuadrat')
    .replace(/m\/s/g, 'meter per sekon')
    .replace(/kNs/g, 'kilonewton sekon')
    .replace(/Ns/g, 'newton sekon')
    .replace(/kN/g, 'kilonewton')
    .replace(/kJ/g, 'kilojoule')
    .replace(/ms/g, 'milisekon')
    .replace(/°/g, ' derajat')
    .replace(/√/g, 'akar kuadrat dari ')
    .replace(/±/g, 'plus minus')
    .replace(/≈/g, 'kira-kira sama dengan')
    .replace(/≤/g, 'lebih kecil atau sama dengan')
    .replace(/≥/g, 'lebih besar atau sama dengan')
    .replace(/≠/g, 'tidak sama dengan')
    .replace(/≪/g, 'jauh lebih kecil daripada')
    .replace(/≫/g, 'jauh lebih besar daripada')
    .replace(/⊥/g, 'tegak lurus bidang')
    .replace(/∥/g, 'sejajar bidang');
}

type Listener = (snap: NarratorSnapshot) => void;

class MisterJoNarratorController {
  private segments: NarratorSegment[] = [];
  private contextTitle = '';
  private activeIndex = -1;
  private status: NarratorStatus = 'idle';
  private listeners = new Set<Listener>();
  private sessionToken = 0;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getSnapshot(): NarratorSnapshot {
    return {
      status: this.status,
      contextTitle: this.contextTitle,
      activeSegmentIndex: this.activeIndex,
      totalSegments: this.segments.length,
      activeSegment:
        this.activeIndex >= 0 && this.activeIndex < this.segments.length
          ? this.segments[this.activeIndex]
          : null,
      supported: this.isSupported()
    };
  }

  private notify() {
    const snap = this.getSnapshot();
    this.listeners.forEach((cb) => cb(snap));
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    if (!this.isSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
    if (idVoices.length > 0) {
      const preferred = idVoices.find((v) =>
        /ardi|google bahasa|indonesian|male|damayanti/i.test(v.name)
      );
      return preferred ?? idVoices[0];
    }
    return voices[0] ?? null;
  }

  public playSegments(contextTitle: string, segments: NarratorSegment[]): void {
    if (segments.length === 0) return;
    this.stop();
    this.contextTitle = contextTitle;
    this.segments = segments;
    this.activeIndex = 0;
    this.status = 'speaking';
    this.sessionToken += 1;
    const token = this.sessionToken;
    this.notify();
    this.speakCurrent(token);
  }

  private speakCurrent(token: number): void {
    if (token !== this.sessionToken) return;
    if (this.activeIndex < 0 || this.activeIndex >= this.segments.length) {
      this.status = 'idle';
      this.activeIndex = -1;
      this.notify();
      return;
    }

    const segment = this.segments[this.activeIndex];
    this.notify();

    if (!this.isSupported()) {
      // Graceful non-TTS visual narration stepper fallback for headless/unsupported browsers
      setTimeout(() => {
        if (token !== this.sessionToken || this.status !== 'speaking') return;
        this.activeIndex += 1;
        this.speakCurrent(token);
      }, 2800);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(formatPhysicsSpeech(segment.text));
      utterance.lang = 'id-ID';
      utterance.rate = 0.96;
      utterance.pitch = 0.92;
      utterance.volume = 1.0;

      const voice = this.pickVoice();
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (token !== this.sessionToken || this.status !== 'speaking') return;
        this.activeIndex += 1;
        this.speakCurrent(token);
      };

      utterance.onerror = () => {
        if (token !== this.sessionToken) return;
        // Advance cleanly if browser TTS is muted/unavailable in container
        if (this.status === 'speaking') {
          this.activeIndex += 1;
          this.speakCurrent(token);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.status = 'idle';
      this.activeIndex = -1;
      this.notify();
    }
  }

  public pause(): void {
    if (this.status !== 'speaking') return;
    this.status = 'paused';
    if (this.isSupported()) {
      try {
        window.speechSynthesis.pause();
      } catch {
        // ignore
      }
    }
    this.notify();
  }

  public resume(): void {
    if (this.status !== 'paused') return;
    this.status = 'speaking';
    if (this.isSupported()) {
      try {
        window.speechSynthesis.resume();
      } catch {
        // ignore
      }
    }
    this.notify();
  }

  public stop(): void {
    this.sessionToken += 1;
    this.status = 'idle';
    this.activeIndex = -1;
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.notify();
  }

  public replay(): void {
    if (this.segments.length === 0) return;
    const savedTitle = this.contextTitle;
    const savedSegments = [...this.segments];
    this.playSegments(savedTitle, savedSegments);
  }
}

export const misterJoNarrator = new MisterJoNarratorController();
