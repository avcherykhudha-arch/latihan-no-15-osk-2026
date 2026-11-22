import { PracticeProblem } from '../types/physics';
import { PROBLEMS_PART_1 } from './problemsPart1';
import { PROBLEMS_PART_2 } from './problemsPart2';

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  ...PROBLEMS_PART_1,
  ...PROBLEMS_PART_2
];

export const ORIGINAL_OSK_15_PROBLEM: PracticeProblem = {
  id: 0,
  code: 'OSK-15',
  title: 'Soal Nomor 15 OSK Fisika SMA 2026 (Dokumen Sumber Asli)',
  tier: 'Analisis Kompleks',
  tierIndex: 4,
  learningStageRef: 4,
  conceptFocus: 'Teorema Impuls–Momentum Linear pada Bidang Miring Licin dengan Durasi Berhingga',
  questionText:
    'Sebuah meriam bermassa M = 0,8 ton mulai meluncur bebas menuruni bidang miring halus dengan sudut kemiringan α = 37° terhadap horizontal. Setelah meriam menempuh jarak ℓ = 8 m, sebuah tembakan dilepaskan, dan peluru meninggalkan meriam dalam arah horizontal dengan momentum p = 9890 Ns. Akibatnya, meriam berhenti. Dengan menganggap massa peluru dapat diabaikan dibandingkan massa meriam, durasi tembakan tersebut adalah ... milidetik. (Asumsi OSK eksplisit: g = 9,8 m/s² serta sin 37° = 0,6 dan cos 37° = 0,8).',
  unit: 'ms',
  hintText:
    'Proyeksikan seluruh vektor ke sumbu sejajar bidang miring (∥) agar gaya normal impulsif N tereliminasi (N∥ = 0). Gunakan (Mg sin 37°) Δt = p cos 37° − Mv.',
  commonMistakeNote:
    'Jangan memakai kekekalan momentum horizontal karena gaya normal N melonjak impulsif saat tembakan dan memiliki komponen horizontal N sin 37°.',
  correctValue: 32.4,
  correctFormatted: '32,4',
  tolerance: 0.1,
  stimulus: {
    kind: 'incline-cannon-shot',
    alphaDeg: 37,
    directionMotion: 'down',
    bulletAngleDeg: 0,
    labels: {
      mass: 'M = 0,8 ton',
      distance: 'ℓ = 8 m',
      angle: 'α = 37°',
      momentum: 'p = 9890 Ns'
    }
  },
  fbd: {
    title: 'FBD Soal 15 OSK 2026 Selama Penembakan Horizontal',
    inclineDeg: 37,
    directionMotion: 'down',
    showAxes: true,
    showShotForces: true,
    bulletAngleDeg: 0,
    forces: [
      {
        id: 'fbd-mg',
        label: 'Mg',
        latexLabel: 'M\\vec{g}',
        directionDeg: 270,
        relativeMagnitude: 0.85,
        color: '#1D4ED8',
        phase: 'all',
        description: 'Gaya berat meriam 7840 N berarah vertikal ke bawah (Mg sin 37° = 4704 N sejajar bidang).',
        componentX: 'Mg sin 37° = 4704 N',
        componentY: '-Mg cos 37° = -6272 N'
      },
      {
        id: 'fbd-normal',
        label: 'N(t) (Impulsif)',
        latexLabel: '\\vec{N}(t)',
        directionDeg: 53,
        relativeMagnitude: 1.2,
        color: '#059669',
        phase: 'shot',
        description: 'Gaya normal dari bidang licin melonjak ~189 kN untuk menahan komponen tegak lurus peluru. Komponen sejajar bidangnya NOL.'
      },
      {
        id: 'fbd-recoil',
        label: 'F_reaksi',
        latexLabel: '\\vec{F}_{\\text{reaksi}}',
        directionDeg: 180,
        relativeMagnitude: 1.0,
        color: '#DC2626',
        phase: 'shot',
        description: 'Gaya dorong balik peluru pada meriam (gaya internal bila sistem = meriam + peluru).'
      }
    ],
    xComponentSummary: '(Mg sin 37°) Δt = p cos 37° − Mv',
    yComponentSummary: '∫(N − Mg cos 37°) dt = p sin 37°'
  },
  animation: {
    mode: 'cannon-stop',
    alphaDeg: 37,
    M: 800,
    g: 9.8,
    ell: 8.0,
    p: 9890,
    deltaTMs: 32.4,
    directionMotion: 'down',
    whatIsObserved:
      'Meriam 800 kg meluncur 8 m menuruni bidang licin 37° hingga mencapai 9,70 m/s, lalu melepaskan peluru horizontal 9890 Ns selama 32,4 ms hingga tepat berhenti.',
    physicsPrinciple: 'Teorema Impuls–Momentum pada Sumbu Sejajar Bidang (Eliminasi Gaya Normal Impulsif)',
    whyItHappens:
      'Selama 32,4 ms penembakan, gravitasi menambah momentum sebesar 152,4 Ns ke bawah bidang sehingga peluru membawa komponen sejajar bidang 7912 Ns.',
    mathematicalProofLatex: '\\Delta t = \\frac{9890(0,8) - 800\\sqrt{2(9,8)(8)(0,6)}}{800(9,8)(0,6)} = \\frac{152,41}{4704} = 32,4\\text{ ms}'
  },
  solution: {
    known: [
      'M = 0,8 ton = 800 kg',
      'α = 37° (asumsi standar OSK: sin 37° = 0,6; cos 37° = 0,8)',
      'ℓ = 8 m',
      'p = 9890 Ns (horizontal)',
      'g = 9,8 m/s² (konsisten dengan Soal 7 pada naskah OSK 2026)',
      'm_peluru ≪ M, meriam berhenti (v_akhir = 0)'
    ],
    asked: 'Durasi tembakan Δt dalam satuan milidetik.',
    principleName: 'Kinematika Bidang Miring Licin & Teorema Impuls–Momentum Sejajar Bidang',
    principleFormulas: [
      {
        label: 'Laju Sebelum Tembakan',
        latex: 'v = \\sqrt{2 g \\ell \\sin\\alpha}',
        spokenText: 'Kelajuan meriam sebelum menembak sama dengan akar dua g el sinus alfa.'
      },
      {
        label: 'Teorema Impuls–Momentum Sumbu ∥',
        latex: '\\int_0^{\\Delta t} M g \\sin\\alpha\\,dt = p \\cos\\alpha - M v',
        spokenText: 'Integral gaya berat sejajar bidang selama delta t sama dengan p kosinus alfa dikurangi M v.'
      }
    ],
    physicalSituation:
      'Meriam meluncur bebas tanpa gesekan sepanjang 8 m dari keadaan diam, lalu melepaskan tembakan horizontal berdurasi Δt hingga berhenti.',
    phenomenonVisualization:
      'Saat peluru terdorong mendatar ke depan, gaya normal melonjak tajam agar meriam tidak menembus bidang miring, namun arahnya selalu tegak lurus permukaan.',
    fbdNote:
      'Sumbu sejajar bidang miring menghilangkan N sepenuhnya; bila memakai sumbu horizontal, muncul integral N sin 37° dt yang tidak diketahui.',
    baseEquations: [
      {
        label: 'Rumus Durasi Tembakan OSK 15',
        latex: '\\Delta t = \\frac{p \\cos\\alpha - M v}{M g \\sin\\alpha}',
        spokenText: 'Delta t sama dengan p kosinus alfa dikurangi M v, dibagi M g sinus alfa.'
      }
    ],
    derivationSteps: [
      {
        title: 'Langkah 1 — Menghitung Laju Meriam Sebelum Menembak',
        explanation: 'Meriam menempuh jarak ℓ = 8 m dengan percepatan a = g sin 37°:',
        latex: 'v = \\sqrt{2 \\times 9,8 \\times 8 \\times 0,6} = \\sqrt{94,08} \\approx 9,6995\\text{ m/s}'
      },
      {
        title: 'Langkah 2 — Menghitung Momentum Awal dan Proyeksi Peluru',
        explanation: 'Evaluasi momentum di sumbu sejajar bidang (arah turun = positif):',
        latex: 'P_{\\text{awal},\\parallel} = M v = 800 \\times 9,6995 = 7759,59\\text{ Ns}, \\qquad p_\\parallel = p \\cos 37^\\circ = 9890 \\times 0,8 = 7912,00\\text{ Ns}'
      }
    ],
    substitution: [
      {
        explanation: 'Substitusikan ke persamaan impuls-momentum sejajar bidang:',
        latex: '\\Delta t = \\frac{7912,00 - 7759,59}{800 \\times 9,8 \\times 0,6}'
      }
    ],
    calculation: [
      {
        explanation: 'Hitung Δt dalam sekon dan milidetik:',
        latex: '\\Delta t = \\frac{152,41}{4704} = 0,03240\\text{ s} = 32,4\\text{ ms}'
      }
    ],
    dimensionCheck: '152,41 Ns / 4704 N = 0,0324 s = 32,4 ms.',
    roundingRule: 'Dibulatkan satu angka desimal menjadi 32,4 ms (catatan sensitivitas: bila memakai kalkulator eksak sin/cos 37°, hasilnya ~27,0 ms; dalam OSK, 37° umumnya menggunakan segitiga 3-4-5).',
    finalAnswerDisplay: '32,4 ms',
    physicalInterpretation:
      'Meskipun tembakan berlangsung hanya 32,4 milidetik, gaya berat sejajar bidang (4704 N) menyumbangkan impuls 152,4 Ns yang tepat menjembatani momentum awal meriam (7759,6 Ns) dengan proyeksi momentum peluru (7912,0 Ns).'
  },
  narratorQuestionScript:
    'Inilah Soal Nomor lima belas OSK Fisika dua ribu dua puluh enam yang menjadi acuan utama kita. Meriam bermassa nol koma delapan ton meluncur bebas menuruni bidang miring halus tiga puluh tujuh derajat sejauh delapan meter, lalu menembakkan peluru horizontal bermomentum sembilan ribu delapan ratus sembilan puluh newton sekon hingga meriam berhenti. Ditanyakan durasi tembakan dalam milidetik.',
  narratorFbdScript:
    'Diagram benda bebas menunjukkan mengapa kita wajib memilih sumbu sejajar bidang miring. Gaya normal N melonjak impulsif saat tembakan, namun karena bidang halus, proyeksinya di sumbu sejajar bidang tetap nol.',
  narratorSolutionScript:
    'Dengan gravitasi sembilan koma delapan meter per sekon kuadrat dan segitiga tiga empat lima untuk sudut tiga puluh tujuh derajat, kelajuan meriam sebelum menembak adalah sembilan koma tujuh nol meter per sekon, memberi momentum tujuh ribu tujuh ratus lima puluh sembilan koma enam newton sekon. Proyeksi momentum peluru sejajar bidang adalah sembilan ribu delapan ratus sembilan puluh kali nol koma delapan sama dengan tujuh ribu sembilan ratus dua belas newton sekon. Selisih seratus lima puluh dua koma empat dibagi gaya berat sejajar bidang empat ribu tujuh ratus empat newton menghasilkan tepat tiga puluh dua koma empat milidetik.'
};
