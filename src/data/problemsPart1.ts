import { PracticeProblem } from '../types/physics';

export const PROBLEMS_PART_1: PracticeProblem[] = [
  {
    id: 1,
    code: 'LAT-01',
    title: 'Momentum Meriam Sebelum Menembak di Bidang Licin',
    tier: 'Fondasi Konsep',
    tierIndex: 1,
    learningStageRef: 1,
    conceptFocus: 'Kinematika GLBB bidang miring & momentum linear awal',
    questionText:
      'Sebuah meriam beroda bermassa M = 450 kg dilepaskan dari keadaan diam di puncak sebuah bidang miring licin yang membentuk sudut kemiringan α = 30° terhadap horizontal. Percepatan gravitasi g = 9,8 m/s². Setelah meriam meluncur sejauh ℓ = 20,0 m menyusuri bidang miring tepat sebelum melepaskan tembakan, tentukan besar momentum linear meriam saat itu (dalam satuan kNs, satu angka desimal).',
    unit: 'kNs',
    hintText:
      'Hitung kelajuan v terlebih dahulu menggunakan GLBB pada bidang miring licin (a = g sin α) atau kekekalan energi mekanik, lalu kalikan dengan massa M dan konversikan Ns ke kNs.',
    commonMistakeNote:
      'Pastikan kamu menyertakan faktor sin 30° = 0,5 saat menghitung percepatan atau ketinggian jatuh vertikal h = ℓ sin α, serta membagi hasil akhir (Ns) dengan 1000 untuk memperoleh kNs.',
    correctValue: 6.3,
    correctFormatted: '6,3',
    tolerance: 0.05,
    stimulus: {
      kind: 'incline-cannon-shot',
      alphaDeg: 30,
      directionMotion: 'down',
      labels: {
        mass: 'M = 450 kg',
        distance: 'ℓ = 20,0 m',
        angle: 'α = 30°',
        extra: 'Licin (μ = 0)'
      }
    },
    fbd: {
      title: 'FBD Meriam Saat Meluncur Bebas (Sebelum Tembakan)',
      inclineDeg: 30,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: false,
      forces: [
        {
          id: 'fbd-mg',
          label: 'W = Mg',
          latexLabel: 'M\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.9,
          color: '#1D4ED8',
          phase: 'slide',
          description: 'Gaya berat meriam berarah vertikal ke bawah menuju pusat bumi.',
          componentX: 'Mg sin α (menuruni bidang)',
          componentY: '-Mg cos α (menekan bidang)'
        },
        {
          id: 'fbd-normal',
          label: 'N',
          latexLabel: '\\vec{N}',
          directionDeg: 60,
          relativeMagnitude: 0.78,
          color: '#059669',
          phase: 'slide',
          description: 'Gaya normal dari bidang miring licin berarah tegak lurus permukaan (N = Mg cos 30°).'
        }
      ],
      xComponentSummary: '∑Fx′ = Mg sin 30° = M a',
      yComponentSummary: '∑Fy′ = N − Mg cos 30° = 0'
    },
    animation: {
      mode: 'slide-only',
      alphaDeg: 30,
      M: 450,
      g: 9.8,
      ell: 20.0,
      p: 0,
      deltaTMs: 10,
      directionMotion: 'down',
      whatIsObserved:
        'Meriam beroda bermassa 450 kg bergerak dipercepat beraturan menuruni bidang miring licin 30° sejauh 20,0 m.',
      physicsPrinciple: 'Hukum II Newton pada Bidang Miring & Kekekalan Energi Mekanik',
      whyItHappens:
        'Komponen gaya berat sejajar bidang (Mg sin 30°) tidak diimbangi gesekan, sehingga menghasilkan percepatan konstan a = 4,9 m/s².',
      mathematicalProofLatex: 'v = \\sqrt{2 g \\ell \\sin 30^\\circ} = 14,0\\text{ m/s} \\implies P = M v = 6,3\\text{ kNs}'
    },
    solution: {
      known: ['M = 450 kg', 'α = 30° (sin 30° = 0,5)', 'ℓ = 20,0 m', 'v₀ = 0 m/s', 'g = 9,8 m/s²'],
      asked: 'Besar momentum linear meriam tepat sebelum menembak (P dalam kNs).',
      principleName: 'Hukum II Newton & Kinematika GLBB (atau Kekekalan Energi Mekanik)',
      principleFormulas: [
        {
          label: 'Hukum II Newton Sejajar Bidang',
          latex: '\\sum F_\\parallel = M a = M g \\sin\\alpha',
          spokenText: 'Resultan gaya sejajar bidang sama dengan M kali a sama dengan M g sinus alfa.'
        },
        {
          label: 'Momentum Linear',
          latex: 'P = M v',
          spokenText: 'Momentum linear P sama dengan massa M dikali kelajuan v.'
        }
      ],
      physicalSituation:
        'Meriam dilepaskan dari diam pada permukaan miring tanpa gesekan. Selama menempuh jarak ℓ = 20,0 m, meriam turun secara vertikal sejauh h = ℓ sin 30°.',
      phenomenonVisualization:
        'Energi potensial gravitasi meriam berkonversi sempurna menjadi energi kinetik translasi menuruni bidang miring.',
      fbdNote:
        'Hanya dua gaya bekerja: berat Mg vertikal ke bawah dan gaya normal N tegak lurus bidang. Komponen berat sejajar bidang Mg sin 30° berperan sebagai gaya penggerak tunggal.',
      baseEquations: [
        {
          label: 'Persamaan Kelajuan GLBB',
          latex: 'v^2 = v_0^2 + 2 a \\ell = 2 (g \\sin\\alpha) \\ell',
          spokenText: 'Kuadrat kelajuan v sama dengan dua dikali g sinus alfa dikali el.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menentukan Percepatan Sepanjang Bidang',
          explanation: 'Proyeksikan gaya berat ke sumbu sejajar bidang miring:',
          latex: 'a = \\frac{M g \\sin 30^\\circ}{M} = g \\sin 30^\\circ'
        },
        {
          title: 'Menghubungkan Percepatan dengan Jarak Tempuh',
          explanation: 'Substitusikan a ke persamaan GLBB dari keadaan diam (v₀ = 0):',
          latex: 'v = \\sqrt{2 g \\ell \\sin 30^\\circ}'
        },
        {
          title: 'Merumuskan Momentum Linear',
          explanation: 'Kalikan kelajuan sesaat di jarak ℓ dengan massa meriam M:',
          latex: 'P = M \\sqrt{2 g \\ell \\sin 30^\\circ}'
        }
      ],
      substitution: [
        {
          explanation: 'Masukkan nilai g = 9,8 m/s², ℓ = 20,0 m, dan sin 30° = 0,5:',
          latex: 'v = \\sqrt{2 \\times 9,8 \\times 20,0 \\times 0,5} = \\sqrt{196}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung kelajuan meriam sebelum menembak:',
          latex: 'v = 14,0\\text{ m/s}'
        },
        {
          explanation: 'Hitung momentum dalam Ns dan konversikan ke kNs:',
          latex: 'P = 450\\text{ kg} \\times 14,0\\text{ m/s} = 6300\\text{ Ns} = 6,3\\text{ kNs}'
        }
      ],
      dimensionCheck: '[M]·[L·T⁻¹] = kg·m/s = Ns; dibagi 10³ menghasilkan kNs.',
      roundingRule: 'Hasil 6,3 sudah tepat satu angka di belakang koma tanpa pembulatan paksa.',
      finalAnswerDisplay: '6,3 kNs',
      physicalInterpretation:
        'Momentum sebesar 6,3 kNs ke arah bawah bidang inilah yang harus ditahan atau dibuang ketika tembakan dilepaskan pada tahap berikutnya.'
    },
    narratorQuestionScript:
      'Soal nomor satu, tingkat fondasi konsep. Sebuah meriam bermassa empat ratus lima puluh kilogram dilepas dari diam pada bidang miring licin bersudut tiga puluh derajat. Setelah meluncur dua puluh koma nol meter dengan gravitasi sembilan koma delapan meter per sekon kuadrat, tentukan besar momentum linearnya dalam kilonewton sekon.',
    narratorFbdScript:
      'Pada diagram benda bebas sebelum menembak, bekerja dua gaya: gaya berat M g berarah vertikal ke bawah dengan komponen sejajar bidang M g sinus tiga puluh derajat, dan gaya normal N tegak lurus bidang yang mengimbangi M g kosinus tiga puluh derajat.',
    narratorSolutionScript:
      'Mari kita selesaikan soal satu. Pertama hitung percepatan menuruni bidang, a sama dengan g sinus tiga puluh derajat, yaitu empat koma sembilan meter per sekon kuadrat. Menggunakan persamaan v kuadrat sama dengan dua a el, diperoleh akar seratus sembilan puluh enam, yaitu tepat empat belas koma nol meter per sekon. Kalikan dengan massa empat ratus lima puluh kilogram, hasilnya enam ribu tiga ratus newton sekon, atau enam koma tiga kilonewton sekon.'
  },
  {
    id: 2,
    code: 'LAT-02',
    title: 'Dekomposisi Vektor Momentum Peluru pada Sumbu Miring',
    tier: 'Fondasi Konsep',
    tierIndex: 1,
    learningStageRef: 2,
    conceptFocus: 'Proyeksi vektor momentum horizontal ke sumbu ∥ dan ⊥ bidang miring',
    questionText:
      'Sebuah meriam berada di atas bidang miring dengan sudut kemiringan α = 37° terhadap bidang datar (gunakan sin 37° = 0,6 dan cos 37° = 0,8). Meriam menembakkan peluru berkecepatan tinggi secara mendatar (horizontal) ke kanan dengan besar momentum p = 8500 Ns. Berapakah besar komponen momentum peluru yang tegak lurus terhadap permukaan bidang miring (dalam satuan kNs, satu angka desimal)?',
    unit: 'kNs',
    hintText:
      'Gambarkan garis horizontal (arah peluru) dan garis permukaan bidang miring yang membentuk sudut α = 37°. Sudut antara vektor p dan sumbu sejajar bidang adalah 37°, sehingga komponen tegak lurus bidang menggunakan sin 37°.',
    commonMistakeNote:
      'Hati-hati jangan menukar sin 37° dan cos 37°! Komponen yang sejajar bidang memakai cos 37°, sedangkan komponen yang tegak lurus menjauhi bidang memakai sin 37°.',
    correctValue: 5.1,
    correctFormatted: '5,1',
    tolerance: 0.05,
    stimulus: {
      kind: 'vector-projection',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        angle: 'α = 37°',
        momentum: 'p = 8500 Ns (horizontal)',
        extra: 'Cari komponen p⊥'
      }
    },
    fbd: {
      title: 'Diagram Proyeksi Vektor Momentum Peluru & Reaksi Bidang',
      inclineDeg: 37,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: true,
      bulletAngleDeg: 0,
      forces: [
        {
          id: 'fbd-pvec',
          label: 'p (peluru)',
          latexLabel: '\\vec{p}',
          directionDeg: 0,
          relativeMagnitude: 1.0,
          color: '#EAB308',
          phase: 'shot',
          description: 'Momentum peluru keluar mendatar ke kanan sebesar 8500 Ns.',
          componentX: 'p cos 37° (sejajar turun bidang)',
          componentY: 'p sin 37° (tegak lurus menjauhi bidang)'
        },
        {
          id: 'fbd-recoil',
          label: 'F_reaksi',
          latexLabel: '\\vec{F}_{\\text{reaksi}}',
          directionDeg: 180,
          relativeMagnitude: 0.9,
          color: '#DC2626',
          phase: 'shot',
          description: 'Gaya dorong balik pada meriam berarah horizontal ke kiri (menekan meriam masuk ke bidang).'
        }
      ],
      xComponentSummary: 'p∥ = p cos 37°',
      yComponentSummary: 'p⊥ = p sin 37°'
    },
    animation: {
      mode: 'vector-split',
      alphaDeg: 37,
      M: 500,
      g: 9.8,
      ell: 4,
      p: 8500,
      deltaTMs: 40,
      directionMotion: 'down',
      whatIsObserved:
        'Vektor momentum horizontal p diuraikan menjadi komponen sejajar bidang miring (p cos 37°) dan tegak lurus bidang (p sin 37°).',
      physicsPrinciple: 'Geometri Sudut & Dekomposisi Vektor Orthonormal',
      whyItHappens:
        'Permukaan bidang miring membentuk sudut 37° terhadap horizontal, sehingga arah keluar peluru menjauhi bidang miring ke atas dengan sudut yang sama.',
      mathematicalProofLatex: 'p_\\perp = p \\sin 37^\\circ = 8500 \\times 0,6 = 5100\\text{ Ns} = 5,1\\text{ kNs}'
    },
    solution: {
      known: ['p = 8500 Ns (arah horizontal)', 'α = 37°', 'sin 37° = 0,6', 'cos 37° = 0,8'],
      asked: 'Besar komponen momentum peluru yang tegak lurus bidang miring (p⊥ dalam kNs).',
      principleName: 'Proyeksi Vektor pada Kerangka Koordinat Miring',
      principleFormulas: [
        {
          label: 'Komponen Tegak Lurus Bidang',
          latex: 'p_\\perp = p \\sin\\alpha',
          spokenText: 'Komponen momentum tegak lurus bidang p tegak lurus sama dengan p dikali sinus alfa.'
        }
      ],
      physicalSituation:
        'Peluru bergerak lurus mendatar ke kanan. Karena bidang miring menurun sebesar 37° terhadap garis mendatar, arah peluru miring ke atas menjauhi permukaan bidang sebesar 37°.',
      phenomenonVisualization:
        'Komponen p⊥ inilah yang menyebabkan reaksi mendorong meriam masuk ke permukaan bidang dan memicu lonjakan gaya normal N(t).',
      fbdNote:
        'Sumbu x′ sejajar turun bidang (sudut -37°), sumbu y′ tegak lurus keluar bidang (sudut +53°). Sudut antara vektor p (0°) dan sumbu y′ adalah 90° - 37° = 53°.',
      baseEquations: [
        {
          label: 'Proyeksi pada Sumbu y′ (⊥)',
          latex: 'p_\\perp = \\vec{p} \\cdot \\hat{u}_\\perp = p \\cos(90^\\circ - \\alpha) = p \\sin\\alpha',
          spokenText: 'p tegak lurus sama dengan p kosinus sembilan puluh dikurangi alfa sama dengan p sinus alfa.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menentukan Sudut terhadap Permukaan Bidang',
          explanation: 'Garis horizontal dan garis permukaan bidang miring berpotongan membentuk sudut α = 37°.',
          latex: '\\theta_{\\text{bidang}} = \\alpha = 37^\\circ'
        },
        {
          title: 'Memilih Sisi Depan Segitiga Proyeksi',
          explanation: 'Komponen tegak lurus bidang berada di sisi depan sudut α terhadap garis bidang:',
          latex: 'p_\\perp = p \\sin 37^\\circ'
        }
      ],
      substitution: [
        {
          explanation: 'Substitusikan p = 8500 Ns dan sin 37° = 0,6:',
          latex: 'p_\\perp = 8500 \\times 0,6'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung nilai dalam Ns lalu ubah ke kNs:',
          latex: 'p_\\perp = 5100\\text{ Ns} = 5,1\\text{ kNs}'
        }
      ],
      dimensionCheck: 'Satuan tetap satuan momentum [M][L][T⁻¹] = Ns, dibagi 1000 menjadi kNs.',
      roundingRule: 'Hasil tepat 5,1 kNs dengan satu angka desimal.',
      finalAnswerDisplay: '5,1 kNs',
      physicalInterpretation:
        'Sebesar 5,1 kNs momentum ditransfer ke arah tegak lurus menjauhi bidang oleh gaya dorong meriam, sehingga bidang miring harus memberi impuls gaya normal tambahan sebesar 5,1 kNs ke atas-tegak-lurus bidang!'
    },
    narratorQuestionScript:
      'Soal nomor dua, fondasi proyeksi vektor. Sebuah meriam di atas bidang miring tiga puluh tujuh derajat menembakkan peluru secara horizontal ke kanan dengan momentum delapan ribu lima ratus newton sekon. Tentukan komponen momentum peluru yang tegak lurus permukaan bidang miring dalam kilonewton sekon.',
    narratorFbdScript:
      'Perhatikan diagram proyeksi vektor. Vektor p berarah horizontal ke kanan, membentuk sudut tiga puluh tujuh derajat di atas garis bidang miring. Proyeksi ke arah sejajar bidang menggunakan kosinus tiga puluh tujuh derajat, sedangkan proyeksi tegak lurus bidang menggunakan sinus tiga puluh tujuh derajat.',
    narratorSolutionScript:
      'Karena arah horizontal membentuk sudut tiga puluh tujuh derajat terhadap permukaan bidang miring, komponen momentum peluru yang tegak lurus bidang adalah p dikali sinus tiga puluh tujuh derajat. Delapan ribu lima ratus dikali nol koma enam sama dengan lima ribu seratus newton sekon, atau lima koma satu kilonewton sekon.'
  },
  {
    id: 3,
    code: 'LAT-03',
    title: 'Peran Impuls Gravitasi Selama Tembakan Sejajar Bidang',
    tier: 'Fondasi Konsep',
    tierIndex: 1,
    learningStageRef: 3,
    conceptFocus: 'Teorema Impuls-Momentum satu sumbu (sejajar bidang miring) dengan Δt berhingga',
    questionText:
      'Sebuah troli peluncur bermassa M = 200 kg meluncur menuruni bidang miring licin bersudut α = 30° (g = 9,8 m/s²). Tepat saat lajunya v = 8,0 m/s, sebuah proyektil bermassa sangat kecil ditembakkan sejajar bidang miring ke arah bawah dengan momentum p = 1644,1 Ns sehingga troli tepat berhenti. Berapa durasi penembakan Δt yang dibutuhkan agar impuls gravitasi melengkapi selisih momentum tersebut (dalam satuan milidetik, satu angka desimal)?',
    unit: 'ms',
    hintText:
      'Hitung momentum awal troli Mv, bandingkan dengan momentum proyektil p. Selisih (p - Mv) dipasok oleh impuls gaya berat sejajar bidang (Mg sin 30°) · Δt.',
    commonMistakeNote:
      'Jangan lupa mengonversi jawaban akhir dari sekon (s) ke milidetik (ms) dengan mengalikan 1000.',
    correctValue: 45.0,
    correctFormatted: '45,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'parallel-shot',
      alphaDeg: 30,
      directionMotion: 'down',
      bulletAngleDeg: -30, // parallel to incline in world frame
      labels: {
        mass: 'M = 200 kg',
        angle: 'α = 30°',
        momentum: 'p = 1644,1 Ns (∥)',
        extra: 'v = 8,0 m/s → berhenti'
      }
    },
    fbd: {
      title: 'FBD Troli + Proyektil Saat Tembakan Sejajar Bidang',
      inclineDeg: 30,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: true,
      forces: [
        {
          id: 'fbd-mg',
          label: 'Mg',
          latexLabel: 'M\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.85,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Gaya berat total sistem (proyektil bermassa diabaikan). Komponen sejajar bidang Mg sin 30° terus memberi impuls selama Δt.',
          componentX: 'Mg sin 30° = 980 N',
          componentY: '-Mg cos 30°'
        },
        {
          id: 'fbd-normal',
          label: 'N',
          latexLabel: '\\vec{N}',
          directionDeg: 60,
          relativeMagnitude: 0.75,
          color: '#059669',
          phase: 'all',
          description: 'Karena tembakan sejajar bidang (⊥ terhadap N), tidak ada lonjakan N di kasus khusus ini dan N∥ = 0.'
        }
      ],
      xComponentSummary: 'I_eks,∥ = (Mg sin 30°) Δt = p − Mv',
      yComponentSummary: 'N = Mg cos 30°'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 30,
      M: 200,
      g: 9.8,
      ell: 6.53,
      v0: 0,
      p: 1644.1,
      deltaTMs: 45.0,
      bulletAngleDeg: -30,
      directionMotion: 'down',
      whatIsObserved:
        'Troli 200 kg meluncur hingga laju 8,0 m/s (momentum 1600 Ns), lalu menembakkan proyektil sejajar bidang sebesar 1644,1 Ns selama 45,0 ms dan berhenti.',
      physicsPrinciple: 'Teorema Impuls–Momentum Linear Sistem (I_eks = ΔP)',
      whyItHappens:
        'Gravitasi tetap menarik sistem ke bawah dengan gaya 980 N selama 45,0 ms sehingga menyumbang impuls 44,1 Ns di atas 1600 Ns.',
      mathematicalProofLatex: '\\Delta t = \\frac{p - M v}{M g \\sin 30^\\circ} = \\frac{1644,1 - 1600}{980} = 0,045\\text{ s} = 45,0\\text{ ms}'
    },
    solution: {
      known: ['M = 200 kg', 'α = 30° (sin 30° = 0,5)', 'v = 8,0 m/s', 'p = 1644,1 Ns (sejajar turun bidang)', 'g = 9,8 m/s²', 'v_akhir = 0 m/s'],
      asked: 'Durasi penembakan Δt (dalam milidetik).',
      principleName: 'Teorema Impuls–Momentum Linear pada Sistem (Troli + Proyektil)',
      principleFormulas: [
        {
          label: 'Teorema Impuls–Momentum',
          latex: '\\int_0^{\\Delta t} \\sum F_{\\text{eks},\\parallel}\\,dt = P_{\\text{akhir},\\parallel} - P_{\\text{awal},\\parallel}',
          spokenText: 'Impuls gaya eksternal sejajar bidang sama dengan perubahan momentum total sistem sejajar bidang.'
        }
      ],
      physicalSituation:
        'Troli sedang bergerak turun pada kecepatan 8,0 m/s ketika proyektil dilontarkan sejajar arah turun bidang. Gaya ledakan merupakan gaya internal sistem.',
      phenomenonVisualization:
        'Momentum total sistem meningkat sedikit dari 1600,0 Ns menjadi 1644,1 Ns selama tembakan karena tarikan gravitasi selama Δt.',
      fbdNote:
        'Gaya normal N tegak lurus bidang sehingga tidak menyumbang impuls di sumbu sejajar bidang. Gaya luar tunggal di sumbu gerak adalah Mg sin 30°.',
      baseEquations: [
        {
          label: 'Persamaan Impuls Gravitasi',
          latex: '(M g \\sin 30^\\circ)\\,\\Delta t = p - M v',
          spokenText: 'M g sinus tiga puluh derajat dikali delta t sama dengan p dikurangi M v.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menentukan Momentum Awal & Akhir Sistem',
          explanation: 'Ambil arah menuruni bidang sebagai arah positif:',
          latex: 'P_{\\text{awal}} = M v, \\qquad P_{\\text{akhir}} = 0 + p = p'
        },
        {
          title: 'Menyelesaikan untuk Δt',
          explanation: 'Bagi selisih momentum dengan gaya berat sejajar bidang:',
          latex: '\\Delta t = \\frac{p - M v}{M g \\sin 30^\\circ}'
        }
      ],
      substitution: [
        {
          explanation: 'Substitusikan seluruh besaran SI:',
          latex: '\\Delta t = \\frac{1644,1 - (200)(8,0)}{(200)(9,8)(0,5)}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung pembilang (selisih momentum) dan penyebut (gaya gravitasi sejajar):',
          latex: '\\Delta t = \\frac{1644,1 - 1600}{980} = \\frac{44,1}{980} = 0,045\\text{ s}'
        },
        {
          explanation: 'Konversikan ke milidetik (1 s = 1000 ms):',
          latex: '\\Delta t = 0,045 \\times 1000 = 45,0\\text{ ms}'
        }
      ],
      dimensionCheck: '[M·L·T⁻¹] / [M·L·T⁻²] = [T] (sekon → milisekon).',
      roundingRule: 'Nilai eksak 45,0 ms.',
      finalAnswerDisplay: '45,0 ms',
      physicalInterpretation:
        'Walaupun tembakan sangat singkat (45 milidetik), impuls gaya gravitasi sebesar 44,1 Ns tetap signifikan dan terdeteksi langsung sebagai selisih antara p dan Mv.'
    },
    narratorQuestionScript:
      'Soal nomor tiga. Troli bermassa dua ratus kilogram meluncur turun di bidang licin tiga puluh derajat hingga berkecepatan delapan koma nol meter per sekon. Proyektil ditembakkan sejajar bidang ke bawah dengan momentum seribu enam ratus empat puluh empat koma satu newton sekon hingga troli berhenti. Tentukan durasi penembakan dalam milidetik.',
    narratorFbdScript:
      'Pada sumbu sejajar bidang miring, satu-satunya gaya eksternal yang bekerja pada sistem troli dan proyektil adalah komponen gaya berat M g sinus tiga puluh derajat sebesar sembilan ratus delapan puluh newton.',
    narratorSolutionScript:
      'Momentum awal sistem adalah dua ratus kali delapan sama dengan seribu enam ratus newton sekon. Setelah tembakan, troli berhenti sehingga momentum akhir seluruhnya dimiliki proyektil, yaitu seribu enam ratus empat puluh empat koma satu newton sekon. Selisih empat puluh empat koma satu newton sekon dihasilkan oleh gaya berat sejajar bidang sembilan ratus delapan puluh newton selama delta t. Jadi delta t adalah nol koma nol empat lima sekon, atau empat puluh lima koma nol milidetik.'
  },
  {
    id: 4,
    code: 'LAT-04',
    title: 'Variasi Langsung Soal 15 OSK 2026: Tembakan Horizontal di Bidang Licin',
    tier: 'Penerapan Konsep',
    tierIndex: 2,
    learningStageRef: 3,
    conceptFocus: 'Penggabungan GLBB bidang miring, proyeksi cos α, dan durasi Δt',
    questionText:
      'Sebuah meriam bermassa M = 0,6 ton mulai meluncur bebas dari keadaan diam menuruni bidang miring halus dengan sudut kemiringan α = 37° terhadap horizontal (gunakan sin 37° = 0,6; cos 37° = 0,8; dan g = 9,8 m/s²). Setelah meriam menempuh jarak ℓ = 6,0 m, sebuah tembakan dilepaskan dan peluru meninggalkan meriam dalam arah horizontal ke depan dengan momentum p = 6450 Ns. Akibatnya, meriam berhenti. Dengan menganggap massa peluru dapat diabaikan dibandingkan massa meriam, durasi tembakan tersebut adalah ... milidetik (satu angka desimal).',
    unit: 'ms',
    hintText:
      'Ini adalah struktur langsung Soal 15 OSK 2026! Ubah M = 0,6 ton = 600 kg, cari v dari √(2gℓ sin 37°), proyeksikan p ke sumbu sejajar bidang (p cos 37°), lalu gunakan (Mg sin 37°) Δt = p cos 37° − Mv.',
    commonMistakeNote:
      'Jangan menggunakan kekekalan momentum horizontal (p = Mv cos 37°), dan pastikan memakai p cos 37° (bukan p langsung) pada persamaan di sumbu sejajar bidang.',
    correctValue: 34.0,
    correctFormatted: '34,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'incline-cannon-shot',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        mass: 'M = 0,6 ton',
        distance: 'ℓ = 6,0 m',
        angle: 'α = 37°',
        momentum: 'p = 6450 Ns'
      }
    },
    fbd: {
      title: 'FBD Meriam + Peluru Selama Tembakan Horizontal (Sumbu Miring)',
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
          relativeMagnitude: 0.8,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Gaya berat meriam berarah vertikal ke bawah (4704 N + 1176 N komponen).',
          componentX: 'Mg sin 37° = 3528 N (∥)',
          componentY: '-Mg cos 37° = -4704 N (⊥)'
        },
        {
          id: 'fbd-normal',
          label: 'N(t) (Impulsif)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.15,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal melonjak sangat besar tegak lurus bidang untuk mengimbangi reaksi vertikal-miring peluru. Komponen sejajar bidangnya NOL.'
        },
        {
          id: 'fbd-recoil',
          label: 'F_reaksi',
          latexLabel: '\\vec{F}_{\\text{reaksi}}',
          directionDeg: 180,
          relativeMagnitude: 1.0,
          color: '#DC2626',
          phase: 'shot',
          description: 'Gaya internal aksi-reaksi peluru mendorong meriam horizontal ke kiri (gaya internal hilang jika sistem = meriam + peluru).'
        }
      ],
      xComponentSummary: '∑F_eks,∥ = Mg sin 37° (N tidak masuk!)',
      yComponentSummary: '∫(N − Mg cos 37°) dt = p sin 37°'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 37,
      M: 600,
      g: 9.8,
      ell: 6.0,
      p: 6450,
      deltaTMs: 34.0,
      directionMotion: 'down',
      whatIsObserved:
        'Meriam 600 kg meluncur 6,0 m mencapai 8,4 m/s, lalu menembakkan peluru horizontal 6450 Ns selama 34,0 ms hingga berhenti.',
      physicsPrinciple: 'Teorema Impuls–Momentum pada Sumbu Sejajar Bidang (N∥ = 0)',
      whyItHappens:
        'Di sumbu sejajar bidang miring licin, gaya normal impulsif memiliki komponen nol sehingga selisih p cos 37° − Mv sepenuhnya berasal dari Mg sin 37° · Δt.',
      mathematicalProofLatex: '\\Delta t = \\frac{6450(0,8) - 600(8,4)}{600(9,8)(0,6)} = \\frac{120}{3528} \\approx 34,0\\text{ ms}'
    },
    solution: {
      known: ['M = 0,6 ton = 600 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'ℓ = 6,0 m', 'p = 6450 Ns (horizontal)', 'g = 9,8 m/s²', 'v_akhir = 0'],
      asked: 'Durasi tembakan Δt dalam milidetik.',
      principleName: 'Kinematika Bidang Miring & Teorema Impuls–Momentum Sejajar Bidang',
      principleFormulas: [
        {
          label: 'Laju Sebelum Menembak',
          latex: 'v = \\sqrt{2 g \\ell \\sin\\alpha}',
          spokenText: 'Kelajuan sebelum menembak v sama dengan akar dua g el sinus alfa.'
        },
        {
          label: 'Impuls–Momentum Sumbu Sejajar Bidang',
          latex: '(M g \\sin\\alpha)\\,\\Delta t = p \\cos\\alpha - M v',
          spokenText: 'M g sinus alfa dikali delta t sama dengan p kosinus alfa dikurangi M v.'
        }
      ],
      physicalSituation:
        'Persis mengikuti skenario Soal 15 OSK 2026: meriam meluncur dari diam sejauh 6,0 m di bidang miring licin, lalu berhenti tepat setelah menembakkan peluru mendatar.',
      phenomenonVisualization:
        'Selama 34,0 ms, gaya reaksi horizontal peluru memiliki komponen naik bidang sebesar F cos 37° untuk menghentikan meriam, sambil menekan meriam ke bidang dengan komponen F sin 37°.',
      fbdNote:
        'Memilih sumbu sejajar bidang (∥) adalah langkah paling strategis karena menghilangkan gaya normal N(t) yang bernilai sangat besar dan impulsif.',
      baseEquations: [
        {
          label: 'Rumus Lengkap Δt',
          latex: '\\Delta t = \\frac{p \\cos\\alpha - M \\sqrt{2 g \\ell \\sin\\alpha}}{M g \\sin\\alpha}',
          spokenText: 'Delta t sama dengan p kosinus alfa dikurangi M akar dua g el sinus alfa, dibagi M g sinus alfa.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Laju Tepat Sebelum Menembak',
          explanation: 'Dari percepatan a = g sin 37° dan jarak luncur ℓ = 6,0 m:',
          latex: 'v = \\sqrt{2 \\times 9,8 \\times 6,0 \\times 0,6} = \\sqrt{70,56} = 8,4\\text{ m/s}'
        },
        {
          title: 'Menuliskan Kekekalan/Impuls Sumbu Sejajar Bidang',
          explanation: 'Momentum awal sistem Mv, momentum akhir sejajar bidang p cos 37°, dan gaya luar tunggal Mg sin 37°:',
          latex: '(M g \\sin 37^\\circ)\\,\\Delta t = p \\cos 37^\\circ - M v'
        }
      ],
      substitution: [
        {
          explanation: 'Masukkan M = 600 kg, v = 8,4 m/s, p = 6450 Ns, dan trig 37°:',
          latex: 'p \\cos 37^\\circ = 6450 \\times 0,8 = 5160\\text{ Ns}, \\quad M v = 600 \\times 8,4 = 5040\\text{ Ns}'
        },
        {
          explanation: 'Hitung gaya berat sejajar bidang:',
          latex: 'M g \\sin 37^\\circ = 600 \\times 9,8 \\times 0,6 = 3528\\text{ N}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung Δt dalam sekon kemudian milidetik:',
          latex: '\\Delta t = \\frac{5160 - 5040}{3528} = \\frac{120}{3528} \\approx 0,0340136\\text{ s} = 34,0\\text{ ms}'
        }
      ],
      dimensionCheck: '120 Ns / 3528 N = 0,03401 s = 34,0 ms.',
      roundingRule: 'Dibulatkan satu angka desimal menjadi 34,0 ms.',
      finalAnswerDisplay: '34,0 ms',
      physicalInterpretation:
        'Peluru membawa momentum sejajar bidang 5160 Ns: sebanyak 5040 Ns dipakai membatalkan momentum awal meriam, dan 120 Ns sisanya merupakan impuls tarikan gravitasi selama 34,0 milidetik.'
    },
    narratorQuestionScript:
      'Soal nomor empat, variasi langsung Soal lima belas OSK dua ribu dua puluh enam. Meriam bermassa nol koma enam ton meluncur bebas menuruni bidang miring halus tiga puluh tujuh derajat sejauh enam koma nol meter. Peluru ditembakkan horizontal dengan momentum enam ribu empat ratus lima puluh newton sekon sehingga meriam berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Perhatikan diagram benda bebas saat penembakan. Gaya normal N tegak lurus bidang melonjak sangat besar karena dorongan balik horizontal peluru menekan meriam ke permukaan. Karena bidang licin, gaya normal tidak punya komponen di sumbu sejajar bidang. Satu-satunya gaya luar di sumbu gerak adalah M g sinus tiga puluh tujuh derajat.',
    narratorSolutionScript:
      'Pertama, ubah massa nol koma enam ton menjadi enam ratus kilogram. Kelajuan meriam setelah meluncur enam meter adalah akar dari dua kali sembilan koma delapan kali enam kali nol koma enam, yaitu tepat delapan koma empat meter per sekon, sehingga momentum awalnya lima ribu empat puluh newton sekon. Sementara komponen momentum peluru sejajar bidang adalah enam ribu empat ratus lima puluh kali nol koma delapan sama dengan lima ribu seratus enam puluh newton sekon. Selisih seratus dua puluh newton sekon dibagi gaya berat sejajar bidang tiga ribu lima ratus dua puluh delapan newton menghasilkan nol koma nol tiga empat nol sekon, atau tiga puluh empat koma nol milidetik.'
  },
  {
    id: 5,
    code: 'LAT-05',
    title: 'Lonjakan Gaya Normal Rata-Rata Selama Penembakan',
    tier: 'Penerapan Konsep',
    tierIndex: 2,
    learningStageRef: 4,
    conceptFocus: 'Teorema Impuls–Momentum pada sumbu tegak lurus bidang (⊥) & gaya normal impulsif',
    questionText:
      'Pada suatu percobaan penembakan di atas bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 9,8 m/s²), sebuah meriam bermassa M = 500 kg menembakkan peluru bermassa sangat kecil secara horizontal dengan momentum p = 6000 Ns selama durasi Δt = 40,0 ms. Tentukan besar gaya normal rata-rata yang dikerjakan bidang miring terhadap meriam selama proses penembakan berlangsung (dalam satuan kN, satu angka desimal).',
    unit: 'kN',
    hintText:
      'Tinjau sumbu tegak lurus bidang miring (⊥). Meriam tetap menempel pada bidang (Δp_meriam,⊥ = 0), sedangkan peluru memperoleh momentum p sin 37° menjauhi bidang. Gunakan (N̄ − Mg cos 37°) Δt = p sin 37°.',
    commonMistakeNote:
      'Gaya normal selama tembakan TIDAK sama dengan Mg cos 37°! Kamu harus menambahkan suku impulsif (p sin 37°) / Δt dan mengonversi Δt = 40,0 ms = 0,040 s.',
    correctValue: 93.9,
    correctFormatted: '93,9',
    tolerance: 0.1,
    stimulus: {
      kind: 'normal-impulse',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        mass: 'M = 500 kg',
        angle: 'α = 37°',
        momentum: 'p = 6000 Ns',
        extra: 'Δt = 40,0 ms · Cari N̄'
      }
    },
    fbd: {
      title: 'FBD Sumbu Tegak Lurus Bidang (⊥) Saat Tembakan',
      inclineDeg: 37,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: true,
      bulletAngleDeg: 0,
      forces: [
        {
          id: 'fbd-normal',
          label: 'N̄ (93,9 kN)',
          latexLabel: '\\bar{N}',
          directionDeg: 53,
          relativeMagnitude: 1.2,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal rata-rata melonjak menjadi ~24 kali lipat berat normal statis untuk membelokkan impuls ke luar bidang.'
        },
        {
          id: 'fbd-mg',
          label: 'Mg',
          latexLabel: 'M\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.65,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Berat meriam 4900 N dengan komponen tegak lurus bidang Mg cos 37° = 3920 N.'
        }
      ],
      xComponentSummary: 'Sumbu ∥: N tidak berkontribusi',
      yComponentSummary: '(N̄ − Mg cos 37°) Δt = p sin 37°'
    },
    animation: {
      mode: 'normal-spike',
      alphaDeg: 37,
      M: 500,
      g: 9.8,
      ell: 4,
      p: 6000,
      deltaTMs: 40.0,
      directionMotion: 'down',
      whatIsObserved:
        'Grafik gaya normal N(t) melonjak tajam dari 3,92 kN menjadi rata-rata 93,9 kN tepat selama 40,0 ms proses penembakan.',
      physicsPrinciple: 'Teorema Impuls–Momentum pada Sumbu Tegak Lurus Bidang (⊥)',
      whyItHappens:
        'Reaksi tembakan horizontal menekan meriam ke dalam permukaan miring; permukaan merespons dengan gaya normal impulsif agar meriam tidak menembus bidang.',
      mathematicalProofLatex: '\\bar{N} = M g \\cos 37^\\circ + \\frac{p \\sin 37^\\circ}{\\Delta t} = 3,92\\text{ kN} + 90,0\\text{ kN} = 93,9\\text{ kN}'
    },
    solution: {
      known: ['M = 500 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 9,8 m/s²', 'p = 6000 Ns (horizontal)', 'Δt = 40,0 ms = 0,040 s'],
      asked: 'Besar gaya normal rata-rata N̄ selama penembakan (dalam kN).',
      principleName: 'Teorema Impuls–Momentum pada Arah Tegak Lurus Bidang (⊥)',
      principleFormulas: [
        {
          label: 'Impuls–Momentum Sumbu ⊥',
          latex: '\\int_0^{\\Delta t} (N(t) - M g \\cos\\alpha)\\,dt = \\Delta P_\\perp = p \\sin\\alpha',
          spokenText: 'Integral selisih gaya normal dikurangi M g kosinus alfa terhadap waktu sama dengan p sinus alfa.'
        }
      ],
      physicalSituation:
        'Meriam tidak terangkat maupun menembus bidang miring, sehingga komponen kecepatan meriam tegak lurus bidang selalu nol. Namun peluru yang ditembakkan horizontal memiliki komponen kecepatan menjauhi bidang.',
      phenomenonVisualization:
        'Sesaat peluru terdorong keluar, bidang miring menyalurkan gaya normal ekstra rata-rata 90,0 kN ke atas-tegak-lurus bidang di atas berat normal statis 3,92 kN.',
      fbdNote:
        'Pada arah ⊥ keluar bidang (positif), bekerja gaya normal N̄ ke atas-tegak-lurus dan komponen berat Mg cos 37° ke dalam bidang.',
      baseEquations: [
        {
          label: 'Gaya Normal Rata-Rata',
          latex: '\\bar{N} = M g \\cos\\alpha + \\frac{p \\sin\\alpha}{\\Delta t}',
          spokenText: 'Gaya normal rata-rata sama dengan M g kosinus alfa ditambah p sinus alfa dibagi delta t.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menulis Perubahan Momentum Sistem Sumbu ⊥',
          explanation: 'Momentum awal sistem arah ⊥ adalah nol; momentum akhir arah ⊥ hanya berasal dari peluru (p sin 37°):',
          latex: '\\Delta P_\\perp = p \\sin 37^\\circ - 0 = p \\sin 37^\\circ'
        },
        {
          title: 'Menghitung Gaya Normal Rata-Rata N̄',
          explanation: 'Gunakan definisi nilai rata-rata ∫ N(t) dt = N̄ Δt:',
          latex: '(\\bar{N} - M g \\cos 37^\\circ)\\,\\Delta t = p \\sin 37^\\circ \\implies \\bar{N} = M g \\cos 37^\\circ + \\frac{p \\sin 37^\\circ}{\\Delta t}'
        }
      ],
      substitution: [
        {
          explanation: 'Substitusikan nilai SI (Δt = 0,040 s):',
          latex: '\\bar{N} = (500)(9,8)(0,8) + \\frac{6000 \\times 0,6}{0,040}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung suku statis dan suku impulsif:',
          latex: '\\bar{N} = 3920\\text{ N} + 90000\\text{ N} = 93920\\text{ N} = 93,92\\text{ kN} \\approx 93,9\\text{ kN}'
        }
      ],
      dimensionCheck: '[M][L][T⁻²] + [M][L][T⁻¹]/[T] = N + N = N (lalu dibagi 1000 menjadi kN).',
      roundingRule: '93,92 kN dibulatkan satu angka desimal menjadi 93,9 kN.',
      finalAnswerDisplay: '93,9 kN',
      physicalInterpretation:
        'Lonjakan N hingga 93,9 kN (lebih dari 23 kali lipat gaya normal saat meluncur!) membuktikan secara kuantitatif mengapa komponen horizontal N sin 37° tidak pernah boleh diabaikan saat mencoba kekekalan momentum horizontal.'
    },
    narratorQuestionScript:
      'Soal nomor lima. Pada bidang miring licin tiga puluh tujuh derajat, meriam bermassa lima ratus kilogram menembakkan peluru mendatar bermomentum enam ribu newton sekon selama empat puluh koma nol milidetik. Tentukan besar gaya normal rata-rata bidang miring selama tembakan dalam kilonewton.',
    narratorFbdScript:
      'Lihat sumbu tegak lurus bidang miring. Meriam tetap menempel di permukaan, tetapi peluru mendapat komponen momentum p sinus tiga puluh tujuh derajat menjauhi bidang. Oleh karena itu gaya normal rata-rata harus mengimbangi M g kosinus tiga puluh tujuh derajat ditambah laju perubahan momentum tegak lurus peluru.',
    narratorSolutionScript:
      'Ubah dulu durasi empat puluh milidetik menjadi nol koma nol empat nol sekon. Komponen normal statis M g kosinus tiga puluh tujuh derajat adalah tiga ribu sembilan ratus dua puluh newton. Tambahan gaya impulsifnya adalah enam ribu kali nol koma enam dibagi nol koma nol empat, yaitu sembilan puluh ribu newton. Jumlah keduanya adalah sembilan puluh tiga ribu sembilan ratus dua puluh newton, atau sembilan puluh tiga koma sembilan kilonewton.'
  },
  {
    id: 6,
    code: 'LAT-06',
    title: 'Menentukan Jarak Luncur Awal dari Durasi Tembakan',
    tier: 'Penerapan Konsep',
    tierIndex: 2,
    learningStageRef: 3,
    conceptFocus: 'Analisis balik persamaan Soal 15 untuk mencari jarak luncur ℓ',
    questionText:
      'Sebuah meriam bermassa M = 1,0 ton meluncur bebas dari keadaan diam menuruni bidang miring licin bersudut α = 53° terhadap horizontal (gunakan sin 53° = 0,8; cos 53° = 0,6; dan g = 10,0 m/s²). Setelah menempuh jarak ℓ, meriam menembakkan peluru bermassa sangat kecil secara horizontal ke depan dengan momentum p = 20500 Ns selama durasi Δt = 37,5 ms, sehingga meriam tepat berhenti. Hitung jarak ℓ yang telah ditempuh meriam sebelum menembak (dalam satuan meter, satu angka desimal).',
    unit: 'm',
    hintText:
      'Gunakan teorema impuls-momentum sejajar bidang untuk mencari Mv (lalu v) terlebih dahulu: Mv = p cos 53° − (Mg sin 53°) Δt. Setelah v diperoleh, hitung ℓ dari v² = 2 g ℓ sin 53°.',
    commonMistakeNote:
      'Perhatikan sudut kali ini adalah 53° (sin 53° = 0,8; cos 53° = 0,6), kebalikan dari 37°! Juga pastikan M = 1,0 ton = 1000 kg.',
    correctValue: 9.0,
    correctFormatted: '9,0',
    tolerance: 0.05,
    stimulus: {
      kind: 'incline-cannon-shot',
      alphaDeg: 53,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        mass: 'M = 1,0 ton',
        distance: 'ℓ = ? m',
        angle: 'α = 53°',
        momentum: 'p = 20500 Ns (Δt = 37,5 ms)'
      }
    },
    fbd: {
      title: 'FBD Meriam + Peluru pada Bidang Miring Curam 53°',
      inclineDeg: 53,
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
          relativeMagnitude: 0.9,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Gaya berat 10.000 N; karena α = 53°, komponen sejajar bidang 8000 N lebih besar daripada komponen normal 6000 N.',
          componentX: 'Mg sin 53° = 8000 N',
          componentY: '-Mg cos 53° = -6000 N'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 37,
          relativeMagnitude: 1.1,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal tegak lurus bidang miring 53° (tetap N∥ = 0).'
        }
      ],
      xComponentSummary: 'Mv = p cos 53° − (Mg sin 53°) Δt',
      yComponentSummary: 'N̄ = Mg cos 53° + (p sin 53°)/Δt'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 53,
      M: 1000,
      g: 10.0,
      ell: 9.0,
      p: 20500,
      deltaTMs: 37.5,
      directionMotion: 'down',
      whatIsObserved:
        'Meriam 1000 kg meluncur di kemiringan curam 53° sepanjang 9,0 m hingga berkecepatan 12,0 m/s sebelum tembakan 37,5 ms menghentikannya.',
      physicsPrinciple: 'Inversi Teorema Impuls–Momentum & Kinematika GLBB',
      whyItHappens:
        'Dengan diketahui p dan Δt, kita dapat merekonstruksi momentum tepat sebelum menembak (12.000 Ns) dan melacak kembali jarak luncur awalnya.',
      mathematicalProofLatex: 'v = 12,0\\text{ m/s} \\implies \\ell = \\frac{v^2}{2 g \\sin 53^\\circ} = \\frac{144}{16} = 9,0\\text{ m}'
    },
    solution: {
      known: ['M = 1,0 ton = 1000 kg', 'α = 53° (sin 53° = 0,8; cos 53° = 0,6)', 'g = 10,0 m/s²', 'p = 20500 Ns', 'Δt = 37,5 ms = 0,0375 s'],
      asked: 'Jarak luncur ℓ sebelum tembakan dilepaskan (dalam meter).',
      principleName: 'Teorema Impuls–Momentum Sejajar Bidang & Kinematika GLBB',
      principleFormulas: [
        {
          label: 'Hubungan Momentum Sebelum Menembak',
          latex: 'M v = p \\cos\\alpha - (M g \\sin\\alpha)\\,\\Delta t',
          spokenText: 'M kali v sama dengan p kosinus alfa dikurangi M g sinus alfa dikali delta t.'
        },
        {
          label: 'Hubungan Jarak Luncur',
          latex: '\\ell = \\frac{v^2}{2 g \\sin\\alpha}',
          spokenText: 'Jarak el sama dengan v kuadrat dibagi dua g sinus alfa.'
        }
      ],
      physicalSituation:
        'Kebalikan dari soal standar: durasi tembakan dan momentum peluru diketahui, sedangkan titik pelepasan tembakan (jarak ℓ dari puncak) dicari.',
      phenomenonVisualization:
        'Pada kemiringan curam 53°, gaya berat sejajar bidang (8000 N) cukup besar sehingga dalam 37,5 ms saja menyumbang 300 Ns impuls.',
      fbdNote:
        'Gaya normal N tidak memasuki persamaan gerak sejajar bidang miring licin.',
      baseEquations: [
        {
          label: 'Persamaan Impuls-Momentum',
          latex: '(M g \\sin 53^\\circ)\\,\\Delta t = p \\cos 53^\\circ - M v',
          spokenText: 'M g sinus lima puluh tiga derajat kali delta t sama dengan p kosinus lima puluh tiga derajat dikurangi M v.'
        }
      ],
      derivationSteps: [
        {
          title: 'Mencari Momentum Meriam Sebelum Menembak',
          explanation: 'Susun ulang persamaan impuls-momentum untuk mencari Mv:',
          latex: 'M v = p \\cos 53^\\circ - M g \\sin 53^\\circ \\cdot \\Delta t'
        },
        {
          title: 'Mencari Jarak ℓ dari Kecepatan v',
          explanation: 'Karena meriam mulai dari keadaan diam (v₀ = 0) dengan percepatan a = g sin 53°:',
          latex: 'v^2 = 2 g \\ell \\sin 53^\\circ \\implies \\ell = \\frac{v^2}{2 g \\sin 53^\\circ}'
        }
      ],
      substitution: [
        {
          explanation: 'Hitung nilai Mv dengan M = 1000 kg dan Δt = 0,0375 s:',
          latex: 'M v = (20500)(0,6) - (1000)(10,0)(0,8)(0,0375)'
        }
      ],
      calculation: [
        {
          explanation: 'Evaluasi Mv dan v:',
          latex: 'M v = 12300 - 300 = 12000\\text{ Ns} \\implies v = \\frac{12000}{1000} = 12,0\\text{ m/s}'
        },
        {
          explanation: 'Substitusi v = 12,0 m/s ke rumus jarak:',
          latex: '\\ell = \\frac{(12,0)^2}{2 \\times 10,0 \\times 0,8} = \\frac{144}{16} = 9,0\\text{ m}'
        }
      ],
      dimensionCheck: 'v² / a = [L²·T⁻²] / [L·T⁻²] = [L] (meter).',
      roundingRule: 'Hasil eksak 9,0 m, ditulis satu angka desimal menjadi 9,0.',
      finalAnswerDisplay: '9,0 m',
      physicalInterpretation:
        'Meriam perlu meluncur tepat 9,0 meter agar kecepatannya mencapai 12,0 m/s sehingga tembakan 20500 Ns berdurasi 37,5 ms menghentikannya secara sempurna.'
    },
    narratorQuestionScript:
      'Soal nomor enam. Meriam bermassa satu koma nol ton meluncur bebas menuruni bidang miring licin bersudut lima puluh tiga derajat. Setelah menempuh jarak el, tembakan dilepaskan secara horizontal dengan momentum dua puluh ribu lima ratus newton sekon selama tiga puluh tujuh koma lima milidetik sehingga meriam tepat berhenti. Hitung jarak luncur el dalam meter.',
    narratorFbdScript:
      'Pada kemiringan lima puluh tiga derajat, komponen berat sejajar bidang adalah M g sinus lima puluh tiga derajat sama dengan delapan ribu newton. Gaya normal tetap tegak lurus bidang.',
    narratorSolutionScript:
      'Dari persamaan impuls momentum sejajar bidang, M v sama dengan p kosinus lima puluh tiga derajat dikurangi M g sinus lima puluh tiga derajat kali delta t. Dua puluh ribu lima ratus kali nol koma enam adalah dua belas ribu tiga ratus, dikurangi delapan ribu kali nol koma nol tiga tujuh lima yaitu tiga ratus, menghasilkan dua belas ribu newton sekon. Dibagi seribu kilogram, laju meriam adalah dua belas meter per sekon. Maka jarak el sama dengan seratus empat puluh empat dibagi enam belas, yaitu sembilan koma nol meter.'
  },
  {
    id: 7,
    code: 'LAT-07',
    title: 'Meriam Tidak Berhenti: Kecepatan Pantulan Setelah Menembak',
    tier: 'Analisis Menengah',
    tierIndex: 3,
    learningStageRef: 5,
    conceptFocus: 'Momentum akhir meriam M v_f ≠ 0 dan arah gerak berbalik naik bidang miring',
    questionText:
      'Sebuah meriam bermassa M = 400 kg meluncur bebas dari keadaan diam menuruni bidang miring licin bersudut α = 30° (g = 9,8 m/s²) sejauh ℓ = 5,0 m. Kemudian meriam melepaskan tembakan berdurasi Δt = 50,0 ms, melontarkan peluru bermassa sangat kecil secara horizontal ke depan dengan momentum p = 3700 Ns. Tentukan laju meriam tepat setelah tembakan selesai (dalam satuan m/s, satu angka desimal).',
    unit: 'm/s',
    hintText:
      'Pada persamaan impuls-momentum sejajar bidang, suku momentum akhir bukan hanya p cos 30°, melainkan M v_f + p cos 30°! Karena p cos 30° melebihi M v₀ + Mg sin 30° Δt, nilai v_f akan bertanda negatif (bergerak naik). Laju adalah nilai mutlak |v_f|.',
    commonMistakeNote:
      'Jangan berasumsi meriam selalu berhenti! Masukkan suku M v_f ke dalam P_akhir,∥ dan gunakan nilai cos 30° = √3/2 ≈ 0,866025 secara presisi sebelum pembulatan akhir.',
    correctValue: 0.8,
    correctFormatted: '0,8',
    tolerance: 0.05,
    stimulus: {
      kind: 'rebound-incline',
      alphaDeg: 30,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      showReboundArrow: true,
      labels: {
        mass: 'M = 400 kg',
        distance: 'ℓ = 5,0 m',
        angle: 'α = 30°',
        momentum: 'p = 3700 Ns (Δt = 50,0 ms)'
      }
    },
    fbd: {
      title: 'FBD Meriam Saat Tembakan Kuat (v_f < 0, Berbalik Naik)',
      inclineDeg: 30,
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
          relativeMagnitude: 0.8,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Komponen sejajar bidang Mg sin 30° = 1960 N selalu mengarah ke bawah bidang, baik saat meriam turun maupun berbalik naik.',
          componentX: 'Mg sin 30° = 1960 N',
          componentY: '-Mg cos 30°'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 60,
          relativeMagnitude: 1.1,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal impulsif tegak lurus bidang selama 50,0 ms.'
        },
        {
          id: 'fbd-recoil',
          label: 'F_reaksi',
          latexLabel: '\\vec{F}_{\\text{reaksi}}',
          directionDeg: 180,
          relativeMagnitude: 1.05,
          color: '#DC2626',
          phase: 'shot',
          description: 'Gaya reaksi tembakan cukup kuat untuk mengerem meriam hingga nol dan mendorongnya balik ke atas bidang.'
        }
      ],
      xComponentSummary: 'Mv_f + p cos 30° − Mv₀ = (Mg sin 30°) Δt',
      yComponentSummary: 'N̄ = Mg cos 30° + (p sin 30°)/Δt'
    },
    animation: {
      mode: 'rebound',
      alphaDeg: 30,
      M: 400,
      g: 9.8,
      ell: 5.0,
      p: 3700,
      deltaTMs: 50.0,
      directionMotion: 'down',
      whatIsObserved:
        'Meriam meluncur turun hingga 7,0 m/s, lalu setelah menembak peluru 3700 Ns selama 50,0 ms, meriam berbalik arah bergerak naik bidang dengan laju 0,8 m/s.',
      physicsPrinciple: 'Teorema Impuls–Momentum Umum dengan Kecepatan Akhir Tak-Nol',
      whyItHappens:
        'Komponen momentum peluru sejajar bidang (3204,3 Ns) melampaui jumlah momentum awal dan impuls gravitasi (2898,0 Ns), sehingga sisa impuls berlawanan arah diberikan kepada meriam.',
      mathematicalProofLatex: 'v_f = \\frac{2800 + 98 - 1850\\sqrt{3}}{400} \\approx -0,766\\text{ m/s} \\implies |v_f| = 0,8\\text{ m/s}'
    },
    solution: {
      known: ['M = 400 kg', 'α = 30° (sin 30° = 0,5; cos 30° = √3/2)', 'g = 9,8 m/s²', 'ℓ = 5,0 m', 'Δt = 50,0 ms = 0,050 s', 'p = 3700 Ns'],
      asked: 'Laju meriam |v_f| tepat setelah tembakan selesai (dalam m/s).',
      principleName: 'Teorema Impuls–Momentum Sistem Sejajar Bidang (v_f ≠ 0)',
      principleFormulas: [
        {
          label: 'Persamaan Umum Impuls–Momentum',
          latex: '(M g \\sin\\alpha)\\,\\Delta t = (M v_f + p \\cos\\alpha) - M v_0',
          spokenText: 'M g sinus alfa dikali delta t sama dengan M v akhir ditambah p kosinus alfa dikurangi M v awal.'
        }
      ],
      physicalSituation:
        'Tembakan kali ini terlalu kuat untuk sekadar menghentikan meriam: momentum peluru memaksa meriam melambat hingga nol lalu terpental mundur naik bidang miring.',
      phenomenonVisualization:
        'Tetapkan arah positif = menuruni bidang miring. Nilai v_f negatif menunjukkan meriam bergerak ke atas bidang miring.',
      fbdNote:
        'Karena bidang licin, N∥ = 0 dan hanya Mg sin 30° yang memberikan impuls luar di sumbu gerak.',
      baseEquations: [
        {
          label: 'Kecepatan Awal Sebelum Menembak',
          latex: 'v_0 = \\sqrt{2 g \\ell \\sin 30^\\circ}',
          spokenText: 'v nol sama dengan akar dua g el sinus tiga puluh derajat.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Laju Sebelum Menembak',
          explanation: 'Meriam turun sejauh 5,0 m dari keadaan diam:',
          latex: 'v_0 = \\sqrt{2 \\times 9,8 \\times 5,0 \\times 0,5} = \\sqrt{49} = 7,0\\text{ m/s}'
        },
        {
          title: 'Menyelesaikan untuk Kecepatan Akhir v_f',
          explanation: 'Dari persamaan impuls-momentum sumbu sejajar bidang:',
          latex: 'M v_f = M v_0 + (M g \\sin 30^\\circ)\\,\\Delta t - p \\cos 30^\\circ'
        }
      ],
      substitution: [
        {
          explanation: 'Substitusikan nilai-nilai ke ruas kanan:',
          latex: 'M v_0 = 400 \\times 7,0 = 2800\\text{ Ns}, \\quad (M g \\sin 30^\\circ)\\,\\Delta t = 400(9,8)(0,5)(0,050) = 98\\text{ Ns}'
        },
        {
          explanation: 'Hitung proyeksi momentum peluru:',
          latex: 'p \\cos 30^\\circ = 3700 \\times \\frac{\\sqrt{3}}{2} = 1850\\sqrt{3} \\approx 3204,29\\text{ Ns}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung kecepatan akhir v_f:',
          latex: '400\\,v_f = 2800 + 98 - 3204,29 = -306,29\\text{ Ns} \\implies v_f = -0,7657\\text{ m/s}'
        },
        {
          explanation: 'Laju adalah besar kecepatan |v_f|:',
          latex: '|v_f| \\approx 0,8\\text{ m/s}'
        }
      ],
      dimensionCheck: 'Ns / kg = (kg·m/s) / kg = m/s.',
      roundingRule: '0,7657 m/s dibulatkan satu angka desimal menjadi 0,8 m/s.',
      finalAnswerDisplay: '0,8 m/s',
      physicalInterpretation:
        'Tanda negatif pada v_f = -0,77 m/s berarti meriam berbalik arah bergerak menaiki bidang miring dengan laju 0,8 m/s sesaat setelah peluru lepas dari laras.'
    },
    narratorQuestionScript:
      'Soal nomor tujuh, analisis menengah. Meriam empat ratus kilogram meluncur di bidang licin tiga puluh derajat sejauh lima meter. Tembakan berdurasi lima puluh milidetik melontarkan peluru horizontal bermomentum tiga ribu tujuh ratus newton sekon. Tentukan laju meriam tepat setelah tembakan selesai dalam meter per sekon.',
    narratorFbdScript:
      'Karena tembakan kali ini lebih besar daripada momentum awal ditambah impuls gravitasi, meriam tidak hanya berhenti melainkan terpental mundur menaiki bidang miring.',
    narratorSolutionScript:
      'Laju meriam sebelum menembak adalah akar dari dua kali sembilan koma delapan kali lima kali setengah, yaitu tepat tujuh meter per sekon, memberi momentum awal dua ribu delapan ratus newton sekon. Impuls gravitasi selama lima puluh milidetik adalah sembilan puluh delapan newton sekon. Sementara komponen momentum peluru adalah tiga ribu tujuh ratus kosinus tiga puluh derajat, sekitar tiga ribu dua ratus empat koma tiga newton sekon. Jadi empat ratus v akhir sama dengan dua ribu delapan ratus sembilan puluh delapan dikurangi tiga ribu dua ratus empat koma tiga, yaitu minus tiga ratus enam koma tiga. Diperoleh v akhir minus nol koma tujuh tujuh meter per sekon, sehingga lajunya nol koma delapan meter per sekon.'
  },
  {
    id: 8,
    code: 'LAT-08',
    title: 'Bidang Miring Kasar: Gaya Gesek Kinetik Impulsif',
    tier: 'Analisis Menengah',
    tierIndex: 3,
    learningStageRef: 5,
    conceptFocus: 'Pengaruh lonjakan gaya normal terhadap impuls gesekan kinetik f_k(t) = μ_k N(t)',
    questionText:
      'Sebuah meriam bermassa M = 500 kg meluncur dari keadaan diam menuruni bidang miring kasar dengan koefisien gesekan kinetik μ_k = 0,25 dan sudut kemiringan α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²). Setelah menempuh jarak ℓ = 12,5 m, meriam menembakkan peluru bermassa sangat kecil secara horizontal ke depan dengan momentum p = 5400 Ns sehingga meriam tepat berhenti di akhir durasi tembakan Δt. Selama tembakan berlangsung, meriam tetap meluncur turun hingga berhenti sehingga gesekan kinetik f_k = μ_k N(t) tetap bekerja. Hitung durasi tembakan Δt (dalam satuan milidetik, satu angka desimal).',
    unit: 'ms',
    hintText:
      'Sangat penting: selama tembakan, gaya normal N(t) melonjak! Jadi impuls gesekan ke atas bidang adalah J_f = μ_k ∫ N(t) dt = μ_k (Mg cos 37° Δt + p sin 37°). Masukkan J_f ini ke persamaan impuls-momentum sejajar bidang.',
    commonMistakeNote:
      'Kesalahan paling umum di soal ini adalah memakai gaya gesek konstan μ_k Mg cos 37° saja saat menembak! Ingat f_k(t) = μ_k N(t) sehingga lonjakan N akibat p sin 37° menghasilkan impuls gesekan ekstra μ_k p sin 37°.',
    correctValue: 65.0,
    correctFormatted: '65,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'rough-incline',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      showFriction: true,
      labels: {
        mass: 'M = 500 kg',
        distance: 'ℓ = 12,5 m',
        angle: 'α = 37° (μ_k = 0,25)',
        momentum: 'p = 5400 Ns'
      }
    },
    fbd: {
      title: 'FBD Bidang Miring Kasar: Gesekan Impulsif f_k(t) = μ_k N(t)',
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
          description: 'Berat 5000 N (komponen turun 3000 N, normal statis 4000 N).'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.15,
          color: '#059669',
          phase: 'all',
          description: 'Gaya normal melonjak saat tembakan, memenuhi ∫N(t)dt = Mg cos α Δt + p sin α.'
        },
        {
          id: 'fbd-friction',
          label: 'f_k(t) = μ_k N(t)',
          latexLabel: '\\vec{f}_k(t)',
          directionDeg: 143,
          relativeMagnitude: 0.75,
          color: '#D97706',
          phase: 'all',
          description: 'Selama Δt meriam terus bergerak turun menuju nol, sehingga gaya gesek kinetik mengarah ke atas bidang dan ikut melonjak sebanding N(t)!'
        }
      ],
      xComponentSummary: '∫(Mg sin α − μ_k N(t)) dt = p cos α − Mv',
      yComponentSummary: '∫N(t) dt = Mg cos α Δt + p sin α'
    },
    animation: {
      mode: 'rough-stop',
      alphaDeg: 37,
      M: 500,
      g: 10.0,
      ell: 12.5,
      p: 5400,
      deltaTMs: 65.0,
      muK: 0.25,
      directionMotion: 'down',
      whatIsObserved:
        'Di bidang kasar μ_k = 0,25, gaya gesek f_k(t) ikut melonjak bersama N(t) selama 65,0 ms sehingga membantu mengerem meriam hingga berhenti.',
      physicsPrinciple: 'Keterkaitan Impuls Normal dan Impuls Gesekan Kinetik (J_f = μ_k ∫ N dt)',
      whyItHappens:
        'Tembakan menekan meriam ke lantai kasar, memunculkan impuls gesek ekstra μ_k p sin 37° = 810 Ns yang ikut menahan laju meriam.',
      mathematicalProofLatex: 'M g (\\sin\\alpha - \\mu_k \\cos\\alpha)\\Delta t = p(\\cos\\alpha + \\mu_k \\sin\\alpha) - M v \\implies \\Delta t = 65,0\\text{ ms}'
    },
    solution: {
      known: ['M = 500 kg', 'μ_k = 0,25', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'ℓ = 12,5 m', 'p = 5400 Ns'],
      asked: 'Durasi tembakan Δt (dalam milidetik).',
      principleName: 'Dinamika Bidang Kasar & Kopling Impuls Normal–Gesekan',
      principleFormulas: [
        {
          label: 'Impuls Normal Total',
          latex: 'J_N = \\int_0^{\\Delta t} N(t)\\,dt = M g \\cos\\alpha\\,\\Delta t + p \\sin\\alpha',
          spokenText: 'Impuls gaya normal J N sama dengan M g kosinus alfa delta t ditambah p sinus alfa.'
        },
        {
          label: 'Impuls Gesekan Kinetik Total',
          latex: 'J_f = \\mu_k J_N = \\mu_k (M g \\cos\\alpha\\,\\Delta t + p \\sin\\alpha)',
          spokenText: 'Impuls gaya gesek kinetik sama dengan miu k dikali impuls gaya normal.'
        }
      ],
      physicalSituation:
        'Meriam bergerak turun sepanjang waktu sebelum maupun selama proses pengereman hingga berhenti, sehingga arah gaya gesekan kinetik selalu ke atas bidang miring.',
      phenomenonVisualization:
        'Lonjakan tekanan meriam ke permukaan kasar memperbesar cengkeraman gesekan selama 65,0 ms.',
      fbdNote:
        'Karena f_k(t) selalu sebanding dengan N(t) dan searah sepanjang seluruh selang [0, Δt], integral f_k(t) dapat diganti langsung oleh μ_k kali integral N(t).',
      baseEquations: [
        {
          label: 'Impuls–Momentum Sumbu ∥ (Bidang Kasar)',
          latex: 'M g \\sin\\alpha\\,\\Delta t - J_f = p \\cos\\alpha - M v',
          spokenText: 'Impuls gaya berat sejajar bidang dikurangi impuls gesekan sama dengan p kosinus alfa dikurangi M v.'
        }
      ],
      derivationSteps: [
        {
          title: 'Mencari Laju Sebelum Menembak pada Bidang Kasar',
          explanation: 'Percepatan sebelum menembak adalah a = g (sin 37° − μ_k cos 37°):',
          latex: 'a = 10,0(0,6 - 0,25 \\times 0,8) = 4,0\\text{ m/s}^2 \\implies v = \\sqrt{2(4,0)(12,5)} = 10,0\\text{ m/s}'
        },
        {
          title: 'Mensubstitusi J_f ke Persamaan Impuls Sejajar Bidang',
          explanation: 'Kelompokkan suku Δt di ruas kiri dan suku momentum di ruas kanan:',
          latex: 'M g \\sin\\alpha\\,\\Delta t - \\mu_k(M g \\cos\\alpha\\,\\Delta t + p \\sin\\alpha) = p \\cos\\alpha - M v'
        },
        {
          title: 'Menyederhanakan Persamaan Akhir',
          explanation: 'Pindahkan −μ_k p sin α ke ruas kanan:',
          latex: 'M g (\\sin\\alpha - \\mu_k \\cos\\alpha)\\,\\Delta t = p (\\cos\\alpha + \\mu_k \\sin\\alpha) - M v'
        }
      ],
      substitution: [
        {
          explanation: 'Hitung suku-suku numerik:',
          latex: 'M v = 500 \\times 10,0 = 5000\\text{ Ns}, \\quad M g(\\sin\\alpha - \\mu_k\\cos\\alpha) = 500(4,0) = 2000\\text{ N}'
        },
        {
          explanation: 'Hitung suku momentum efektif peluru:',
          latex: 'p(\\cos 37^\\circ + \\mu_k \\sin 37^\\circ) = 5400(0,8 + 0,25 \\times 0,6) = 5400 \\times 0,95 = 5130\\text{ Ns}'
        }
      ],
      calculation: [
        {
          explanation: 'Selesaikan Δt:',
          latex: '\\Delta t = \\frac{5130 - 5000}{2000} = \\frac{130}{2000} = 0,065\\text{ s} = 65,0\\text{ ms}'
        }
      ],
      dimensionCheck: '130 Ns / 2000 N = 0,065 s = 65,0 ms.',
      roundingRule: 'Nilai eksak 65,0 ms.',
      finalAnswerDisplay: '65,0 ms',
      physicalInterpretation:
        'Perhatikan keindahan fisikanya: seandainya kamu lupa bahwa gesekan ikut melonjak bersama gaya normal, kamu akan mengira p cos 37° = 4320 Ns < 5000 Ns mustahil menghentikan meriam! Impuls gesekan ekstra sebesar 810 Ns inilah yang membuat meriam berhasil berhenti.'
    },
    narratorQuestionScript:
      'Soal nomor delapan, tantangan bidang miring kasar. Meriam lima ratus kilogram meluncur dari diam di bidang kasar dengan koefisien gesek kinetik nol koma dua lima bersudut tiga puluh tujuh derajat sejauh dua belas koma lima meter. Meriam menembak horizontal dengan momentum lima ribu empat ratus newton sekon hingga berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Pada bidang miring kasar, terdapat gaya gesekan kinetik ke arah atas bidang sebesar miu k dikali gaya normal. Ingat, ketika peluru ditembakkan, gaya normal melonjak tajam sehingga gaya gesek kinetik juga ikut melonjak secara impulsif sepanjang durasi tembakan.',
    narratorSolutionScript:
      'Percepatan sebelum tembakan adalah sepuluh kali nol koma enam dikurangi nol koma dua lima kali nol koma delapan, yaitu empat meter per sekon kuadrat. Setelah dua belas koma lima meter, kelajuannya tepat sepuluh meter per sekon atau momentum awal lima ribu newton sekon. Selama tembakan, impuls gaya gesek sama dengan miu k dikali jumlah M g kosinus tiga puluh tujuh delta t dan p sinus tiga puluh tujuh derajat. Sehingga ruas momentum peluru efektif menjadi p dikali kosinus ditambah miu k sinus, yaitu lima ribu empat ratus kali nol koma sembilan lima sama dengan lima ribu seratus tiga puluh newton sekon. Selisih seratus tiga puluh dibagi dua ribu newton menghasilkan nol koma nol enam lima sekon, atau enam puluh lima koma nol milidetik.'
  }
];
