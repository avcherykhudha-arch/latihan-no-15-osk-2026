import { PracticeProblem } from '../types/physics';

export const PROBLEMS_PART_2: PracticeProblem[] = [
  {
    id: 9,
    code: 'LAT-09',
    title: 'Meriam Mendaki Bidang Miring & Menembak Berlawanan Arah',
    tier: 'Analisis Menengah',
    tierIndex: 3,
    learningStageRef: 5,
    conceptFocus: 'Tanda impuls gravitasi saat gerak mendaki bidang (p cos α < Mv)',
    questionText:
      'Sebuah meriam bermassa M = 600 kg didorong sehingga memiliki laju awal v₀ = 10,0 m/s menaiki bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²). Setelah menempuh jarak ℓ = 3,0 m ke atas bidang miring, meriam menembakkan peluru bermassa sangat kecil secara horizontal ke arah kiri (searah komponen mendatar gerak naiknya) dengan momentum p = 5775 Ns sehingga meriam tepat berhenti. Hitung durasi tembakan Δt (dalam satuan milidetik, satu angka desimal).',
    unit: 'ms',
    hintText:
      'Tetapkan arah positif = menaiki bidang miring! Laju berkurang dari v₀ sebelum menembak (v² = v₀² − 2gℓ sin 37°). Selama Δt, gravitasi menarik sistem KE BAWAH bidang (−Mg sin 37°), sehingga p cos 37° lebih KECIL daripada Mv.',
    commonMistakeNote:
      'Jangan bingung jika p cos 37° < Mv! Saat bergerak naik, gravitasi membantu memperlambat sistem selama Δt, sehingga persamaan menjadi Mv − p cos 37° = Mg sin 37° Δt.',
    correctValue: 50.0,
    correctFormatted: '50,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'uphill-shot',
      alphaDeg: 37,
      directionMotion: 'up',
      bulletAngleDeg: 180,
      labels: {
        mass: 'M = 600 kg',
        distance: 'ℓ = 3,0 m (naik)',
        angle: 'α = 37°',
        momentum: 'p = 5775 Ns (kiri)'
      }
    },
    fbd: {
      title: 'FBD Meriam Mendaki Bidang Saat Menembak ke Kiri',
      inclineDeg: 37,
      directionMotion: 'up',
      showAxes: true,
      showShotForces: true,
      bulletAngleDeg: 180,
      forces: [
        {
          id: 'fbd-mg',
          label: 'Mg',
          latexLabel: 'M\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.85,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Komponen berat sejajar bidang (−Mg sin 37° = −3600 N) berlawanan arah gerak naik meriam sehingga membantu meriam berhenti.'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 0.85,
          color: '#059669',
          phase: 'all',
          description: 'Saat peluru ditembakkan horizontal ke kiri (berlawanan kemiringan), reaksi ke kanan justru mengurangi tekanan ke bidang: N̄ = Mg cos 37° − (p sin 37°)/Δt (selama meriam tak terangkat).'
        }
      ],
      xComponentSummary: '−(Mg sin 37°) Δt = p cos 37° − Mv',
      yComponentSummary: '(N̄ − Mg cos 37°) Δt = −p sin 37°'
    },
    animation: {
      mode: 'uphill-stop',
      alphaDeg: 37,
      M: 600,
      g: 10.0,
      ell: 3.0,
      v0: 10.0,
      p: 5775,
      deltaTMs: 50.0,
      bulletAngleDeg: 180,
      directionMotion: 'up',
      whatIsObserved:
        'Meriam naik bidang dari 10,0 m/s menjadi 8,0 m/s di jarak 3,0 m, lalu menembak horizontal ke kiri sehingga berhenti dalam 50,0 ms.',
      physicsPrinciple: 'Teorema Impuls–Momentum dengan Gravitasi Menghambat Gerak',
      whyItHappens:
        'Selama tembakan 50,0 ms, gravitasi ikut mengerem sistem sebesar 180 Ns ke bawah bidang, sehingga peluru hanya perlu membawa pergi 4620 Ns dari 4800 Ns.',
      mathematicalProofLatex: '\\Delta t = \\frac{M v - p \\cos 37^\\circ}{M g \\sin 37^\\circ} = \\frac{4800 - 4620}{3600} = 50,0\\text{ ms}'
    },
    solution: {
      known: ['M = 600 kg', 'v₀ = 10,0 m/s (naik)', 'ℓ = 3,0 m', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'p = 5775 Ns (horizontal ke kiri)'],
      asked: 'Durasi tembakan Δt dalam milidetik.',
      principleName: 'Kinematika Perlambatan & Teorema Impuls–Momentum Arah Mendaki',
      principleFormulas: [
        {
          label: 'GLBB Mendaki Bidang',
          latex: 'v^2 = v_0^2 - 2 (g \\sin\\alpha) \\ell',
          spokenText: 'v kuadrat sama dengan v nol kuadrat dikurangi dua g sinus alfa dikali el.'
        },
        {
          label: 'Impuls–Momentum Sumbu Naik (+)',
          latex: '-(M g \\sin\\alpha)\\,\\Delta t = p \\cos\\alpha - M v',
          spokenText: 'Minus M g sinus alfa dikali delta t sama dengan p kosinus alfa dikurangi M v.'
        }
      ],
      physicalSituation:
        'Meriam bergerak mendaki bidang miring sehingga kecepatannya berkurang sebelum menembak. Peluru ditembakkan horizontal ke arah kiri (searah komponen horizontal gerak naik).',
      phenomenonVisualization:
        'Berbeda dari kasus meluncur turun, ketika meriam mendaki bidang, gaya gravitasi membantu mengurangi momentum sistem selama penembakan.',
      fbdNote:
        'Dengan mengambil arah naik bidang sebagai sumbu positif, gaya berat sejajar bidang bernilai negatif (−Mg sin 37°).',
      baseEquations: [
        {
          label: 'Rumus Durasi Saat Mendaki',
          latex: '\\Delta t = \\frac{M v - p \\cos\\alpha}{M g \\sin\\alpha}',
          spokenText: 'Delta t sama dengan M v dikurangi p kosinus alfa dibagi M g sinus alfa.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Kecepatan Sebelum Menembak',
          explanation: 'Perlambatan menuruni bidang a = −g sin 37° = −6,0 m/s²:',
          latex: 'v = \\sqrt{10,0^2 - 2(6,0)(3,0)} = \\sqrt{100 - 36} = 8,0\\text{ m/s}'
        },
        {
          title: 'Menyusun Persamaan Impuls–Momentum',
          explanation: 'Momentum awal ke atas Mv, momentum akhir ke atas p cos 37°, impuls luar −(Mg sin 37°) Δt:',
          latex: 'p \\cos 37^\\circ - M v = -(M g \\sin 37^\\circ)\\,\\Delta t'
        }
      ],
      substitution: [
        {
          explanation: 'Masukkan M = 600 kg, v = 8,0 m/s, p = 5775 Ns:',
          latex: 'M v = 600 \\times 8,0 = 4800\\text{ Ns}, \\quad p \\cos 37^\\circ = 5775 \\times 0,8 = 4620\\text{ Ns}'
        }
      ],
      calculation: [
        {
          explanation: 'Bagi selisih momentum dengan 3600 N:',
          latex: '\\Delta t = \\frac{4800 - 4620}{600 \\times 10,0 \\times 0,6} = \\frac{180}{3600} = 0,050\\text{ s} = 50,0\\text{ ms}'
        }
      ],
      dimensionCheck: '180 Ns / 3600 N = 0,050 s = 50,0 ms.',
      roundingRule: 'Nilai eksak 50,0 ms.',
      finalAnswerDisplay: '50,0 ms',
      physicalInterpretation:
        'Sebesar 4620 Ns momentum dibawa peluru ke arah naik bidang dan 180 Ns sisanya dihilangkan oleh tarikan gravitasi ke bawah bidang selama 50,0 ms.'
    },
    narratorQuestionScript:
      'Soal nomor sembilan. Meriam enam ratus kilogram melaju awal sepuluh meter per sekon mendaki bidang miring licin tiga puluh tujuh derajat. Setelah menempuh tiga meter ke atas, meriam menembakkan peluru horizontal ke kiri bermomentum lima ribu tujuh ratus tujuh puluh lima newton sekon hingga berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Ambil arah mendaki bidang miring sebagai positif. Komponen berat sejajar bidang bernilai negatif ke bawah bidang, sehingga selama penembakan gaya berat justru membantu mengerem sistem.',
    narratorSolutionScript:
      'Laju meriam setelah naik tiga meter adalah akar seratus dikurangi tiga puluh enam, yaitu tepat delapan meter per sekon, dengan momentum empat ribu delapan ratus newton sekon. Proyeksi momentum peluru ke arah naik bidang adalah lima ribu tujuh ratus tujuh puluh lima kali nol koma delapan sama dengan empat ribu enam ratus dua puluh newton sekon. Selisih seratus delapan puluh newton sekon dipasok oleh perlambatan gravitasi tiga ribu enam ratus newton, menghasilkan nol koma nol lima nol sekon, atau lima puluh koma nol milidetik.'
  },
  {
    id: 10,
    code: 'LAT-10',
    title: 'Massa Peluru Berhingga (m Tidak Diabaikan)',
    tier: 'Analisis Kompleks',
    tierIndex: 4,
    learningStageRef: 6,
    conceptFocus: 'Akuntansi massa total sistem (M₀ + m) pada fase luncur & impuls gravitasi',
    questionText:
      'Sebuah badan meriam bermassa M₀ = 760 kg memuat sebuah peluru bermassa m = 40 kg (sehingga massa total sistem awal M_tot = M₀ + m). Sistem dilepaskan dari keadaan diam menuruni bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²). Setelah menempuh jarak ℓ = 12,0 m, peluru ditembakkan keluar secara horizontal ke depan dengan kelajuan v_p = 306,0 m/s terhadap tanah sehingga badan meriam tepat berhenti setelah tembakan berdurasi Δt. Anggap pusat massa peluru tetap berada di sistem selama Δt sehingga gaya gravitasi total bekerja pada massa (M₀ + m). Hitung durasi tembakan Δt (dalam milidetik, satu angka desimal).',
    unit: 'ms',
    hintText:
      'Karena peluru ikut meluncur bersama meriam sebelum ditembakkan, massa sistem adalah M_tot = M₀ + m = 800 kg, bukan 760 kg! Momentum peluru dihitung dari p = m v_p.',
    commonMistakeNote:
      'Kesalahan klasik di soal ini adalah memakai M₀ = 760 kg alih-alih massa total sistem 800 kg pada suku M v dan gaya berat total (M₀ + m) g sin 37°.',
    correctValue: 40.0,
    correctFormatted: '40,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'finite-bullet-mass',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        mass: 'M₀ = 760 kg + m = 40 kg',
        distance: 'ℓ = 12,0 m',
        angle: 'α = 37°',
        momentum: 'v_p = 306,0 m/s'
      }
    },
    fbd: {
      title: 'FBD Sistem Terpadu (Meriam M₀ + Peluru m)',
      inclineDeg: 37,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: true,
      bulletAngleDeg: 0,
      forces: [
        {
          id: 'fbd-mg',
          label: '(M₀+m)g',
          latexLabel: '(M_0+m)\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.9,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Gaya berat total sistem (800 kg × 10 = 8000 N), dengan komponen sejajar bidang 4800 N.'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.15,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal impulsif tegak lurus bidang selama 40,0 ms (N∥ = 0).'
        }
      ],
      xComponentSummary: '((M₀+m)g sin 37°) Δt = m v_p cos 37° − (M₀+m)v',
      yComponentSummary: 'N̄ = (M₀+m)g cos 37° + (m v_p sin 37°)/Δt'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 37,
      M: 800,
      g: 10.0,
      ell: 12.0,
      p: 12240,
      deltaTMs: 40.0,
      directionMotion: 'down',
      whatIsObserved:
        'Sistem gabungan 800 kg meluncur 12,0 m mencapai 12,0 m/s, lalu peluru 40 kg melesat horizontal 306,0 m/s dan meriam 760 kg berhenti dalam 40,0 ms.',
      physicsPrinciple: 'Teorema Impuls–Momentum Sistem Bermassa Total Konstan (M₀ + m)',
      whyItHappens:
        'Sebelum peluru meninggalkan laras, meriam dan peluru sama-sama ditarik gravitasi dengan massa total 800 kg.',
      mathematicalProofLatex: '\\Delta t = \\frac{40(306)(0,8) - 800(12,0)}{800(10)(0,6)} = \\frac{192}{4800} = 40,0\\text{ ms}'
    },
    solution: {
      known: ['M₀ = 760 kg', 'm = 40 kg → M_tot = 800 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'ℓ = 12,0 m', 'v_p = 306,0 m/s'],
      asked: 'Durasi tembakan Δt dalam milidetik.',
      principleName: 'Teorema Impuls–Momentum Sistem Dua Benda (M₀ + m)',
      principleFormulas: [
        {
          label: 'Impuls–Momentum Sistem Gabungan',
          latex: '(M_0 + m) g \\sin\\alpha\\,\\Delta t = m v_p \\cos\\alpha - (M_0 + m) v',
          spokenText: 'Massa total M nol tambah m dikali g sinus alfa delta t sama dengan m v peluru kosinus alfa dikurangi massa total kali v.'
        }
      ],
      physicalSituation:
        'Peluru memiliki massa signifikan 40 kg (5% dari total sistem). Baik saat meluncur turun maupun selama berada di dalam laras, massa sistem adalah M₀ + m = 800 kg.',
      phenomenonVisualization:
        'Peluru 40 kg membawa momentum besar 12.240 Ns berkat kelajuan 306,0 m/s.',
      fbdNote:
        'FBD sistem gabungan (meriam + peluru) memiliki gaya berat total (M₀ + m)g dan gaya normal N yang tetap tegak lurus bidang.',
      baseEquations: [
        {
          label: 'Momentum Peluru',
          latex: 'p = m v_p',
          spokenText: 'Momentum peluru p sama dengan m dikali v peluru.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Laju Sistem Sebelum Menembak',
          explanation: 'Percepatan pada bidang licin tidak bergantung massa:',
          latex: 'v = \\sqrt{2 g \\ell \\sin 37^\\circ} = \\sqrt{2(10,0)(12,0)(0,6)} = \\sqrt{144} = 12,0\\text{ m/s}'
        },
        {
          title: 'Menghitung Momentum Awal dan Akhir',
          explanation: 'Gunakan massa total 800 kg untuk momentum awal dan massa 40 kg untuk peluru:',
          latex: 'P_{\\text{awal},\\parallel} = (M_0 + m) v, \\qquad P_{\\text{akhir},\\parallel} = m v_p \\cos 37^\\circ'
        }
      ],
      substitution: [
        {
          explanation: 'Masukkan nilai numerik:',
          latex: 'P_{\\text{awal},\\parallel} = 800 \\times 12,0 = 9600\\text{ Ns}, \\quad p = 40 \\times 306,0 = 12240\\text{ Ns}'
        },
        {
          explanation: 'Proyeksi momentum peluru dan gaya berat total sejajar bidang:',
          latex: 'p \\cos 37^\\circ = 12240 \\times 0,8 = 9792\\text{ Ns}, \\quad (M_0+m)g\\sin 37^\\circ = 800(10)(0,6) = 4800\\text{ N}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung Δt:',
          latex: '\\Delta t = \\frac{9792 - 9600}{4800} = \\frac{192}{4800} = 0,040\\text{ s} = 40,0\\text{ ms}'
        }
      ],
      dimensionCheck: '192 Ns / 4800 N = 0,040 s = 40,0 ms.',
      roundingRule: 'Nilai eksak 40,0 ms.',
      finalAnswerDisplay: '40,0 ms',
      physicalInterpretation:
        'Bila massa peluru 40 kg lupa dimasukkan ke massa total sistem, kita akan mendapatkan waktu yang keliru jauh lebih besar karena mengira momentum awal meriam lebih kecil.'
    },
    narratorQuestionScript:
      'Soal nomor sepuluh, analisis kompleks dengan massa peluru berhingga. Badan meriam tujuh ratus enam puluh kilogram memuat peluru empat puluh kilogram, meluncur dari diam di bidang licin tiga puluh tujuh derajat sejauh dua belas meter. Peluru ditembakkan horizontal berkecepatan tiga ratus enam meter per sekon sehingga badan meriam tepat berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Ingat bahwa sistem gabungan terdiri dari badan meriam dan peluru dengan massa total delapan ratus kilogram. Gaya berat total sejajar bidang adalah empat ribu delapan ratus newton.',
    narratorSolutionScript:
      'Kelajuan sebelum menembak adalah akar dari dua kali sepuluh kali dua belas kali nol koma enam, yaitu dua belas meter per sekon. Momentum awal sistem delapan ratus kilogram adalah sembilan ribu enam ratus newton sekon. Sementara momentum peluru empat puluh kilogram adalah dua belas ribu dua ratus empat puluh newton sekon, yang proyeksi sejajar bidangnya sembilan ribu tujuh ratus sembilan puluh dua newton sekon. Selisih seratus sembilan puluh dua dibagi empat ribu delapan ratus menghasilkan nol koma nol empat nol sekon, atau empat puluh koma nol milidetik.'
  },
  {
    id: 11,
    code: 'LAT-11',
    title: 'Penembakan Bersudut Elevasi θ di Atas Horizontal',
    tier: 'Analisis Kompleks',
    tierIndex: 4,
    learningStageRef: 6,
    conceptFocus: 'Proyeksi sudut majemuk cos(α + θ) pada tembakan tidak horizontal',
    questionText:
      'Sebuah meriam bermassa M = 500 kg meluncur bebas dari keadaan diam menuruni bidang miring licin bersudut α = 30° terhadap horizontal (g = 10,0 m/s²) sejauh ℓ = 14,4 m. Saat mencapai jarak tersebut, meriam melepaskan tembakan berdurasi Δt = 24,0 ms dengan peluru bermassa dapat diabaikan yang ditembakkan pada sudut elevasi θ = 23° di atas bidang horizontal ke arah depan, sehingga meriam tepat berhenti. Diketahui cos 53° = 0,6 dan sin 53° = 0,8. Tentukan besar momentum peluru p yang dilepaskan (dalam satuan kNs, satu angka desimal).',
    unit: 'kNs',
    hintText:
      'Bidang miring turun bersudut α = 30° di bawah horizontal, sedangkan peluru ditembakkan θ = 23° di atas horizontal. Jadi sudut antara vektor momentum peluru dan arah turun bidang miring adalah α + θ = 53°!',
    commonMistakeNote:
      'Jangan hanya memakai cos 30° atau cos 23°! Gambarkan garis horizontal sebagai acuan: ke bawah 30° adalah bidang miring, ke atas 23° adalah laras peluru, sehingga sudut apit keduanya adalah 30° + 23° = 53°.',
    correctValue: 10.1,
    correctFormatted: '10,1',
    tolerance: 0.05,
    stimulus: {
      kind: 'angled-shot',
      alphaDeg: 30,
      directionMotion: 'down',
      bulletAngleDeg: 23,
      labels: {
        mass: 'M = 500 kg',
        distance: 'ℓ = 14,4 m',
        angle: 'α = 30°, θ = 23°',
        momentum: 'p = ? (Δt = 24,0 ms)'
      }
    },
    fbd: {
      title: 'FBD & Geometri Sudut Apit (α + θ = 53°)',
      inclineDeg: 30,
      directionMotion: 'down',
      showAxes: true,
      showShotForces: true,
      bulletAngleDeg: 23,
      forces: [
        {
          id: 'fbd-mg',
          label: 'Mg',
          latexLabel: 'M\\vec{g}',
          directionDeg: 270,
          relativeMagnitude: 0.8,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Komponen sejajar bidang Mg sin 30° = 2500 N.'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 60,
          relativeMagnitude: 1.2,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal impulsif sangat besar karena sudut keluar peluru menjauhi bidang sebesar 53° (sin 53° = 0,8).'
        },
        {
          id: 'fbd-pvec',
          label: 'p (23° di atas horiz.)',
          latexLabel: '\\vec{p}',
          directionDeg: 23,
          relativeMagnitude: 1.0,
          color: '#EAB308',
          phase: 'shot',
          description: 'Vektor momentum peluru membentuk sudut 30° + 23° = 53° terhadap sumbu turun bidang miring.'
        }
      ],
      xComponentSummary: 'p cos(30° + 23°) = Mv + (Mg sin 30°) Δt',
      yComponentSummary: 'N̄ = Mg cos 30° + (p sin 53°)/Δt'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 30,
      M: 500,
      g: 10.0,
      ell: 14.4,
      p: 10100,
      deltaTMs: 24.0,
      bulletAngleDeg: 23,
      directionMotion: 'down',
      whatIsObserved:
        'Peluru dilontarkan 23° di atas garis mendatar (53° di atas bidang miring 30°), sehingga diperlukan momentum p = 10,1 kNs untuk memberi proyeksi sejajar bidang 6,06 kNs.',
      physicsPrinciple: 'Dot Product Vektor Momentum terhadap Sumbu Miring: p cos(α + θ)',
      whyItHappens:
        'Semakin terangkat sudut tembak θ di atas horizontal, semakin kecil fraksi cos(α+θ) yang mengerem meriam, sehingga momentum peluru total harus lebih besar.',
      mathematicalProofLatex: 'p = \\frac{6000 + 60}{\\cos 53^\\circ} = \\frac{6060}{0,6} = 10100\\text{ Ns} = 10,1\\text{ kNs}'
    },
    solution: {
      known: ['M = 500 kg', 'α = 30° (sin 30° = 0,5)', 'θ = 23° di atas horizontal → α + θ = 53°', 'cos 53° = 0,6', 'g = 10,0 m/s²', 'ℓ = 14,4 m', 'Δt = 24,0 ms = 0,024 s'],
      asked: 'Besar momentum peluru p (dalam kNs).',
      principleName: 'Proyeksi Sudut Majemuk & Teorema Impuls–Momentum Sejajar Bidang',
      principleFormulas: [
        {
          label: 'Proyeksi Vektor Peluru',
          latex: 'p_\\parallel = \\vec{p} \\cdot \\hat{u}_\\parallel = p \\cos(\\alpha + \\theta)',
          spokenText: 'Komponen momentum peluru sejajar bidang sama dengan p kosinus alfa ditambah teta.'
        }
      ],
      physicalSituation:
        'Meriam menembak ke arah atas-depan sebesar 23° terhadap horizontal, sedangkan meriam meluncur ke kanan-bawah sebesar 30° terhadap horizontal.',
      phenomenonVisualization:
        'Sebagian besar energi dorong tembakan (komponen sin 53° = 0,8) menekan meriam masuk ke bidang miring dan ditahan gaya normal, hanya 60% momentum yang menghentikan meriam.',
      fbdNote:
        'Karena bidang licin, N∥ = 0 tidak terpengaruh oleh meningkatnya komponen tegak lurus peluru.',
      baseEquations: [
        {
          label: 'Persamaan Impuls–Momentum',
          latex: 'p \\cos(\\alpha + \\theta) = M v + (M g \\sin\\alpha)\\,\\Delta t',
          spokenText: 'p kosinus alfa tambah teta sama dengan M v ditambah M g sinus alfa kali delta t.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menentukan Laju Sebelum Menembak',
          explanation: 'Gunakan GLBB pada bidang miring 30°:',
          latex: 'v = \\sqrt{2 \\times 10,0 \\times 14,4 \\times 0,5} = \\sqrt{144} = 12,0\\text{ m/s}'
        },
        {
          title: 'Menentukan Sudut Proyeksi Total',
          explanation: 'Arah peluru (+23°) dan arah turun bidang (−30°) terpisah sudut α + θ = 53°:',
          latex: 'p_\\parallel = p \\cos 53^\\circ = 0,6\\,p'
        }
      ],
      substitution: [
        {
          explanation: 'Hitung momentum awal Mv dan impuls gravitasi:',
          latex: 'M v = 500 \\times 12,0 = 6000\\text{ Ns}, \\quad (M g \\sin 30^\\circ)\\,\\Delta t = 500(10)(0,5)(0,024) = 60\\text{ Ns}'
        }
      ],
      calculation: [
        {
          explanation: 'Selesaikan untuk p dalam Ns lalu konversikan ke kNs:',
          latex: '0,6\\,p = 6000 + 60 = 6060\\text{ Ns} \\implies p = \\frac{6060}{0,6} = 10100\\text{ Ns} = 10,1\\text{ kNs}'
        }
      ],
      dimensionCheck: 'Ns / tak-berdimensi = Ns → dibagi 1000 menghasilkan kNs.',
      roundingRule: 'Hasil eksak 10,1 kNs.',
      finalAnswerDisplay: '10,1 kNs',
      physicalInterpretation:
        'Tembakan mendongak 23° kurang efisien untuk mengerem meriam dibandingkan tembakan mendatar, sehingga membutuhkan momentum peluru sebesar 10,1 kNs.'
    },
    narratorQuestionScript:
      'Soal nomor sebelas. Meriam lima ratus kilogram meluncur di bidang licin tiga puluh derajat sejauh empat belas koma empat meter. Peluru ditembakkan selama dua puluh empat milidetik pada sudut elevasi dua puluh tiga derajat di atas horizontal ke depan hingga meriam berhenti. Hitung besar momentum peluru dalam kilonewton sekon.',
    narratorFbdScript:
      'Perhatikan sudut antara arah tembak peluru dan sumbu bidang miring. Bidang menurun tiga puluh derajat dari horizontal, dan laras mendongak dua puluh tiga derajat di atas horizontal, maka sudut apit keduanya adalah tiga puluh ditambah dua puluh tiga sama dengan lima puluh tiga derajat.',
    narratorSolutionScript:
      'Kelajuan sebelum tembakan adalah akar dua kali sepuluh kali empat belas koma empat kali setengah, yaitu dua belas meter per sekon. Jadi M v adalah enam ribu newton sekon, dan impuls gravitasi selama dua puluh empat milidetik adalah enam puluh newton sekon. Karena p kosinus lima puluh tiga derajat sama dengan enam ribu enam puluh newton sekon dengan kosinus lima puluh tiga sama dengan nol koma enam, maka momentum peluru p adalah sepuluh ribu seratus newton sekon, atau sepuluh koma satu kilonewton sekon.'
  },
  {
    id: 12,
    code: 'LAT-12',
    title: 'Gaya Dorong Pulsa Segitiga F(t) Selama Penembakan',
    tier: 'Analisis Kompleks',
    tierIndex: 4,
    learningStageRef: 6,
    conceptFocus: 'Menghubungkan integral kurva gaya dorong F(t) dengan impuls gravitasi dalam Δt',
    questionText:
      'Sebuah meriam bermassa M = 800 kg meluncur bebas dari keadaan diam menuruni bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²) sejauh ℓ = 12,0 m. Pada saat itu, meriam melepaskan tembakan horizontal ke depan berdurasi Δt dengan besar gaya dorong gas terhadap peluru berbentuk pulsa segitiga simetris F(t) yang memiliki nilai puncak F_maks = 412 kN (nol di t = 0 dan t = Δt). Akibat tembakan ini meriam tepat berhenti (anggap massa peluru dapat diabaikan). Hitung durasi tembakan Δt tersebut (dalam satuan milidetik, satu angka desimal).',
    unit: 'ms',
    hintText:
      'Impuls total yang diterima peluru sama dengan luas di bawah grafik gaya terhadap waktu: p = ∫₀^Δt F(t) dt = ½ F_maks Δt. Substitusikan p ini ke persamaan (Mg sin 37°) Δt = p cos 37° − Mv lalu selesaikan untuk Δt!',
    commonMistakeNote:
      'Jangan lupa faktor ½ untuk luas pulsa segitiga! Jika kamu memakai p = F_maks Δt (persegi panjang), hasilnya akan meleset jauh.',
    correctValue: 60.0,
    correctFormatted: '60,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'pulse-force',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      showPulseInset: true,
      labels: {
        mass: 'M = 800 kg',
        distance: 'ℓ = 12,0 m',
        angle: 'α = 37°',
        momentum: 'F_maks = 412 kN (segitiga)'
      }
    },
    fbd: {
      title: 'FBD Meriam Saat Menerima Pulsa Gaya Segitiga F(t)',
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
          relativeMagnitude: 0.75,
          color: '#1D4ED8',
          phase: 'all',
          description: 'Komponen sejajar bidang Mg sin 37° = 4800 N konstan sepanjang Δt.'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.2,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal juga membentuk puncak segitiga seiring lonjakan F(t), tetapi N∥ tetap nol.'
        },
        {
          id: 'fbd-recoil',
          label: 'F(t) reaksi',
          latexLabel: '\\vec{F}(t)',
          directionDeg: 180,
          relativeMagnitude: 1.05,
          color: '#DC2626',
          phase: 'shot',
          description: 'Gaya internal aksi-reaksi naik linear ke 412 kN pada t = Δt/2 lalu turun linear ke nol.'
        }
      ],
      xComponentSummary: '(½ F_maks cos 37° − Mg sin 37°) Δt = Mv',
      yComponentSummary: '∫ N(t) dt = Mg cos 37° Δt + ½ F_maks Δt sin 37°'
    },
    animation: {
      mode: 'triangle-pulse',
      alphaDeg: 37,
      M: 800,
      g: 10.0,
      ell: 12.0,
      p: 12360,
      deltaTMs: 60.0,
      directionMotion: 'down',
      thrustShape: 'triangle',
      whatIsObserved:
        'Kurva gaya normal N(t) membentuk puncak segitiga simetris di selang 60,0 ms, sedangkan laju meriam meluncur halus (kurva parabolik-S) hingga tepat nol.',
      physicsPrinciple: 'Integral Impuls Kurva F(t) = ½ F_maks Δt & Teorema Impuls–Momentum',
      whyItHappens:
        'Baik momentum peluru p maupun impuls gravitasi sama-sama berbanding lurus dengan Δt, membentuk persamaan aljabar linear sederhana.',
      mathematicalProofLatex: '\\Delta t = \\frac{M v}{\\frac{1}{2} F_{\\text{maks}} \\cos 37^\\circ - M g \\sin 37^\\circ} = \\frac{9600}{160000} = 60,0\\text{ ms}'
    },
    solution: {
      known: ['M = 800 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'ℓ = 12,0 m', 'F_maks = 412 kN = 412.000 N (pulsa segitiga)'],
      asked: 'Durasi tembakan Δt dalam milidetik.',
      principleName: 'Integral Gaya–Waktu & Teorema Impuls–Momentum Sejajar Bidang',
      principleFormulas: [
        {
          label: 'Momentum dari Pulsa Segitiga',
          latex: 'p = \\int_0^{\\Delta t} F(t)\\,dt = \\frac{1}{2} F_{\\text{maks}}\\,\\Delta t',
          spokenText: 'Momentum peluru p sama dengan setengah dikali F maksimum dikali delta t.'
        }
      ],
      physicalSituation:
        'Alih-alih diberi nilai p secara langsung, soal memberikan profil gaya tembak terhadap waktu yang berbentuk segitiga beramplitudo 412 kN.',
      phenomenonVisualization:
        'Selama t dari 0 hingga Δt, gaya reaksi meningkat lalu mereda, namun luas total di bawah kurva menentukan momentum akhir peluru.',
      fbdNote:
        'Meski F(t) berubah setiap saat, F(t) adalah gaya internal antara meriam dan peluru sehingga hanya muncul pada momentum akhir peluru.',
      baseEquations: [
        {
          label: 'Substitusi ke Impuls–Momentum Sejajar Bidang',
          latex: '(M g \\sin\\alpha)\\,\\Delta t = \\left(\\frac{1}{2} F_{\\text{maks}}\\,\\Delta t\\right)\\cos\\alpha - M v',
          spokenText: 'M g sinus alfa delta t sama dengan setengah F maksimum delta t kosinus alfa dikurangi M v.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Laju Meriam Sebelum Menembak',
          explanation: 'Gunakan v = √(2 g ℓ sin 37°):',
          latex: 'v = \\sqrt{2 \\times 10,0 \\times 12,0 \\times 0,6} = 12,0\\text{ m/s} \\implies M v = 9600\\text{ Ns}'
        },
        {
          title: 'Mengisolasi Δt dari Persamaan Linear',
          explanation: 'Kumpulkan semua suku Δt di satu sisi:',
          latex: '\\Delta t \\left(\\frac{1}{2} F_{\\text{maks}} \\cos 37^\\circ - M g \\sin 37^\\circ\\right) = M v'
        }
      ],
      substitution: [
        {
          explanation: 'Masukkan F_maks = 412.000 N dan M g sin 37° = 4800 N:',
          latex: '\\frac{1}{2} (412000)(0,8) = 164800\\text{ N}, \\quad 164800 - 4800 = 160000\\text{ N}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung Δt:',
          latex: '\\Delta t = \\frac{9600}{160000} = 0,060\\text{ s} = 60,0\\text{ ms}'
        }
      ],
      dimensionCheck: 'Ns / N = s → × 1000 = ms.',
      roundingRule: 'Hasil eksak 60,0 ms.',
      finalAnswerDisplay: '60,0 ms',
      physicalInterpretation:
        'Total momentum yang dibawa peluru adalah ½ × 412.000 × 0,060 = 12.360 Ns, yang proyeksinya 9888 Ns mengimbangi Mv = 9600 Ns plus impuls gravitasi 288 Ns.'
    },
    narratorQuestionScript:
      'Soal nomor dua belas. Meriam delapan ratus kilogram meluncur dua belas meter di bidang miring licin tiga puluh tujuh derajat. Meriam menembak horizontal dengan profil gaya pulsa segitiga simetris berpuncak empat ratus dua belas kilonewton hingga meriam berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Meskipun gaya internal tembakan berubah terhadap waktu mengikuti grafik segitiga, gaya normal tetap nol di sumbu sejajar bidang. Satu-satunya gaya luar sejajar bidang tetap M g sinus tiga puluh tujuh derajat.',
    narratorSolutionScript:
      'Momentum awal meriam sebelum menembak adalah delapan ratus kali dua belas sama dengan sembilan ribu enam ratus newton sekon. Sementara momentum peluru sama dengan luas segitiga gaya terhadap waktu, yaitu setengah kali empat ratus dua belas ribu kali delta t. Kalikan dengan kosinus tiga puluh tujuh derajat sebesar nol koma delapan, menghasilkan seratus enam puluh empat ribu delapan ratus kali delta t. Dikurangi gaya berat sejajar bidang empat ribu delapan ratus kali delta t, tersisa seratus enam puluh ribu delta t sama dengan sembilan ribu enam ratus. Jadi delta t adalah nol koma nol enam nol sekon, atau enam puluh koma nol milidetik.'
  },
  {
    id: 13,
    code: 'LAT-13',
    title: 'Pelontaran Pegas di Puncak Bidang Miring + Impuls Tembakan',
    tier: 'Tantangan Olimpiade',
    tierIndex: 5,
    learningStageRef: 7,
    conceptFocus: 'Gabungan energi potensial pegas, gravitasi bidang miring, dan teorema impuls-momentum',
    questionText:
      'Di puncak sebuah bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²), sebuah meriam bermassa M = 500 kg menempel pada sebuah pegas ideal berkonstanta k = 9,0 kN/m yang tertekan sejauh x₀ = 2,0 m dari panjang alaminya (meriam tidak terikat pada pegas). Ketika pegas dilepaskan dari keadaan diam, meriam terdorong menuruni bidang miring. Setelah meriam menempuh jarak total ℓ = 6,0 m dari posisi awalnya (sudah terlepas dari pegas), meriam melepaskan tembakan horizontal ke depan dengan momentum p = 7680 Ns sehingga meriam tepat berhenti. Anggap massa peluru dapat diabaikan. Hitung durasi tembakan Δt tersebut (dalam satuan milidetik, satu angka desimal).',
    unit: 'ms',
    hintText:
      'Gunakan Kekekalan Energi Mekanik untuk mencari laju meriam di jarak ℓ = 6,0 m: ½ k x₀² + Mg ℓ sin 37° = ½ M v². Setelah mendapat v, terapkan persamaan impuls-momentum seperti Soal 15!',
    commonMistakeNote:
      'Jangan menggunakan GLBB a = g sin 37° secara langsung dari v₀ = 0! Selama x₀ = 2,0 m pertama, gaya pegas yang berubah-ubah bekerja mendorong meriam, jadi wajib gunakan Kekekalan Energi Mekanik.',
    correctValue: 48.0,
    correctFormatted: '48,0',
    tolerance: 0.1,
    stimulus: {
      kind: 'spring-incline',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      showSpring: true,
      labels: {
        mass: 'M = 500 kg',
        distance: 'ℓ = 6,0 m',
        angle: 'α = 37°',
        momentum: 'p = 7680 Ns',
        extra: 'k = 9,0 kN/m, x₀ = 2,0 m'
      }
    },
    fbd: {
      title: 'FBD Fase Tembakan Setelah Meriam Lepas dari Pegas',
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
          description: 'Pada jarak ℓ = 6,0 m, pegas sudah lepas, sehingga hanya gravitasi (Mg sin 37° = 3000 N) yang memberi impuls luar sejajar bidang.'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.15,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal impulsif tegak lurus bidang selama 48,0 ms.'
        }
      ],
      xComponentSummary: '½ k x₀² + Mgℓ sin α = ½ Mv² → (Mg sin α) Δt = p cos α − Mv',
      yComponentSummary: 'N̄ = Mg cos 37° + (p sin 37°)/Δt'
    },
    animation: {
      mode: 'spring-launch',
      alphaDeg: 37,
      M: 500,
      g: 10.0,
      ell: 6.0,
      p: 7680,
      deltaTMs: 48.0,
      springK: 9000,
      springCompression: 2.0,
      directionMotion: 'down',
      whatIsObserved:
        'Energi elastis pegas 18 kJ dan penurunan potensial gravitasi 18 kJ bergabung mempercepat meriam hingga 12,0 m/s sebelum tembakan 48,0 ms menghentikannya.',
      physicsPrinciple: 'Kekekalan Energi Mekanik (Pra-Tembakan) + Impuls–Momentum (Saat Tembakan)',
      whyItHappens:
        'Energi mekanik kekal di sepanjang lintasan licin hingga sesaat sebelum tembakan; saat ledakan terjadi, berganti ke analisis impuls-momentum.',
      mathematicalProofLatex: 'v = 12,0\\text{ m/s} \\implies \\Delta t = \\frac{7680(0,8) - 500(12,0)}{500(10)(0,6)} = \\frac{144}{3000} = 48,0\\text{ ms}'
    },
    solution: {
      known: ['M = 500 kg', 'k = 9,0 kN/m = 9000 N/m', 'x₀ = 2,0 m', 'ℓ = 6,0 m', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'p = 7680 Ns'],
      asked: 'Durasi tembakan Δt dalam milidetik.',
      principleName: 'Kekekalan Energi Mekanik & Teorema Impuls–Momentum Sejajar Bidang',
      principleFormulas: [
        {
          label: 'Kekekalan Energi Sebelum Menembak',
          latex: '\\frac{1}{2} k x_0^2 + M g \\ell \\sin\\alpha = \\frac{1}{2} M v^2',
          spokenText: 'Setengah k x nol kuadrat ditambah M g el sinus alfa sama dengan setengah M v kuadrat.'
        },
        {
          label: 'Impuls–Momentum Saat Tembakan',
          latex: '(M g \\sin\\alpha)\\,\\Delta t = p \\cos\\alpha - M v',
          spokenText: 'M g sinus alfa delta t sama dengan p kosinus alfa dikurangi M v.'
        }
      ],
      physicalSituation:
        'Pada 2,0 m pertama, gaya pegas non-konstan bekerja mendorong meriam. Pada jarak 6,0 m, meriam sudah bebas dari pegas dan hanya dipengaruhi gravitasi serta gaya normal.',
      phenomenonVisualization:
        'Pemilihan metode energi di fase pertama menghindari integral gaya pegas yang rumit dan langsung memberi v = 12,0 m/s.',
      fbdNote:
        'Saat tembakan di ℓ = 6,0 m, pegas tidak lagi menyentuh meriam sehingga gaya pegas = 0.',
      baseEquations: [
        {
          label: 'Energi Kinetik Sebelum Menembak',
          latex: 'E_k = \\frac{1}{2} k x_0^2 + M g \\ell \\sin 37^\\circ',
          spokenText: 'Energi kinetik sama dengan energi potensial pegas ditambah perubahan energi potensial gravitasi.'
        }
      ],
      derivationSteps: [
        {
          title: 'Menghitung Kelajuan v dari Kekekalan Energi',
          explanation: 'Evaluasi energi pegas dan energi gravitasi:',
          latex: '\\frac{1}{2}(9000)(2,0)^2 + 500(10,0)(6,0)(0,6) = 18000 + 18000 = 36000\\text{ J}'
        },
        {
          title: 'Mencari v dan Momentum Awal',
          explanation: 'Dari ½ (500) v² = 36000:',
          latex: '250\\,v^2 = 36000 \\implies v^2 = 144 \\implies v = 12,0\\text{ m/s}, \\quad M v = 6000\\text{ Ns}'
        }
      ],
      substitution: [
        {
          explanation: 'Terapkan persamaan impuls-momentum sejajar bidang saat tembakan:',
          latex: 'p \\cos 37^\\circ = 7680 \\times 0,8 = 6144\\text{ Ns}, \\quad M g \\sin 37^\\circ = 500 \\times 10,0 \\times 0,6 = 3000\\text{ N}'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung durasi tembakan Δt:',
          latex: '\\Delta t = \\frac{6144 - 6000}{3000} = \\frac{144}{3000} = 0,048\\text{ s} = 48,0\\text{ ms}'
        }
      ],
      dimensionCheck: 'Energi dalam Joule → v dalam m/s → 144 Ns / 3000 N = 0,048 s = 48,0 ms.',
      roundingRule: 'Nilai eksak 48,0 ms.',
      finalAnswerDisplay: '48,0 ms',
      physicalInterpretation:
        'Soal ini menguji kemampuan siswa memadukan dua hukum kekekalan/teorema berbeda pada dua fase yang tepat: energi mekanik saat ada gaya konservatif pegas, lalu impuls-momentum saat terjadi ledakan tembakan.'
    },
    narratorQuestionScript:
      'Soal nomor tiga belas, tantangan olimpiade. Meriam lima ratus kilogram menekan pegas sembilan kilonewton per meter sejauh dua meter di puncak bidang miring licin tiga puluh tujuh derajat. Setelah dilepas dan menempuh jarak total enam meter, meriam menembak horizontal dengan momentum tujuh ribu enam ratus delapan puluh newton sekon hingga berhenti. Hitung durasi tembakan dalam milidetik.',
    narratorFbdScript:
      'Ketika menempuh jarak enam meter, meriam sudah terlepas dari pegas, sehingga saat penembakan gaya luar sejajar bidang hanya berasal dari komponen berat tiga ribu newton.',
    narratorSolutionScript:
      'Gunakan kekekalan energi mekanik sebelum menembak. Energi potensial pegas setengah kali sembilan ribu kali empat sama dengan delapan belas ribu joule, ditambah energi potensial gravitasi lima ratus kali sepuluh kali enam kali nol koma enam juga delapan belas ribu joule. Total energi kinetiknya tiga puluh enam ribu joule, menghasilkan kelajuan dua belas meter per sekon atau momentum awal enam ribu newton sekon. Proyeksi momentum peluru adalah tujuh ribu enam ratus delapan puluh kali nol koma delapan sama dengan enam ribu seratus empat puluh empat newton sekon. Selisih seratus empat puluh empat dibagi tiga ribu newton menghasilkan empat puluh delapan koma nol milidetik.'
  },
  {
    id: 14,
    code: 'LAT-14',
    title: 'Usaha Gaya Reaksi Tembakan Terhadap Meriam',
    tier: 'Tantangan Olimpiade',
    tierIndex: 5,
    learningStageRef: 7,
    conceptFocus: 'Pergeseran meriam Δs selama durasi tembakan Δt & Teorema Usaha–Energi pada meriam',
    questionText:
      'Sebuah meriam bermassa M = 500 kg meluncur bebas dari keadaan diam menuruni bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²). Setelah menempuh jarak ℓ = 12,0 m, meriam mulai melepaskan tembakan horizontal ke depan dengan gaya dorong konstan selama proses penembakan berlangsung, menghasilkan momentum peluru p = 7875 Ns sehingga meriam mengalami perlambatan konstan hingga tepat berhenti di akhir tembakan (anggap massa peluru dapat diabaikan). Tentukan usaha yang dilakukan oleh gaya reaksi tembakan terhadap meriam selama durasi tembakan berlangsung (dalam satuan kJ, sertakan tanda negatif, satu angka desimal).',
    unit: 'kJ',
    hintText:
      'Cari terlebih dahulu Δt = (p cos 37° − Mv)/(Mg sin 37°). Karena gaya dorong konstan, meriam melambat beraturan dari v ke 0 selama Δt sehingga bergeser sejauh Δs = ½ v Δt. Usaha gaya reaksi adalah W = (−F_reaksi cos 37°) Δs — perhatikan bahwa Δt akan saling meniadakan!',
    commonMistakeNote:
      'Jangan menjawab -½ M v² (-36,0 kJ)! Mengapa? Karena selama meriam bergeser Δs = 0,6 m saat ditembakkan, gravitasi juga melakukan usaha positif (+1,8 kJ), sehingga gaya reaksi harus melakukan usaha negatif lebih besar (-37,8 kJ)!',
    correctValue: -37.8,
    correctFormatted: '-37,8',
    tolerance: 0.1,
    stimulus: {
      kind: 'incline-cannon-shot',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      labels: {
        mass: 'M = 500 kg',
        distance: 'ℓ = 12,0 m + Δs',
        angle: 'α = 37°',
        momentum: 'p = 7875 Ns (F konstan)'
      }
    },
    fbd: {
      title: 'FBD Meriam Saja: Pergeseran Δs & Usaha Gaya Reaksi',
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
          description: 'Selama bergeser Δs = 0,6 m turun bidang, gravitasi melakukan usaha positif W_g = +1,8 kJ.'
        },
        {
          id: 'fbd-recoil',
          label: 'F_reaksi (konstan)',
          latexLabel: '\\vec{F}_{\\text{reaksi}}',
          directionDeg: 180,
          relativeMagnitude: 1.05,
          color: '#DC2626',
          phase: 'shot',
          description: 'Bekerja berlawanan arah perpindahan Δs dengan komponen −(p cos 37°)/Δt, melakukan usaha negatif −37,8 kJ.'
        }
      ],
      xComponentSummary: 'W_reaksi + W_g = ΔE_k = −½ Mv²',
      yComponentSummary: 'N ⊥ Δs → W_N = 0'
    },
    animation: {
      mode: 'cannon-stop',
      alphaDeg: 37,
      M: 500,
      g: 10.0,
      ell: 12.0,
      p: 7875,
      deltaTMs: 100.0,
      directionMotion: 'down',
      whatIsObserved:
        'Selama penembakan 100,0 ms, meriam masih bergeser sejauh Δs = 0,60 m sambil melambat beraturan hingga berhenti; energi kinetik 36,0 kJ plus kerja gravitasi 1,8 kJ seluruhnya diserap oleh gaya reaksi.',
      physicsPrinciple: 'Kopling Teorema Impuls–Momentum & Teorema Usaha–Energi pada Meriam',
      whyItHappens:
        'Pergeseran Δs = ½ v Δt membatalkan Δt pada gaya reaksi F_reaksi,∥ = −p cos α / Δt, menghasilkan identitas elegan W_reaksi = −½ p v cos α.',
      mathematicalProofLatex: 'W_{\\text{reaksi}} = -\\frac{p\\cos 37^\\circ}{\\Delta t}\\left(\\frac{1}{2}v\\,\\Delta t\\right) = -\\frac{1}{2} p v \\cos 37^\\circ = -37,8\\text{ kJ}'
    },
    solution: {
      known: ['M = 500 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'ℓ = 12,0 m', 'p = 7875 Ns (gaya dorong konstan)'],
      asked: 'Usaha gaya reaksi tembakan terhadap meriam W_reaksi (dalam kJ, bertanda negatif).',
      principleName: 'Teorema Impuls–Momentum & Teorema Usaha–Energi pada Benda Meriam',
      principleFormulas: [
        {
          label: 'Pergeseran Selama Penembakan (Perlambatan Konstan)',
          latex: '\\Delta s = \\frac{v + 0}{2}\\,\\Delta t = \\frac{1}{2} v\\,\\Delta t',
          spokenText: 'Pergeseran delta s selama tembakan sama dengan setengah v dikali delta t.'
        },
        {
          label: 'Identitas Usaha Gaya Reaksi Konstan',
          latex: 'W_{\\text{reaksi}} = -F_{\\text{reaksi},\\parallel}\\,\\Delta s = -\\frac{1}{2} p v \\cos\\alpha',
          spokenText: 'Usaha gaya reaksi sama dengan minus setengah dikali p dikali v dikali kosinus alfa.'
        }
      ],
      physicalSituation:
        'Meriam tidak berhenti secara instan di satu titik; dengan gaya reaksi konstan, meriam masih meluncur turun sejauh Δs = 0,60 m selama durasi tembakan 100,0 ms.',
      phenomenonVisualization:
        'Gaya normal tegak lurus lintasan sehingga W_N = 0. Gaya gravitasi memberi tambahan energi +1,8 kJ selama Δs, yang bersama energi kinetik awal 36,0 kJ dinetralkan oleh gaya reaksi.',
      fbdNote:
        'Tinjau meriam saja sebagai sistem untuk menghitung usaha gaya reaksi (gaya eksternal terhadap meriam).',
      baseEquations: [
        {
          label: 'Gaya Reaksi Sejajar Bidang',
          latex: 'F_{\\text{reaksi},\\parallel} = -\\frac{p \\cos\\alpha}{\\Delta t}',
          spokenText: 'Komponen gaya reaksi sejajar bidang sama dengan minus p kosinus alfa dibagi delta t.'
        }
      ],
      derivationSteps: [
        {
          title: 'Mencari Kelajuan Sebelum Menembak',
          explanation: 'Setelah menempuh ℓ = 12,0 m:',
          latex: 'v = \\sqrt{2 \\times 10,0 \\times 12,0 \\times 0,6} = 12,0\\text{ m/s}'
        },
        {
          title: 'Menghitung Durasi Δt dan Pergeseran Δs',
          explanation: 'Dengan Mv = 6000 Ns, p cos 37° = 6300 Ns, dan Mg sin 37° = 3000 N:',
          latex: '\\Delta t = \\frac{6300 - 6000}{3000} = 0,100\\text{ s} \\implies \\Delta s = \\frac{1}{2}(12,0)(0,100) = 0,60\\text{ m}'
        },
        {
          title: 'Menghitung Usaha Gaya Reaksi (Verifikasi Dua Metode)',
          explanation: 'Metode langsung W = F∥ Δs dan verifikasi via Teorema Usaha–Energi W_reaksi = ΔE_k − W_grav:',
          latex: 'F_{\\text{reaksi},\\parallel} = -\\frac{6300}{0,100} = -63000\\text{ N}'
        }
      ],
      substitution: [
        {
          explanation: 'Kalikan gaya reaksi sejajar bidang dengan pergeseran Δs = 0,60 m:',
          latex: 'W_{\\text{reaksi}} = (-63000\\text{ N})(0,60\\text{ m})'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung dalam Joule dan kJ, lalu cek silang dengan ΔE_k − W_g:',
          latex: 'W_{\\text{reaksi}} = -37800\\text{ J} = -37,8\\text{ kJ} \\quad (\\text{cek: } -36,0\\text{ kJ} - 1,8\\text{ kJ} = -37,8\\text{ kJ})'
        }
      ],
      dimensionCheck: '[N]·[m] = [J] → dibagi 1000 menghasilkan kJ.',
      roundingRule: 'Nilai eksak -37,8 kJ.',
      finalAnswerDisplay: '-37,8 kJ',
      physicalInterpretation:
        'Usaha gaya reaksi (−37,8 kJ) lebih besar mutlaknya daripada energi kinetik awal meriam (36,0 kJ) karena selama proses pengereman meriam tetap turun sejauh 0,60 m dan menerima tambahan usaha gravitasi +1,8 kJ.'
    },
    narratorQuestionScript:
      'Soal nomor empat belas, tantangan olimpiade. Meriam lima ratus kilogram meluncur dua belas meter di bidang miring licin tiga puluh tujuh derajat, lalu menembak horizontal dengan gaya konstan hingga momentum peluru tujuh ribu delapan ratus tujuh puluh lima newton sekon dan meriam berhenti. Hitung usaha yang dilakukan gaya reaksi tembakan terhadap meriam dalam kilojoule, sertakan tanda negatif.',
    narratorFbdScript:
      'Selama penembakan berlangsung, meriam masih bergeser sejauh delta s ke bawah bidang miring, sementara gaya reaksi tembakan berarah berlawanan gerak sehingga usahanya bertanda negatif.',
    narratorSolutionScript:
      'Laju sebelum tembakan adalah dua belas meter per sekon sehingga energi kinetik meriam tiga puluh enam kilojoule dan momentumnya enam ribu newton sekon. Karena p kosinus tiga puluh tujuh derajat adalah enam ribu tiga ratus newton sekon, diperoleh durasi tembakan nol koma satu nol nol sekon. Dengan perlambatan konstan, pergeseran selama menembak adalah setengah kali dua belas kali nol koma satu, yaitu nol koma enam nol meter. Maka gaya reaksi sejajar bidang sebesar minus enam puluh tiga ribu newton melakukan usaha minus tiga puluh tujuh koma delapan kilojoule. Hasil ini cocok persis dengan pengurangan energi kinetik tiga puluh enam kilojoule ditambah kerja gravitasi satu koma delapan kilojoule.'
  },
  {
    id: 15,
    code: 'LAT-15',
    title: 'Sintesis Olimpiade: Luncur Turun, Tembakan Pantulan, hingga Titik Balik',
    tier: 'Tantangan Olimpiade',
    tierIndex: 5,
    learningStageRef: 7,
    conceptFocus: 'Pelacakan lengkap 3 fase gerak (luncur turun, tembakan berdurasi Δt dengan pergeseran, pantulan naik)',
    questionText:
      'Sebuah meriam bermassa M = 400 kg mulai meluncur bebas dari keadaan diam di titik awal O menuruni bidang miring licin bersudut α = 37° (sin 37° = 0,6; cos 37° = 0,8; g = 10,0 m/s²). Setelah menempuh jarak ℓ = 12,0 m dari titik O, meriam melepaskan tembakan horizontal ke depan dengan gaya dorong konstan selama durasi Δt = 100,0 ms, melontarkan peluru bermassa dapat diabaikan dengan momentum p = 9300 Ns. Akibat tembakan ini meriam terpental bergerak naik kembali menyusuri bidang miring licin hingga mencapai titik balik tertingginya. Hitung jarak titik balik tertinggi tersebut diukur dari titik awal O sepanjang bidang miring (dalam satuan meter, satu angka desimal).',
    unit: 'm',
    hintText:
      'Lacak 3 fase dengan tertib! (1) Laju v₁ setelah ℓ = 12,0 m. (2) Laju pantulan naik v₂ tepat setelah Δt = 0,100 s lewat impuls-momentum, serta pergeseran turun Δs_tembak = ½(v₁ + v₂)Δt selama gaya dorong konstan! (3) Jarak naik s_naik = v₂² / (2g sin 37°) setelah tembakan selesai. Posisi akhir = ℓ + Δs_tembak − s_naik.',
    commonMistakeNote:
      'Perhatikan pergeseran selama tembakan Δs_tembak = ½(v₁ + v₂)Δt! Karena v₁ = +12,0 m/s dan v₂ = -6,0 m/s, rata-rata kecepatannya masih positif (+3,0 m/s), sehingga meriam sempat turun ekstra +0,30 m sebelum berbalik naik 3,00 m.',
    correctValue: 9.3,
    correctFormatted: '9,3',
    tolerance: 0.05,
    stimulus: {
      kind: 'rebound-incline',
      alphaDeg: 37,
      directionMotion: 'down',
      bulletAngleDeg: 0,
      showReboundArrow: true,
      labels: {
        mass: 'M = 400 kg',
        distance: 'ℓ = 12,0 m → titik balik?',
        angle: 'α = 37°',
        momentum: 'p = 9300 Ns (Δt = 100,0 ms)'
      }
    },
    fbd: {
      title: 'FBD 3 Fase Sintesis: Luncur → Tembakan Kuat → Pantulan Naik',
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
          description: 'Sepanjang ketiga fase, Mg sin 37° = 2400 N selalu mengarah turun bidang (mempercepat di Fase 1, mengurangi pantulan di Fase 2, mengerem di Fase 3).'
        },
        {
          id: 'fbd-normal',
          label: 'N(t)',
          latexLabel: '\\vec{N}(t)',
          directionDeg: 53,
          relativeMagnitude: 1.15,
          color: '#059669',
          phase: 'shot',
          description: 'Gaya normal impulsif di Fase 2 tetap tegak lurus bidang licin (N∥ = 0).'
        },
        {
          id: 'fbd-recoil',
          label: 'F_reaksi (konstan)',
          latexLabel: '\\vec{F}_{\\text{reaksi}}',
          directionDeg: 180,
          relativeMagnitude: 1.1,
          color: '#DC2626',
          phase: 'shot',
          description: 'Gaya reaksi konstan selama 0,100 s mengubah kecepatan meriam secara linear dari +12,0 m/s menjadi −6,0 m/s.'
        }
      ],
      xComponentSummary: 's_akhir = ℓ + ½(v₁ + v₂)Δt − v₂²/(2g sin 37°)',
      yComponentSummary: 'N∥ = 0 di seluruh 3 fase'
    },
    animation: {
      mode: 'rebound',
      alphaDeg: 37,
      M: 400,
      g: 10.0,
      ell: 12.0,
      p: 9300,
      deltaTMs: 100.0,
      directionMotion: 'down',
      whatIsObserved:
        'Meriam meluncur hingga 12,0 m, menembak selama 0,10 s sambil bergeser +0,30 m dan berbalik berkecepatan -6,0 m/s, lalu naik 3,00 m dan berhenti di posisi 9,3 m dari titik O.',
      physicsPrinciple: 'Integrasi Penuh GLBB + Impuls–Momentum Berhingga + Kinematika Titik Balik',
      whyItHappens:
        'Selama durasi tembakan 100 ms, kecepatan meriam berbalik tanda dari +12 m/s ke -6 m/s dengan percepatan konstan, menghasilkan pergeseran bersih ke bawah sebelum meluncur naik.',
      mathematicalProofLatex: 's_{\\text{akhir}} = 12,0 + 0,30 - 3,00 = 9,3\\text{ m}'
    },
    solution: {
      known: ['M = 400 kg', 'α = 37° (sin 37° = 0,6; cos 37° = 0,8)', 'g = 10,0 m/s²', 'ℓ = 12,0 m', 'Δt = 100,0 ms = 0,100 s', 'p = 9300 Ns (gaya dorong konstan)'],
      asked: 'Jarak titik balik tertinggi dari titik awal O (s_akhir dalam meter).',
      principleName: 'Analisis Kinematika 3-Fase & Teorema Impuls–Momentum Sejajar Bidang',
      principleFormulas: [
        {
          label: 'Fase 2 (Impuls–Momentum)',
          latex: 'M v_2 + p \\cos\\alpha - M v_1 = (M g \\sin\\alpha)\\,\\Delta t',
          spokenText: 'M v dua ditambah p kosinus alfa dikurangi M v satu sama dengan M g sinus alfa dikali delta t.'
        },
        {
          label: 'Pergeseran Selama Tembakan & Pantulan',
          latex: 's_{\\text{akhir}} = \\ell + \\frac{v_1 + v_2}{2}\\,\\Delta t - \\frac{v_2^2}{2 g \\sin\\alpha}',
          spokenText: 'Posisi akhir sama dengan el ditambah setengah v satu tambah v dua dikali delta t, dikurangi v dua kuadrat dibagi dua g sinus alfa.'
        }
      ],
      physicalSituation:
        'Tembakan peluru sangat besar sehingga membalikkan arah gerak meriam. Meriam mengalami tiga fase berurutan pada lintasan miring yang sama.',
      phenomenonVisualization:
        'Titik posisi s diukur dari titik O ke arah menuruni bidang miring (+). Titik balik tertinggi berada pada 9,3 m di bawah titik O (yaitu 2,7 m di atas titik mulai menembak).',
      fbdNote:
        'Di Fase 1 dan Fase 3 hanya bekerja Mg dan N; di Fase 2 ditambah gaya reaksi konstan.',
      baseEquations: [
        {
          label: 'Fase 1: Laju Tepat Sebelum Menembak',
          latex: 'v_1 = \\sqrt{2 g \\ell \\sin 37^\\circ}',
          spokenText: 'v satu sama dengan akar dua g el sinus tiga puluh tujuh derajat.'
        }
      ],
      derivationSteps: [
        {
          title: 'Fase 1 — Kecepatan Sebelum Tembakan',
          explanation: 'Meriam meluncur bebas sejauh 12,0 m:',
          latex: 'v_1 = \\sqrt{2(10,0)(12,0)(0,6)} = 12,0\\text{ m/s}'
        },
        {
          title: 'Fase 2 — Kecepatan Pantulan v₂ dan Pergeseran Δs_tembak',
          explanation: 'Gunakan impuls-momentum sumbu turun (+) untuk Δt = 0,100 s:',
          latex: '400\\,v_2 = 400(12,0) + 400(10,0)(0,6)(0,100) - 9300(0,8) = 4800 + 240 - 7440 = -2400\\text{ Ns}'
        },
        {
          title: 'Evaluasi v₂ dan Pergeseran Selama Tembakan',
          explanation: 'Karena gaya dorong konstan, percepatan meriam selama Δt konstan:',
          latex: 'v_2 = -6,0\\text{ m/s}, \\qquad \\Delta s_{\\text{tembak}} = \\frac{12,0 + (-6,0)}{2}(0,100) = +0,30\\text{ m}'
        },
        {
          title: 'Fase 3 — Jarak Naik Pascatembakan',
          explanation: 'Setelah tembakan selesai, meriam naik dengan perlambatan a = g sin 37° = 6,0 m/s² hingga v = 0:',
          latex: 's_{\\text{naik}} = \\frac{v_2^2}{2 g \\sin 37^\\circ} = \\frac{(-6,0)^2}{2(10,0)(0,6)} = \\frac{36}{12} = 3,00\\text{ m}'
        }
      ],
      substitution: [
        {
          explanation: 'Gabungkan seluruh perpindahan dari titik O:',
          latex: 's_{\\text{akhir}} = 12,0 + 0,30 - 3,00'
        }
      ],
      calculation: [
        {
          explanation: 'Hitung posisi akhir titik balik:',
          latex: 's_{\\text{akhir}} = 9,3\\text{ m}'
        }
      ],
      dimensionCheck: 'Seluruh suku dalam satuan meter [L].',
      roundingRule: 'Nilai eksak 9,3 m.',
      finalAnswerDisplay: '9,3 m',
      physicalInterpretation:
        'Meriam mencapai titik balik tertingginya pada jarak 9,3 m di bawah titik O (naik kembali 2,7 m dari lokasi pelepasan tembakan). Perhitungan ini menggabungkan kinematika GLBB, teorema impuls-momentum dengan durasi berhingga, dan pelacakan pergeseran fase transisi.'
    },
    narratorQuestionScript:
      'Soal nomor lima belas, tantangan puncak olimpiade. Meriam empat ratus kilogram meluncur dari diam di titik O pada bidang miring licin tiga puluh tujuh derajat sejauh dua belas meter. Lalu menembak horizontal dengan gaya konstan selama seratus milidetik bermomentum peluru sembilan ribu tiga ratus newton sekon sehingga meriam terpental naik hingga berhenti di titik balik tertinggi. Hitung jarak titik balik tersebut dari titik O dalam meter.',
    narratorFbdScript:
      'Sepanjang ketiga fase gerak, komponen gaya berat dua ribu empat ratus newton selalu mengarah ke bawah bidang miring, sementara gaya reaksi konstan saat tembakan membalikkan kecepatan meriam.',
    narratorSolutionScript:
      'Mari lacak tiga fase. Fase satu, di jarak dua belas meter kelajuan v satu adalah dua belas meter per sekon. Fase dua, lewat impuls momentum selama nol koma satu sekon, empat ratus v dua sama dengan empat ribu delapan ratus ditambah dua ratus empat puluh dikurangi tujuh ribu empat ratus empat puluh, menghasilkan v dua sama dengan minus enam meter per sekon. Karena gaya konstan, meriam masih bergeser turun rata-rata tiga meter per sekon selama nol koma satu sekon, yaitu plus nol koma tiga nol meter. Fase tiga, meriam meluncur naik dari enam meter per sekon hingga nol, menempuh jarak naik tiga puluh enam dibagi dua belas sama dengan tiga koma nol meter. Jadi jarak akhirnya dari titik O adalah dua belas ditambah nol koma tiga dikurangi tiga, yaitu sembilan koma tiga meter.'
  }
];
