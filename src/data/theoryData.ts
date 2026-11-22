import { FormulaHighlight } from '../types/physics';

export interface TheorySection {
  id: string;
  order: number;
  title: string;
  stageRef: number;
  summary: string;
  paragraphs: string[];
  keyPoints?: string[];
  formulas?: FormulaHighlight[];
  visualType?:
    | 'phenomenon-overview'
    | 'coordinate-axes'
    | 'vector-decomposition'
    | 'normal-impulse-spike'
    | 'energy-vs-impulse'
    | 'misconception-trap';
  narratorScript: string;
}

export interface LearningStage {
  stage: number;
  code: string;
  title: string;
  subtitle: string;
  goal: string;
  thinkingStrategy: string;
  recommendedProblemIds: number[];
}

export interface ConceptNode {
  id: string;
  title: string;
  category: 'Prasyarat' | 'Inti OSK 15' | 'Pendukung' | 'Aplikasi';
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  summary: string;
  equationLatex: string;
  connectedTo: string[];
  warningNote: string;
}

export const OSK_2026_PROBLEM_15_ANALYSIS = {
  sourceLabel: 'Soal Nomor 15 — OSK Fisika SMA 2026 (Bagian Momentum Linear)',
  originalText:
    'Sebuah meriam bermassa M = 0,8 ton mulai meluncur bebas menuruni bidang miring halus dengan sudut kemiringan α = 37° terhadap horizontal. Setelah meriam menempuh jarak ℓ = 8 m, sebuah tembakan dilepaskan, dan peluru meninggalkan meriam dalam arah horizontal dengan momentum p = 9890 Ns. Akibatnya, meriam berhenti. Dengan menganggap massa peluru dapat diabaikan dibandingkan massa meriam, durasi tembakan tersebut adalah ... milidetik.',
  mainConcept:
    'Teorema Impuls–Momentum Linear pada Sistem Terbuka/Terurai di Bidang Miring dengan Durasi Tembakan Berhingga (Δt > 0) dan Gaya Normal Impulsif.',
  physicsBranch: 'Mekanika Klasik — Dinamika Bidang Miring & Momentum Linear.',
  principlesUsed: [
    'Hukum II Newton & Kinematika GLBB pada bidang miring licin (atau Kekekalan Energi Mekanik)',
    'Pemilihan sistem koordinat miring (sumbu sejajar bidang ∥ dan tegak lurus bidang ⊥)',
    'Teorema Impuls–Momentum Linear pada arah sejajar bidang miring',
    'Analisis gaya impulsif (Gaya Normal N yang melonjak selama tembakan) vs gaya non-impulsif yang tetap memberi impuls selama Δt berhingga'
  ],
  quantitiesAndUnits: [
    { symbol: 'M', name: 'Massa meriam', value: '0,8 ton = 800 kg', unit: 'kg' },
    { symbol: 'α', name: 'Sudut kemiringan bidang', value: '37° (sin 37° = 0,6; cos 37° = 0,8)', unit: 'derajat' },
    { symbol: 'ℓ', name: 'Jarak luncur sebelum menembak', value: '8 m', unit: 'm' },
    { symbol: 'p', name: 'Besar momentum horizontal peluru', value: '9890 Ns', unit: 'Ns' },
    { symbol: 'Δt', name: 'Durasi tembakan (besaran dicari)', value: '32,4 ms (dengan g = 9,8 m/s²)', unit: 'ms' }
  ],
  keyEquations: [
    {
      label: 'Laju Meriam Sebelum Menembak',
      latex: 'v = \\sqrt{2 g \\ell \\sin\\alpha}',
      spokenText: 'Kelajuan meriam tepat sebelum menembak sama dengan akar dua dikali percepatan gravitasi dikali jarak luncur dikali sinus alfa.'
    },
    {
      label: 'Teorema Impuls-Momentum Sejajar Bidang',
      latex: '(M g \\sin\\alpha)\\,\\Delta t = p \\cos\\alpha - M v',
      spokenText: 'Impuls gaya berat sejajar bidang miring selama delta t sama dengan komponen momentum peluru sejajar bidang dikurangi momentum awal meriam.'
    },
    {
      label: 'Durasi Tembakan',
      latex: '\\Delta t = \\frac{p \\cos\\alpha - M \\sqrt{2 g \\ell \\sin\\alpha}}{M g \\sin\\alpha}',
      spokenText: 'Durasi tembakan delta t adalah selisih momentum peluru sejajar bidang terhadap momentum awal meriam, dibagi gaya berat sejajar bidang.'
    }
  ],
  fastestStrategy:
    'Jangan pernah memakai kekekalan momentum arah horizontal karena gaya normal N menjadi impulsif selama penembakan! Proyeksikan seluruh vektor momentum ke sumbu sejajar bidang miring (∥) sehingga gaya normal N otomatis hilang (N∥ = 0), lalu terapkan langsung I_eks,∥ = ΔP_sistem,∥ dengan gaya eksternal tunggal M g sin α.'
};

export const LEARNING_STAGES: LearningStage[] = [
  {
    stage: 1,
    code: 'TAHAP 1',
    title: 'Pemahaman Dasar',
    subtitle: 'Mengenali fenomena, istilah, besaran, dan satuan SI',
    goal: 'Memahami alur fisis dua fase (fase meluncur bebas & fase penembakan) serta mengonversi satuan ton, kNs, dan ms ke SI.',
    thinkingStrategy:
      'Sebelum menyentuh rumus, gambarlah posisi meriam di awal, sesaat sebelum menembak, dan tepat sesudah peluru keluar. Pastikan seluruh massa dalam kg dan waktu dalam sekon.',
    recommendedProblemIds: [1, 2]
  },
  {
    stage: 2,
    code: 'TAHAP 2',
    title: 'Pemahaman Konsep',
    subtitle: 'Memahami mengapa momentum horizontal TIDAK kekal',
    goal: 'Menguasai pemilihan kerangka sumbu miring (∥ dan ⊥) serta membedakan gaya normal impulsif dari komponen gaya berat.',
    thinkingStrategy:
      'Tanyakan selalu: "Gaya luar apa saja yang bekerja selama tembakan, dan di sumbu mana gaya tak-diketahui (seperti N) memiliki komponen nol?"',
    recommendedProblemIds: [2, 3, 5]
  },
  {
    stage: 3,
    code: 'TAHAP 3',
    title: 'Penerapan Rumus',
    subtitle: 'Menggunakan teorema impuls-momentum secara sistematis',
    goal: 'Mampu menuliskan P_awal, P_akhir, dan impuls eksternal ∫F_eks dt secara tertib tanpa melompati tanda vektor.',
    thinkingStrategy:
      'Tetapkan satu arah positif yang konsisten (misalnya menuruni bidang miring = positif), lalu proyeksikan semua vektor kecepatan, momentum, dan gaya ke sumbu tersebut.',
    recommendedProblemIds: [3, 4, 6]
  },
  {
    stage: 4,
    code: 'TAHAP 4',
    title: 'Visualisasi Fisika',
    subtitle: 'Membuktikan konsep lewat FBD, grafik gaya normal, & animasi',
    goal: 'Melihat lonjakan gaya normal N(t) secara visual serta membuktikan bagaimana selisih p cos α - Mv diisi oleh impuls gravitasi.',
    thinkingStrategy:
      'Gunakan Simulasi Fisika untuk mengubah sudut α dan momentum p; amati bagaimana grafik N(t) melonjak tajam saat Δt mengecil namun luas impuls sejajar bidang tetap ditentukan oleh M g sin α Δt.',
    recommendedProblemIds: [5, 7]
  },
  {
    stage: 5,
    code: 'TAHAP 5',
    title: 'Pemecahan Masalah',
    subtitle: 'Menyelesaikan variasi lintasan, pantulan, dan gesekan',
    goal: 'Menangani kasus meriam tidak berhenti (terpental naik), gerak mendaki bidang, dan hadirnya gaya gesek kinetik impulsif μ_k N(t).',
    thinkingStrategy:
      'Pada bidang kasar, lonjakan gaya normal akibat tembakan ikut memperbesar gaya gesek selama Δt! Integralkan f_k(t) = μ_k N(t) terlebih dahulu sebelum memasukkannya ke sumbu ∥.',
    recommendedProblemIds: [7, 8, 9]
  },
  {
    stage: 6,
    code: 'TAHAP 6',
    title: 'Analisis Olimpiade',
    subtitle: 'Menyelesaikan soal kompleks dengan penalaran matematis',
    goal: 'Menguasai massa peluru berhingga, sudut tembak elevasi θ, dan gaya dorong bergantung waktu F(t).',
    thinkingStrategy:
      'Tuliskan integral impuls ∫F(t) dt sebagai luas di bawah kurva F-t, dan gunakan aturan sudut majemuk cos(α + θ) untuk proyeksi vektor.',
    recommendedProblemIds: [10, 11, 12]
  },
  {
    stage: 7,
    code: 'TAHAP 7',
    title: 'Penguasaan Mandiri',
    subtitle: 'Menggabungkan energi mekanik, impuls-momentum, dan kinematika pascatembakan',
    goal: 'Menyelesaikan variasi tingkat tinggi secara cepat, akurat hingga satu angka desimal, dan memverifikasi kewajaran fisis.',
    thinkingStrategy:
      'Periksa selalu dimensi akhir ([M][L][T^-1] / [M][L][T^-2] = [T]) dan cek apakah p cos α memang lebih besar daripada Mv saat meriam meluncur turun hingga berhenti.',
    recommendedProblemIds: [13, 14, 15]
  }
];

export const CONCEPT_MAP_NODES: ConceptNode[] = [
  {
    id: 'prereq-kinematics',
    title: 'Kinematika GLBB & Energi di Bidang Miring',
    category: 'Prasyarat',
    x: 16,
    y: 22,
    summary:
      'Menentukan laju meriam tepat sebelum tembakan dilepaskan setelah menempuh jarak ℓ pada bidang miring licin atau kasar.',
    equationLatex: 'v = \\sqrt{2 g \\ell (\\sin\\alpha - \\mu_k \\cos\\alpha)}',
    connectedTo: ['core-axes', 'core-impulse'],
    warningNote: 'Jangan lupa memasukkan sudut kemiringan sin α; kecepatan di bidang miring bukan √(2gℓ).'
  },
  {
    id: 'prereq-vectors',
    title: 'Proyeksi Vektor 2D & Sumbu Miring',
    category: 'Prasyarat',
    x: 16,
    y: 74,
    summary:
      'Menguraikan vektor horizontal (peluru) dan vektor vertikal (gaya berat) ke sumbu sejajar (∥) dan tegak lurus (⊥) bidang miring.',
    equationLatex: 'p_\\parallel = p \\cos\\alpha, \\quad p_\\perp = p \\sin\\alpha',
    connectedTo: ['core-axes', 'app-angled'],
    warningNote: 'Jika peluru ditembakkan dengan sudut θ di atas horizontal, sudutnya terhadap arah turun bidang menjadi α + θ.'
  },
  {
    id: 'core-axes',
    title: 'Eliminasi Gaya Normal Impulsif via Sumbu Sejajar (∥)',
    category: 'Inti OSK 15',
    x: 46,
    y: 48,
    summary:
      'Kunci utama Soal 15 OSK 2026: karena bidang licin, gaya normal N selalu tegak lurus bidang (N∥ = 0) meskipun nilainya melonjak impulsif saat tembakan.',
    equationLatex: '\\int_0^{\\Delta t} N_\\parallel\\,dt = 0 \\quad \\text{(bidang licin)}',
    connectedTo: ['core-impulse', 'support-normal'],
    warningNote: 'Momentum arah horizontal (x) TIDAK kekal karena N memiliki komponen horizontal N sin α yang sangat besar dan tak diketahui!'
  },
  {
    id: 'core-impulse',
    title: 'Teorema Impuls–Momentum Sistem (Durasi Berhingga Δt)',
    category: 'Inti OSK 15',
    x: 74,
    y: 48,
    summary:
      'Menghubungkan perubahan momentum sistem (meriam + peluru) sejajar bidang dengan impuls gravitasi M g sin α · Δt selama proses tembakan.',
    equationLatex: '(M g \\sin\\alpha)\\,\\Delta t = p \\cos\\alpha - M v',
    connectedTo: ['app-angled', 'app-rough', 'app-work'],
    warningNote: 'Jangan mengasumsikan p cos α = Mv; selisih keduanya justru berasal dari impuls gravitasi selama Δt.'
  },
  {
    id: 'support-normal',
    title: 'Lonjakan Gaya Normal Rata-Rata (Sumbu ⊥)',
    category: 'Pendukung',
    x: 46,
    y: 16,
    summary:
      'Pada arah tegak lurus bidang, reaksi peluru menekan meriam ke bidang sehingga gaya normal melonjak jauh di atas M g cos α.',
    equationLatex: '\\bar{N} = M g \\cos\\alpha + \\frac{p \\sin\\alpha}{\\Delta t}',
    connectedTo: ['app-rough'],
    warningNote: 'Semakin singkat Δt, semakin besar gaya normal rata-rata N̄ yang menopang meriam.'
  },
  {
    id: 'app-rough',
    title: 'Gesekan Kinetik Impulsif (μk ≠ 0)',
    category: 'Aplikasi',
    x: 78,
    y: 18,
    summary:
      'Jika bidang kasar, gaya normal impulsif menimbulkan impuls gesek tambahan μk p sin α yang membantu memperlambat meriam.',
    equationLatex: 'J_f = \\mu_k (M g \\cos\\alpha\\,\\Delta t + p \\sin\\alpha)',
    connectedTo: [],
    warningNote: 'Gesekan selama tembakan tidak hanya μk M g cos α Δt, melainkan ikut membesar bersama N(t)!'
  },
  {
    id: 'app-angled',
    title: 'Variasi Sudut Tembak & Pulsa Gaya F(t)',
    category: 'Aplikasi',
    x: 78,
    y: 78,
    summary:
      'Menggeneralisasi arah tembak ke sudut θ terhadap horizontal dan gaya dorong non-konstan lewat integral p = ∫F(t) dt.',
    equationLatex: 'p_\\parallel = \\left(\\int_0^{\\Delta t} F(t)\\,dt\\right)\\cos(\\alpha + \\theta)',
    connectedTo: [],
    warningNote: 'Pastikan mengukur sudut θ dengan benar: di atas horizontal berarti menjauhi sumbu turun bidang (+θ).'
  },
  {
    id: 'app-work',
    title: 'Usaha Gaya Reaksi & Kinematika Pascatembakan',
    category: 'Aplikasi',
    x: 46,
    y: 82,
    summary:
      'Menganalisis pergeseran Δs selama tembakan, usaha negatif reaksi tembakan pada meriam, serta gerak pantulan naik jika meriam tidak tepat berhenti.',
    equationLatex: 'W_{\\text{reaksi}} = -\\frac{1}{2} p v \\cos\\alpha',
    connectedTo: [],
    warningNote: 'Selama Δt dengan gaya konstan, meriam tetap bergeser sejauh Δs = ½(v_awal + v_akhir)Δt.'
  }
];

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'bab-1',
    order: 1,
    title: 'Pengantar Fenomena Fisika Soal 15 OSK 2026',
    stageRef: 1,
    summary:
      'Mengapa peluru yang ditembakkan horizontal dari meriam yang meluncur di bidang miring dapat menghentikan meriam, dan mengapa tembakan tersebut harus memiliki durasi waktu Δt tertentu.',
    paragraphs: [
      'Bayangkan sebuah meriam berat bermassa M diletakkan di atas bidang miring licin tanpa gesekan. Begitu dilepaskan dari keadaan diam, gaya gravitasi menarik komponen berat sejajar bidang sehingga meriam meluncur turun makin cepat. Setelah menempuh jarak ℓ, meriam telah mengantongi momentum linear cukup besar ke arah menuruni bidang miring.',
      'Pada momen tersebut, meriam melepaskan tembakan: gas pembakaran mendorong peluru keluar secara horizontal ke depan (searah komponen mendatar gerak turun). Berdasarkan Hukum III Newton (aksi-reaksi), peluru memberikan gaya dorong balik (recoil) ke arah horizontal belakang terhadap meriam. Gaya dorong balik inilah yang mengerem meriam hingga berhenti.',
      'Keunikan Soal 15 OSK 2026 terletak pada pertanyaannya: kita tidak diminta mencari kecepatan, melainkan DURASI TEMBAKAN Δt. Mengapa durasi Δt dapat dihitung dari data momentum? Karena selama peluru didorong keluar di dalam laras, gravitasi TIDAK berhenti bekerja! Selama selang waktu Δt yang singkat itu, komponen gravitasi terus menyumbang impuls tambahan menuruni bidang miring.'
    ],
    visualType: 'phenomenon-overview',
    narratorScript:
      'Selamat datang di modul teori bersama Mister Jo. Pada bab pertama, kita memahami fenomena Soal 15 OSK 2026. Meriam bermassa M meluncur menuruni bidang miring licin sepanjang el sehingga memiliki laju v. Saat peluru ditembakkan mendatar ke depan, gaya reaksi mendorong meriam ke belakang hingga meriam berhenti. Kunci pentingnya: penembakan berlangsung selama durasi berhingga delta t, dan selama delta t itulah gaya gravitasi tetap bekerja memberi impuls ke bawah bidang miring.'
  },
  {
    id: 'bab-2',
    order: 2,
    title: 'Pengetahuan Prasyarat yang Wajib Dikuasai',
    stageRef: 1,
    summary:
      'Empat fondasi mekanika kelas X–XI yang menopang keseluruhan analisis Soal 15.',
    paragraphs: [
      'Sebelum menurunkan persamaan lengkap, pastikan kamu telah fasih dengan empat konsep prasyarat berikut: gerak lurus berubah beraturan (GLBB) atau kekekalan energi mekanik, penguraian vektor pada segitiga siku-siku (terutama sudut istimewa olimpiade 37° dan 53°), Hukum II dan III Newton, serta definisi dasar impuls dan momentum linear.',
      'Pada soal olimpiade Indonesia, sudut 37° dan 53° hampir selalu mengacu pada segitiga Pythagoras 3-4-5, yaitu sin 37° = 0,6 dan cos 37° = 0,8. Namun kita tetap harus teliti membaca informasi sudut pada soal agar tidak keliru menentukan sisi depan dan sisi samping.'
    ],
    keyPoints: [
      'GLBB tanpa waktu: v² = v₀² + 2 a ℓ (atau Kekekalan Energi Mekanik: ½ M v² = M g h).',
      'Segitiga 3-4-5: sin 37° = 0,6; cos 37° = 0,8; sin 53° = 0,8; cos 53° = 0,6.',
      'Momentum linear p = m v adalah besaran VEKTOR — arah menentukan tanda aljabarnya.',
      'Impuls I = ∫ F dt sama dengan perubahan momentum total sistem dalam selang waktu yang sama.'
    ],
    narratorScript:
      'Bab kedua membahas prasyarat utama. Kamu harus menguasai gerak lurus berubah beraturan untuk mencari laju meriam sebelum menembak, penguraian vektor pada sudut tiga puluh tujuh derajat di mana sinus tiga puluh tujuh derajat adalah nol koma enam dan kosinusnya nol koma delapan, serta memahami bahwa momentum dan impuls adalah besaran vektor.'
  },
  {
    id: 'bab-3',
    order: 3,
    title: 'Definisi Besaran Fisika dan Makna Fisis Setiap Variabel',
    stageRef: 1,
    summary:
      'Membedah arti fisis M, α, ℓ, p, m_peluru, N, dan Δt agar tidak tertukar saat membaca soal.',
    paragraphs: [
      'Dalam soal fisika olimpiade, satu huruf keliru dimaknai akan merusak seluruh persamaan. Perhatikan pembedaan tegas antara massa meriam M (skala ratusan kilogram atau ton), massa peluru m_p (dapat diabaikan bila m_p ≪ M, namun momentumnya p = m_p v_p tetap besar karena laju peluru sangat tinggi!), dan panjang lintasan miring ℓ (bukan ketinggian vertikal h!).',
      'Jarak ℓ diukur sepanjang permukaan bidang miring. Oleh karena itu, penurunan ketinggian vertikal meriam saat meluncur sejauh ℓ adalah h = ℓ sin α. Sementara itu, besaran p adalah besar momentum peluru terhadap kerangka tanah (kerangka inersia laboratorium) sesaat setelah meninggalkan laras.'
    ],
    keyPoints: [
      'M (kg): massa meriam. Konversi wajib: 1 ton = 1000 kg.',
      'ℓ (m): jarak tempuh menyusuri permukaan miring (tinggi jatuh vertikalnya h = ℓ sin α).',
      'p (Ns): besar momentum peluru terhadap pengamat diam di tanah, berarah horizontal.',
      'Δt (s atau ms): durasi interaksi tembakan di dalam laras. Konversi: 1 s = 1000 ms.',
      'N (N): gaya normal dari permukaan bidang miring yang nilainya melonjak selama Δt.'
    ],
    narratorScript:
      'Pada bab ketiga, perhatikan makna tiap variabel. M adalah massa meriam dalam kilogram, ingat satu ton sama dengan seribu kilogram. El adalah panjang lintasan sepanjang bidang miring, sehingga tinggi jatuh vertikalnya adalah el dikali sinus alfa. P adalah momentum peluru berarah horizontal dalam satuan newton sekon. Sedangkan delta t adalah durasi tembakan dalam sekon yang nantinya dikonversi menjadi milisekon.'
  },
  {
    id: 'bab-4',
    order: 4,
    title: 'Satuan SI dan Analisis Dimensi',
    stageRef: 1,
    summary:
      'Memastikan konsistensi dimensi di setiap ruas persamaan untuk mencegah kesalahan faktor 1000.',
    paragraphs: [
      'Kesalahan paling sering terjadi bukan pada konsepnya, melainkan pada konversi satuan: ton dibiarkan tidak diubah ke kg, kNs tidak diubah ke Ns, atau detik tidak diubah ke milidetik.',
      'Dengan analisis dimensi, kita bisa langsung menguji kebenaran rumus akhir Δt = (p cos α − Mv) / (M g sin α). Pembilang memiliki dimensi momentum [M][L][T⁻¹] (kg·m/s atau Ns), sedangkan penyebut adalah gaya berat sejajar bidang dengan dimensi [M][L][T⁻²] (Newton). Hasil baginya berdimensi [T] (sekon).'
    ],
    formulas: [
      {
        label: 'Uji Dimensi Rumus Durasi Tembakan',
        latex: '[\\Delta t] = \\frac{[p]}{[M g]} = \\frac{\\text{N}\\cdot\\text{s}}{\\text{N}} = \\text{s} = 10^3\\,\\text{ms}',
        spokenText: 'Dimensi delta t adalah newton sekon dibagi newton, menghasilkan sekon, yang dikalikan seribu menjadi milisekon.'
      }
    ],
    narratorScript:
      'Bab keempat menegaskan pentingnya satuan SI dan analisis dimensi. Pastikan pembilang dalam satuan newton sekon dan penyebut dalam newton, sehingga hasil baginya langsung berupa sekon, lalu kalikan seribu untuk memperoleh milisekon.'
  },
  {
    id: 'bab-5',
    order: 5,
    title: 'Hukum dan Prinsip Dasar: Mengapa Sumbu Horizontal Gagal?',
    stageRef: 2,
    summary:
      'Analisis mendalam mengenai gaya impulsif dan pemilihan sistem koordinat sejajar bidang miring (∥) vs tegak lurus bidang (⊥).',
    paragraphs: [
      'Siswa yang terburu-buru sering tergoda menulis "karena peluru ditembakkan horizontal, pakai saja kekekalan momentum arah horizontal: M v cos α = p". Mengapa pendekatan ini SALAH FATAL? Mari kita tinjau seluruh gaya eksternal yang bekerja pada sistem (meriam + peluru) selama durasi tembakan Δt.',
      'Pada arah horizontal (sumbu-x), terdapat komponen gaya normal sebesar N sin α! Ketika peluru didorong mendatar ke kanan, gaya reaksi mendorong meriam mendatar ke kiri—artinya meriam ditekan masuk ke dalam bidang miring. Karena bidang miring kaku tidak tembus, bidang miring seketika membalas dengan gaya normal N(t) yang melonjak puluhan kali lipat dari berat meriam! Gaya normal yang melonjak singkat dan besar ini disebut GAYA IMPULSIF. Karena ∫ N sin α dt sangat besar dan nilainya belum diketahui di awal, momentum arah horizontal TIDAK kekal.',
      'Sebaliknya, mari putar sumbu koordinat kita mengikuti kemiringan bidang: sumbu x′ sejajar bidang miring (∥) dan sumbu y′ tegak lurus bidang miring (⊥). Karena bidang miring HALUS (licin, μ = 0), gaya normal N selalu tegak lurus terhadap sumbu x′! Artinya komponen gaya normal di sepanjang sumbu x′ adalah NOL mutlak (N∥ = 0), seberapa pun besar lonjakan N(t)!'
    ],
    visualType: 'coordinate-axes',
    formulas: [
      {
        label: 'Syarat Hilangnya Gaya Normal Impulsif',
        latex: '\\vec{N} \\perp \\hat{u}_\\parallel \\implies N_\\parallel = 0 \\quad (\\text{untuk bidang miring licin})',
        spokenText: 'Vektor gaya normal tegak lurus arah sejajar bidang, sehingga komponen gaya normal sejajar bidang sama dengan nol.'
      }
    ],
    narratorScript:
      'Bab kelima adalah jantung konsep soal ini. Mengapa kita tidak boleh memakai kekekalan momentum arah mendatar? Karena saat peluru ditembakkan mendatar, gaya reaksi menekan meriam menancap ke bidang miring, membuat gaya normal N melonjak sangat besar secara impulsif. Gaya normal ini memiliki komponen mendatar N sinus alfa! Sebaliknya, jika kita memilih sumbu sejajar bidang miring yang licin, gaya normal selalu tegak lurus lintasan sehingga komponen sejajar bidangnya nol mutlak.'
  },
  {
    id: 'bab-6',
    order: 6,
    title: 'Penurunan Persamaan Matematis Secara Bertahap',
    stageRef: 3,
    summary:
      'Menurunkan hubungan v, impuls gravitasi, proyeksi momentum peluru, dan lonjakan gaya normal dari prinsip pertama.',
    paragraphs: [
      'Langkah 1 (Fase Meluncur Sebelum Menembak): Meriam bermassa M + m_p ≈ M meluncur bebas dari diam (v₀ = 0) menuruni bidang licin sudut α. Resultan gaya sejajar bidang adalah M g sin α, sehingga percepatannya a = g sin α. Setelah menempuh jarak ℓ, lajunya menjadi v = √(2 g ℓ sin α). Momentum awal sistem sesaat sebelum menembak sepanjang sumbu turun bidang adalah P_awal,∥ = M v.',
      'Langkah 2 (Fase Penembakan Berdurasi Δt): Tetapkan sistem = (meriam + peluru) dan arah positif = menuruni bidang miring (∥). Selama selang waktu [0, Δt], gaya internal ledakan saling meniadakan (Hukum III Newton). Satu-satunya gaya eksternal sejajar bidang adalah komponen berat M g sin α. Maka menurut Teorema Impuls–Momentum: ∫₀^Δt (M g sin α) dt = P_akhir,∥ − P_awal,∥.',
      'Langkah 3 (Proyeksi Keadaan Akhir): Tepat setelah tembakan selesai, meriam berhenti (v_akhir = 0, momentum meriam = 0) dan peluru bergerak horizontal ke kanan dengan momentum p. Proyeksi vektor p terhadap arah turun bidang miring adalah p cos α. Substitusikan ke persamaan impuls–momentum: (M g sin α) Δt = p cos α − M v.',
      'Langkah 4 (Gaya Normal Rata-Rata di Sumbu ⊥): Pada sumbu tegak lurus bidang (arah menjauhi bidang = positif), meriam tetap menempel di bidang sehingga momentumnya nol di awal dan akhir, sedangkan peluru memperoleh momentum p sin α menjauhi bidang. Maka (N̄ − M g cos α) Δt = p sin α.'
    ],
    visualType: 'vector-decomposition',
    formulas: [
      {
        label: 'Persamaan Impuls-Momentum Sejajar Bidang (∥)',
        latex: '\\int_0^{\\Delta t} M g \\sin\\alpha\\,dt = (0 + p \\cos\\alpha) - (M v + 0) \\implies \\Delta t = \\frac{p \\cos\\alpha - M v}{M g \\sin\\alpha}',
        spokenText: 'Integral gaya berat sejajar bidang terhadap waktu sama dengan p kosinus alfa dikurangi M kali v, sehingga delta t sama dengan p kosinus alfa dikurangi M v, dibagi M g sinus alfa.'
      },
      {
        label: 'Persamaan Sumbu Tegak Lurus (⊥)',
        latex: '\\bar{N} = M g \\cos\\alpha + \\frac{p \\sin\\alpha}{\\Delta t}',
        spokenText: 'Gaya normal rata-rata selama penembakan sama dengan M g kosinus alfa ditambah p sinus alfa dibagi delta t.'
      }
    ],
    narratorScript:
      'Pada bab keenam, kita menurunkan rumus secara bertahap. Pertama, dari jarak luncur el, kita peroleh kelajuan sebelum menembak v sama dengan akar dua g el sinus alfa. Kedua, pada sumbu sejajar bidang miring, satu-satunya gaya luar adalah M g sinus alfa. Jadi impuls gravitasi M g sinus alfa dikali delta t sama dengan momentum akhir p kosinus alfa dikurangi momentum awal M v. Dari sini durasi delta t langsung ditemukan.'
  },
  {
    id: 'bab-7',
    order: 7,
    title: 'Hubungan Persamaan dengan Fenomena Nyata',
    stageRef: 4,
    summary:
      'Menginterpretasikan tanda p cos α > Mv dan efek lonjakan gaya normal pada struktur lintasan.',
    paragraphs: [
      'Perhatikan pembilang persamaan kita: p cos α − M v. Agar Δt bernilai positif (secara fisis mungkin untuk menghentikan meriam pada tembakan tunggal ke depan), haruslah p cos α > M v! Mengapa momentum peluru sejajar bidang harus sedikit lebih besar daripada momentum awal meriam?',
      'Bayangkan saat peluru sedang didorong keluar selama Δt: meriam tidak langsung berhenti dalam nol detik, melainkan melambat dari v menuju 0. Selama meriam masih berinteraksi dengan peluru, bumi tetap menarik sistem ke bawah bidang miring, menyuntikkan tambahan momentum sebesar M g sin α · Δt. Karena itu, peluru harus membawa pergi momentum awal M v DITAMBAH tambahan momentum dari gravitasi selama durasi tembakan!'
    ],
    visualType: 'normal-impulse-spike',
    narratorScript:
      'Bab ketujuh menjelaskan makna fisis rumus kita. Mengapa p kosinus alfa lebih besar daripada M v? Karena selama tembakan berdurasi delta t berlangsung, gravitasi terus menyuntikkan momentum tambahan ke arah bawah bidang miring. Peluru harus membuang momentum awal meriam sekaligus tambahan momentum gravitasi tersebut.'
  },
  {
    id: 'bab-8',
    order: 8,
    title: 'Contoh Penerapan Sederhana (Fondasi)',
    stageRef: 2,
    summary:
      'Contoh numerik dasar: menghitung laju sebelum tembak dan proyeksi momentum peluru.',
    paragraphs: [
      'Misalkan sebuah meriam bermassa M = 500 kg meluncur menuruni bidang miring licin 30° sepanjang ℓ = 10 m (g = 9,8 m/s²). Pertama, v = √(2 × 9,8 × 10 × 0,5) = √98 ≈ 9,90 m/s, sehingga momentum awal M v = 4950 Ns.',
      'Jika meriam kemudian menembakkan peluru mendatar bermomentum p = 6000 Ns selama Δt tertentu hingga berhenti, maka komponen momentum peluru sejajar bidang adalah p cos 30° = 6000 × (√3/2) ≈ 5196,15 Ns, dan komponen tegak lurusnya p sin 30° = 3000 Ns. Selisih 5196,15 − 4950 = 246,15 Ns dipasok oleh gravitasi sejajar bidang M g sin 30° = 2450 N, sehingga Δt = 246,15 / 2450 ≈ 0,1005 s = 100,5 ms.'
    ],
    narratorScript:
      'Pada contoh penerapan sederhana ini, kita hitung dulu laju meriam dari akar dua g el sinus tiga puluh derajat. Setelah momentum awal meriam didapat, kita hitung proyeksi momentum peluru p kosinus tiga puluh derajat, lalu membagi selisihnya dengan gaya berat sejajar bidang.'
  },
  {
    id: 'bab-9',
    order: 9,
    title: 'Contoh Penerapan Tingkat Menengah (Bidang Kasar)',
    stageRef: 5,
    summary:
      'Bagaimana jika bidang miring memiliki koefisien gesekan kinetik μ_k?',
    paragraphs: [
      'Ketika bidang miring kasar dengan koefisien gesek kinetik μ_k, muncul tantangan baru yang sangat sering muncul di olimpiade: saat tembakan berlangsung, gaya normal N(t) melonjak drastis! Karena gaya gesek kinetik memenuhi f_k(t) = μ_k N(t) sepanjang meriam masih meluncur turun hingga berhenti, maka gaya gesek ikut menjadi gaya impulsif selama Δt.',
      'Hebatnya, kita tidak perlu tahu bentuk kurva N(t) secara rinci! Cukup integralkan persamaan sumbu tegak lurus: ∫ N(t) dt = M g cos α · Δt + p sin α. Maka impuls gesek total yang melawan gerak turun menjadi J_f = μ_k (M g cos α · Δt + p sin α).'
    ],
    formulas: [
      {
        label: 'Impuls-Momentum pada Bidang Kasar',
        latex: 'M g (\\sin\\alpha - \\mu_k \\cos\\alpha)\\,\\Delta t = p(\\cos\\alpha + \\mu_k \\sin\\alpha) - M v',
        spokenText: 'Pada bidang kasar, gaya normal impulsif menambah impuls gesek sebesar miu k dikali p sinus alfa yang membantu menghentikan meriam.'
      }
    ],
    narratorScript:
      'Untuk tingkat menengah dengan bidang miring kasar, ingat bahwa lonjakan gaya normal selama tembakan otomatis menyebabkan gaya gesek kinetik juga melonjak secara impulsif. Kita mengintegralkan gaya normal lebih dulu sehingga muncul suku tambahan miu k p sinus alfa.'
  },
  {
    id: 'bab-10',
    order: 10,
    title: 'Contoh Penerapan Tingkat Olimpiade (Tembakan Bersudut & Gaya Berubah)',
    stageRef: 6,
    summary:
      'Menghadapi variasi tembakan dengan sudut elevasi θ terhadap horizontal dan gaya dorong pulsa F(t).',
    paragraphs: [
      'Di tingkat olimpiade lanjutan, peluru dapat ditembakkan pada sudut elevasi θ di atas bidang datar (horizontal), sementara bidang miring menurun sebesar α di bawah horizontal. Sudut antara arah tembak peluru dan sumbu turun bidang miring bukan lagi α, melainkan α + θ!',
      'Selain itu, gaya dorong gas di dalam laras tidak selalu konstan; bisa berbentuk pulsa segitiga atau sinusoidal dengan puncak F_maks. Karena p = ∫₀^Δt F(t) dt bergantung pada Δt, persamaan impuls-momentum menjadi persamaan aljabar linear untuk Δt yang dapat langsung dipecahkan.'
    ],
    formulas: [
      {
        label: 'Proyeksi Tembakan Bersudut Elevasi θ',
        latex: 'p_\\parallel = p \\cos(\\alpha + \\theta), \\qquad p_\\perp = p \\sin(\\alpha + \\theta)',
        spokenText: 'Jika peluru ditembakkan dengan sudut elevasi teta di atas horizontal, sudutnya terhadap arah turun bidang miring adalah alfa ditambah teta.'
      }
    ],
    narratorScript:
      'Pada tingkat olimpiade lanjut, jika sudut tembakan berada teta di atas horizontal, sudut total antara vektor momentum peluru dan arah turun bidang miring adalah alfa ditambah teta. Sedangkan jika gaya dorong berbentuk grafik segitiga, nilai momentum peluru adalah setengah dikali gaya maksimum dikali delta t.'
  },
  {
    id: 'bab-11',
    order: 11,
    title: 'Hubungan Usaha-Energi vs Impuls-Momentum Saat Tembakan',
    stageRef: 7,
    summary:
      'Kapan memakai Kekekalan Energi dan kapan wajib memakai Impuls-Momentum.',
    paragraphs: [
      'Selama fase meluncur sebelum menembak, energi mekanik sistem kekal (jika licin), sehingga kamu bebas menggunakan ½ M v² = M g ℓ sin α maupun GLBB untuk mencari v. Namun tepat saat tembakan terjadi, ledakan mesiu melepaskan energi kimia menjadi energi kinetik! Oleh sebab itu, energi mekanik TIDAK kekal selama proses tembakan.',
      'Sebaliknya, apabila gaya dorong tembakan diketahui konstan selama Δt, kita tetap bisa menghitung pergeseran meriam selama ditembakkan (Δs = ½ (v_awal + v_akhir) Δt) dan menerapkan Teorema Usaha-Energi secara khusus pada benda meriam saja untuk menghitung usaha gaya reaksi: W_reaksi = −½ p v cos α.'
    ],
    visualType: 'energy-vs-impulse',
    narratorScript:
      'Penting untuk membedakan fase energi dan fase impuls. Sebelum menembak, energi mekanik kekal. Saat tembakan meletus, energi kimia berubah menjadi energi kinetik sehingga energi mekanik tidak kekal; gunakanlah teorema impuls momentum. Namun pada meriam saja, usaha gaya reaksi tetap dapat dihitung dari pergeseran rata-rata selama delta t.'
  },
  {
    id: 'bab-12',
    order: 12,
    title: 'Kesalahan Umum dan Miskonsepsi Siswa',
    stageRef: 2,
    summary:
      'Lima jebakan klasik yang paling sering menggugurkan peserta OSK pada soal bertipe Soal 15.',
    paragraphs: [
      'Menghindari kesalahan fatal jauh lebih bernilai daripada menghafal banyak rumus cepat. Periksa lima miskonsepsi berikut agar kamu tidak terjebak pada saat ujian resmi.'
    ],
    keyPoints: [
      'Miskonsepsi 1: Memakai kekekalan momentum arah horizontal (M v cos α = p) -> SALAH karena ada gaya normal impulsif N sin α.',
      'Miskonsepsi 2: Menganggap p cos α = M v -> SALAH karena mengabaikan impuls gravitasi (M g sin α) Δt.',
      'Miskonsepsi 3: Memakai v = √(2 g ℓ) tanpa sin α -> SALAH karena ℓ adalah panjang lintasan miring, bukan ketinggian vertikal.',
      'Miskonsepsi 4: Melupakan perubahan gesekan saat tembakan di bidang kasar -> SALAH karena N melonjak sehingga f_k = μ_k N ikut melonjak.',
      'Miskonsepsi 5: Salah format desimal (memakai titik 32.4 atau pembulatan 32 tanpa ,0) -> di OSK berbasis komputer, format salah dianggap tidak valid!'
    ],
    visualType: 'misconception-trap',
    narratorScript:
      'Hati-hati terhadap lima kesalahan umum siswa. Pertama, jangan pernah memakai kekekalan momentum horizontal karena gaya normal melonjak impulsif. Kedua, jangan samakan p kosinus alfa dengan M v karena ada durasi delta t. Ketiga, ingat el adalah panjang miring bukan tinggi vertikal. Keempat, di bidang kasar gesekan ikut melonjak. Kelima, selalu tulis jawaban satu angka desimal memakai tanda koma.'
  },
  {
    id: 'bab-13',
    order: 13,
    title: 'Trik Penyelesaian Cepat (Fast Olympiad Strategy)',
    stageRef: 7,
    summary:
      'Prosedur 30 detik yang teruji secara konsep untuk memecahkan variasi Soal 15 OSK 2026.',
    paragraphs: [
      'Begitu kamu melihat kata kunci "benda meluncur di bidang miring", "menembakkan peluru ke arah tertentu", dan "durasi tembakan", langsung jalankan protokol 3 langkah berikut secara mental maupun di kertas buram:'
    ],
    keyPoints: [
      'Langkah Kilat 1 (Sumbu ∥): Langsung letakkan sumbu utama sejajar bidang miring! Abaikan gaya normal bila bidang licin (N∥ = 0).',
      'Langkah Kilat 2 (Selisih Momentum): Hitung P_awal = M √(2 g ℓ sin α) dan P_peluru,∥ = p cos α (atau p cos(α+θ)). Pastikan tandanya konsisten!',
      'Langkah Kilat 3 (Bagi dengan Gaya Luar ∥): Untuk bidang licin saat meriam berhenti, langsung Δt = (p cos α − M v) / (M g sin α), lalu kalikan 1000 untuk milisekon!'
    ],
    formulas: [
      {
        label: 'Template Cepat OSK (Bidang Licin, Berhenti)',
        latex: '\\Delta t\\,(\\text{ms}) = 1000 \\times \\frac{p \\cos\\alpha - M\\sqrt{2 g \\ell \\sin\\alpha}}{M g \\sin\\alpha}',
        spokenText: 'Template cepat bidang licin hingga berhenti: delta t dalam milisekon sama dengan seribu dikali p kosinus alfa dikurangi M kali akar dua g el sinus alfa, seluruhnya dibagi M g sinus alfa.'
      }
    ],
    narratorScript:
      'Inilah trik cepat Mister Jo tanpa mengorbankan kebenaran fisika. Pertama, kunci sumbu sejajar bidang agar gaya normal hilang. Kedua, hitung selisih proyeksi momentum peluru terhadap momentum awal meriam. Ketiga, bagi selisih itu dengan gaya berat sejajar bidang M g sinus alfa, lalu kalikan seribu untuk mendapatkan milisekon.'
  }
];
