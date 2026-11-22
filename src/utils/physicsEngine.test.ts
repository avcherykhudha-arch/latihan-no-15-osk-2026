import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeAllProblemAnswers,
  solveCannonShotDurationMs,
  generateInclineSimulation
} from './physicsCalculations';
import {
  formatCommaOneDecimal,
  validateIndonesianNumericAnswer
} from './answerValidator';

test('OSK 2026 Problem 15 reference calculation yields 32.4 ms under g=9.8 and 3-4-5 trig', () => {
  const dtMs = solveCannonShotDurationMs({
    M: 800,
    g: 9.8,
    sinA: 0.6,
    cosA: 0.8,
    ell: 8,
    p: 9890
  });
  assert.equal(formatCommaOneDecimal(dtMs), '32,4');
});

test('All 15 practice problems match their expected 1-decimal formatted answers', () => {
  const answers = computeAllProblemAnswers();
  const expected: Record<number, string> = {
    1: '6,3',
    2: '5,1',
    3: '45,0',
    4: '34,0',
    5: '93,9',
    6: '9,0',
    7: '0,8',
    8: '65,0',
    9: '50,0',
    10: '40,0',
    11: '10,1',
    12: '60,0',
    13: '48,0',
    14: '-37,8',
    15: '9,3'
  };

  for (let id = 1; id <= 15; id++) {
    assert.equal(
      formatCommaOneDecimal(answers[id]),
      expected[id],
      `Mismatch on Problem ${id}: got ${answers[id]}`
    );
  }
});

test('Answer validator enforces comma decimal, 1 decimal digit, and tolerance accurately', () => {
  // Valid correct answer
  const ok = validateIndonesianNumericAnswer('32,4', 32.4, 0.1);
  assert.equal(ok.isValidFormat, true);
  assert.equal(ok.isCorrect, true);

  // Dot decimal rejected even if numerically right
  const dot = validateIndonesianNumericAnswer('32.4', 32.4, 0.1);
  assert.equal(dot.isValidFormat, false);
  assert.equal(dot.isCorrect, false);
  assert.equal(dot.errorType, 'used-dot-decimal');

  // Integer or 2-decimal rejected for format
  const intOnly = validateIndonesianNumericAnswer('9', 9.0, 0.1);
  assert.equal(intOnly.isValidFormat, false);
  assert.equal(intOnly.errorType, 'not-one-decimal');

  const twoDec = validateIndonesianNumericAnswer('9,00', 9.0, 0.1);
  assert.equal(twoDec.isValidFormat, false);
  assert.equal(twoDec.errorType, 'not-one-decimal');

  // Negative answer check (Problem 14)
  const negOk = validateIndonesianNumericAnswer('-37,8', -37.8, 0.1);
  assert.equal(negOk.isValidFormat, true);
  assert.equal(negOk.isCorrect, true);

  const wrongSign = validateIndonesianNumericAnswer('37,8', -37.8, 0.1);
  assert.equal(wrongSign.isCorrect, false);
  assert.equal(wrongSign.errorType, 'wrong-sign');
});

test('Simulation Impulse-Momentum invariant holds along incline', () => {
  const sim = generateInclineSimulation({
    M: 800,
    g: 9.8,
    alphaDeg: 37,
    ell: 8,
    p: 9890,
    deltaTMs: 32.4
  });

  // Cannon should stop nearly at 0 m/s
  assert.ok(Math.abs(sim.vAfterShot) < 0.05, `Expected vAfterShot ~ 0, got ${sim.vAfterShot}`);
  // Normal force during shot must exceed normal force during slide
  assert.ok(sim.averageNormalDuringShot > sim.normalDuringSlide * 10);
  // Points array populated and starts at t=0, v=0
  assert.ok(sim.points.length > 50);
  assert.equal(sim.points[0].t, 0);
  assert.equal(sim.points[0].v, 0);
});

import { ORIGINAL_OSK_15_PROBLEM, PRACTICE_PROBLEMS } from '../data/problemsData';

test('PRACTICE_PROBLEMS dataset has 15 items whose answers match independent calculations', () => {
  assert.equal(PRACTICE_PROBLEMS.length, 15);
  const calc = computeAllProblemAnswers();
  for (const p of PRACTICE_PROBLEMS) {
    assert.equal(
      p.correctFormatted,
      formatCommaOneDecimal(calc[p.id]),
      `Dataset mismatch on Problem ${p.id}`
    );
    assert.ok(/^-?\d+,\d$/.test(p.correctFormatted), `Invalid 1-decimal format on Problem ${p.id}`);
  }
  assert.equal(ORIGINAL_OSK_15_PROBLEM.correctFormatted, '32,4');
});
