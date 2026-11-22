import { AnswerValidationResult } from '../types/physics';

/**
 * Formats a number to Indonesian comma-decimal string with exactly 1 decimal place.
 */
export function formatCommaOneDecimal(value: number): string {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10;
  // Avoid "-0,0"
  const normalized = Object.is(rounded, -0) || Math.abs(rounded) < 1e-9 ? 0 : rounded;
  return normalized.toFixed(1).replace('.', ',');
}

/**
 * Validates short-answer numeric input according to OSK 2026 rules:
 * - Must use comma (,) as decimal separator, NEVER dot (.)
 * - Must have exactly 1 decimal digit (e.g., 12,5 or 0,8 or -37,8)
 * - Numeric equivalence checked within explicit tolerance
 */
export function validateIndonesianNumericAnswer(
  rawInput: string,
  expectedValue: number,
  tolerance = 0.05,
  commonMistakeNote = ''
): AnswerValidationResult {
  const trimmed = rawInput.trim().replace(/\s+/g, '');

  if (!trimmed) {
    return {
      isValidFormat: false,
      isCorrect: false,
      parsedValue: null,
      errorType: 'empty',
      feedbackTitle: 'Kolom jawaban masih kosong',
      feedbackDetail: 'Masukkan angka numerik dengan tepat satu angka desimal menggunakan tanda koma, misalnya 12,5.'
    };
  }

  // Reject dot as decimal separator explicitly
  if (trimmed.includes('.')) {
    const testNum = Number(trimmed.replace(',', '.'));
    const numericallyClose = Number.isFinite(testNum) && Math.abs(testNum - expectedValue) <= tolerance;
    return {
      isValidFormat: false,
      isCorrect: false,
      parsedValue: Number.isFinite(testNum) ? testNum : null,
      errorType: 'used-dot-decimal',
      feedbackTitle: 'Format pemisah desimal tidak sesuai ketentuan',
      feedbackDetail: numericallyClose
        ? 'Nilaimu sudah mendekati atau tepat secara matematis, tetapi kamu menggunakan tanda titik (.). Sesuai ketentuan, wajib gunakan tanda koma (,) dengan satu angka di belakang koma!'
        : 'Jangan gunakan tanda titik (.) sebagai pemisah desimal. Gunakan tanda koma (,), contohnya 12,5 atau 0,8.'
    };
  }

  // Must match optional +/- sign, digits, comma, and digits
  const generalNumericComma = /^[+-]?\d+(,\d+)?$/;
  if (!generalNumericComma.test(trimmed)) {
    return {
      isValidFormat: false,
      isCorrect: false,
      parsedValue: null,
      errorType: 'invalid-number',
      feedbackTitle: 'Input bukan angka yang valid',
      feedbackDetail: 'Tuliskan hanya angka numerik tanpa satuan atau huruf, menggunakan koma sebagai desimal (contoh: 32,4 atau -37,8).'
    };
  }

  const parsedValue = Number(trimmed.replace(',', '.'));
  const oneDecimalStrict = /^[+-]?\d+,\d$/;

  if (!oneDecimalStrict.test(trimmed)) {
    const numericallyClose = Math.abs(parsedValue - expectedValue) <= tolerance;
    return {
      isValidFormat: false,
      isCorrect: false,
      parsedValue,
      errorType: 'not-one-decimal',
      feedbackTitle: 'Format harus tepat satu angka desimal',
      feedbackDetail: numericallyClose
        ? `Nilai numerikmu (${trimmed}) sudah tepat secara matematis, namun format jawaban wajib ditulis dengan tepat satu angka di belakang koma (contoh: ${formatCommaOneDecimal(parsedValue)}).`
        : 'Ketentuan jawaban akhir wajib memiliki tepat satu angka di belakang koma (contoh: 9,0 atau 12,5).'
    };
  }

  // Check sign mismatch when magnitude matches
  if (
    Math.abs(expectedValue) > 0.05 &&
    Math.sign(parsedValue) !== Math.sign(expectedValue) &&
    Math.abs(Math.abs(parsedValue) - Math.abs(expectedValue)) <= tolerance
  ) {
    return {
      isValidFormat: true,
      isCorrect: false,
      parsedValue,
      errorType: 'wrong-sign',
      feedbackTitle: 'Besar angka tepat, perhatikan tanda (+/-)',
      feedbackDetail: 'Periksa kembali arah vektor atau tanda usaha/kecepatan sesuai kesepakatan sumbu pada soal.'
    };
  }

  const isCorrect = Math.abs(parsedValue - expectedValue) <= tolerance;
  if (isCorrect) {
    return {
      isValidFormat: true,
      isCorrect: true,
      parsedValue,
      errorType: 'none',
      feedbackTitle: 'Tepat sekali! Jawabanmu benar.',
      feedbackDetail: `Nilai ${trimmed} sesuai dengan perhitungan fisika yang akurat dan memenuhi format satu angka desimal.`
    };
  }

  return {
    isValidFormat: true,
    isCorrect: false,
    parsedValue,
    errorType: 'wrong-value',
    feedbackTitle: 'Jawaban belum tepat — coba periksa kembali',
    feedbackDetail: commonMistakeNote
      ? `Catatan analisis: ${commonMistakeNote}`
      : 'Periksa kembali penguraian komponen vektor sejajar bidang miring, konversi satuan (ton ke kg, ms ke s), dan impuls gravitasi selama durasi tembakan.'
  };
}
