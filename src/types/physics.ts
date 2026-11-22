export type NavPage =
  | 'beranda'
  | 'peta-konsep'
  | 'modul-teori'
  | 'simulasi'
  | 'latihan'
  | 'pembahasan'
  | 'hasil';

export type DifficultyTier =
  | 'Fondasi Konsep'
  | 'Penerapan Konsep'
  | 'Analisis Menengah'
  | 'Analisis Kompleks'
  | 'Tantangan Olimpiade';

export interface FormulaHighlight {
  label: string;
  latex: string;
  spokenText: string;
}

export interface FBDForceVector {
  id: string;
  label: string;
  latexLabel: string;
  directionDeg: number; // angle in degrees in screen/diagram frame: 0=right, 90=up, 180=left, 270=down
  relativeMagnitude: number; // 0.3 to 1.2 for clean visual arrow scaling
  color: string;
  phase: 'all' | 'slide' | 'shot';
  description: string;
  componentX?: string;
  componentY?: string;
}

export interface FBDConfig {
  title: string;
  inclineDeg: number;
  directionMotion: 'down' | 'up';
  showAxes: boolean;
  showShotForces: boolean;
  bulletAngleDeg?: number; // relative to horizontal (0 = horizontal right, 180 = horizontal left)
  forces: FBDForceVector[];
  xComponentSummary: string;
  yComponentSummary: string;
}

export interface StimulusConfig {
  kind:
    | 'incline-cannon-shot'
    | 'vector-projection'
    | 'parallel-shot'
    | 'normal-impulse'
    | 'rough-incline'
    | 'uphill-shot'
    | 'finite-bullet-mass'
    | 'angled-shot'
    | 'pulse-force'
    | 'spring-incline'
    | 'rebound-incline';
  alphaDeg: number;
  directionMotion: 'down' | 'up';
  bulletAngleDeg?: number; // 0 = horizontal right, >0 = above horizontal, 180 = horizontal left
  showSpring?: boolean;
  showFriction?: boolean;
  showReboundArrow?: boolean;
  showPulseInset?: boolean;
  labels: {
    mass?: string;
    distance?: string;
    angle?: string;
    momentum?: string;
    extra?: string;
  };
}

export interface AnimationProofConfig {
  mode:
    | 'slide-only'
    | 'vector-split'
    | 'cannon-stop'
    | 'normal-spike'
    | 'rebound'
    | 'rough-stop'
    | 'uphill-stop'
    | 'spring-launch'
    | 'triangle-pulse';
  alphaDeg: number;
  M: number; // kg
  g: number; // m/s^2
  ell: number; // m
  v0?: number; // m/s initial speed (for uphill or post-spring)
  p: number; // Ns bullet momentum
  deltaTMs: number; // ms firing duration
  muK?: number;
  bulletAngleDeg?: number; // 0 horizontal right, 180 horizontal left, >0 elevation above horizontal
  springK?: number; // N/m
  springCompression?: number; // m
  directionMotion: 'down' | 'up';
  thrustShape?: 'constant' | 'triangle';
  whatIsObserved: string;
  physicsPrinciple: string;
  whyItHappens: string;
  mathematicalProofLatex: string;
}

export interface Solution14Steps {
  known: string[];
  asked: string;
  principleName: string;
  principleFormulas: FormulaHighlight[];
  physicalSituation: string;
  phenomenonVisualization: string;
  fbdNote: string;
  baseEquations: FormulaHighlight[];
  derivationSteps: Array<{
    title: string;
    explanation: string;
    latex?: string;
  }>;
  substitution: Array<{
    explanation: string;
    latex: string;
  }>;
  calculation: Array<{
    explanation: string;
    latex: string;
  }>;
  dimensionCheck: string;
  roundingRule: string;
  finalAnswerDisplay: string;
  physicalInterpretation: string;
}

export interface PracticeProblem {
  id: number;
  code: string;
  title: string;
  tier: DifficultyTier;
  tierIndex: 1 | 2 | 3 | 4 | 5;
  learningStageRef: number; // 1..7
  conceptFocus: string;
  questionText: string;
  unit: string;
  hintText: string;
  commonMistakeNote: string;
  correctValue: number;
  correctFormatted: string; // e.g., "6,3"
  tolerance: number;
  stimulus: StimulusConfig;
  fbd: FBDConfig;
  animation: AnimationProofConfig;
  solution: Solution14Steps;
  narratorQuestionScript: string;
  narratorFbdScript: string;
  narratorSolutionScript: string;
}

export interface AnswerValidationResult {
  isValidFormat: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
  errorType:
    | 'none'
    | 'empty'
    | 'used-dot-decimal'
    | 'not-one-decimal'
    | 'invalid-number'
    | 'wrong-sign'
    | 'wrong-value';
  feedbackTitle: string;
  feedbackDetail: string;
}

export interface ProblemAttemptState {
  questionId: number;
  lastInput: string;
  isSolved: boolean;
  attemptsCount: number;
  isSolutionOpened: boolean;
  lastValidation?: AnswerValidationResult;
}

export interface UserProgressState {
  attempts: Record<number, ProblemAttemptState>;
  completedTheorySections: string[];
  completedStages: number[];
  lastVisitedPage: NavPage;
}
