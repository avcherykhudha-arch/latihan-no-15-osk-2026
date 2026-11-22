export interface InclineCannonParams {
  M: number; // kg
  g: number; // m/s^2
  alphaDeg: number; // degrees
  ell: number; // m
  p: number; // Ns
  deltaTMs?: number; // ms
  muK?: number; // kinetic friction
  bulletAngleDeg?: number; // degrees relative to horizontal (0 = horizontal right)
  springK?: number; // N/m
  springCompression?: number; // m
  vInit?: number; // m/s
  directionMotion?: 'down' | 'up';
  thrustShape?: 'constant' | 'triangle';
}

export interface SimulationPoint {
  t: number; // seconds
  s: number; // position along incline (m)
  v: number; // velocity along incline (m/s)
  pCannon: number; // Ns
  pBullet: number; // Ns (component along incline)
  pTotalParallel: number; // Ns
  normalForce: number; // N
  kineticEnergy: number; // J
  potentialEnergy: number; // J
}

export interface SimulationOutput {
  vBeforeShot: number;
  vAfterShot: number;
  deltaTSeconds: number;
  deltaTMs: number;
  slideTime: number;
  reboundTime: number;
  averageNormalDuringShot: number;
  normalDuringSlide: number;
  pBulletParallel: number;
  pBulletPerp: number;
  gravityImpulseParallel: number;
  frictionImpulseParallel: number;
  points: SimulationPoint[];
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Standard 3-4-5 / 5-12-13 triangle trig helper matching Olympiad conventions when specified.
 */
export function getTrig(alphaDeg: number, useExactTrig = false): { sinA: number; cosA: number } {
  if (!useExactTrig) {
    if (Math.abs(alphaDeg - 37) < 1e-6) return { sinA: 0.6, cosA: 0.8 };
    if (Math.abs(alphaDeg - 53) < 1e-6) return { sinA: 0.8, cosA: 0.6 };
  }
  const rad = degToRad(alphaDeg);
  return { sinA: Math.sin(rad), cosA: Math.cos(rad) };
}

/**
 * Solves OSK 2026 Problem 15 directly from parameters:
 * Returns duration deltaT in milliseconds so cannon comes to rest after firing horizontally.
 */
export function solveCannonShotDurationMs(params: {
  M: number;
  g: number;
  sinA: number;
  cosA: number;
  ell: number;
  p: number;
  muK?: number;
}): number {
  const { M, g, sinA, cosA, ell, p, muK = 0 } = params;
  const aSlide = g * (sinA - muK * cosA);
  const vBefore = Math.sqrt(Math.max(0, 2 * aSlide * ell));
  const numerator = p * (cosA + muK * sinA) - M * vBefore;
  const denominator = M * g * (sinA - muK * cosA);
  return (numerator / denominator) * 1000;
}

/**
 * Computes exact numerical answers for Soal 15 OSK 2026 and all 15 practice problems
 * so unit tests can independently verify every problem.
 */
export function computeAllProblemAnswers(): Record<number, number> {
  // Soal 1: M=450 kg, ell=20.0 m, alpha=30 deg, g=9.8 m/s^2 -> P (kNs)
  const s1_v = Math.sqrt(2 * 9.8 * 20.0 * 0.5);
  const s1 = (450 * s1_v) / 1000; // 6.3 kNs

  // Soal 2: p=8500 Ns horizontal, alpha=37 deg (sin=0.6) -> p_perp (kNs)
  const s2 = (8500 * 0.6) / 1000; // 5.1 kNs

  // Soal 3: M=200 kg, alpha=30 deg, g=9.8, v=8.0 m/s, p=1644.1 Ns parallel down -> dt (ms)
  const s3 = ((1644.1 - 200 * 8.0) / (200 * 9.8 * 0.5)) * 1000; // 45.0 ms

  // Soal 4: M=600 kg, alpha=37 deg (0.6/0.8), g=9.8, ell=6.0 m, p=6450 Ns -> dt (ms)
  const s4 = solveCannonShotDurationMs({
    M: 600,
    g: 9.8,
    sinA: 0.6,
    cosA: 0.8,
    ell: 6.0,
    p: 6450
  }); // 34.0136 ms -> 34.0

  // Soal 5: M=500 kg, alpha=37 deg, g=9.8, p=6000 Ns, dt=40.0 ms -> N_avg (kN)
  const s5 = (500 * 9.8 * 0.8 + (6000 * 0.6) / 0.04) / 1000; // 93.92 kN -> 93.9

  // Soal 6: M=1000 kg, alpha=53 deg (sin=0.8, cos=0.6), g=10.0, p=20500 Ns, dt=37.5 ms -> ell (m)
  const s6_Mv = 20500 * 0.6 - 1000 * 10.0 * 0.8 * 0.0375;
  const s6_v = s6_Mv / 1000;
  const s6 = (s6_v * s6_v) / (2 * 10.0 * 0.8); // 9.0 m

  // Soal 7: M=400 kg, alpha=30 deg, g=9.8, ell=5.0 m, dt=50.0 ms, p=3700 Ns -> speed |v_f| (m/s)
  const s7_v0 = Math.sqrt(2 * 9.8 * 5.0 * 0.5);
  const s7_pCos = 3700 * (Math.sqrt(3) / 2);
  const s7_vf = (400 * s7_v0 + 400 * 9.8 * 0.5 * 0.05 - s7_pCos) / 400;
  const s7 = Math.abs(s7_vf); // 0.7657 -> 0.8 m/s

  // Soal 8: Rough incline muK=0.25, M=500 kg, alpha=37 deg, g=10.0, ell=12.5 m, p=5400 Ns -> dt (ms)
  const s8 = solveCannonShotDurationMs({
    M: 500,
    g: 10.0,
    sinA: 0.6,
    cosA: 0.8,
    ell: 12.5,
    p: 5400,
    muK: 0.25
  }); // 65.0 ms

  // Soal 9: Uphill v0=10.0 m/s, ell=3.0 m, M=600 kg, alpha=37 deg, g=10.0, p=5775 Ns -> dt (ms)
  const s9_v = Math.sqrt(10.0 * 10.0 - 2 * 10.0 * 0.6 * 3.0);
  const s9 = ((600 * s9_v - 5775 * 0.8) / (600 * 10.0 * 0.6)) * 1000; // 50.0 ms

  // Soal 10: Finite bullet mass m=40 kg, M0=760 kg (Mtot=800 kg), alpha=37 deg, g=10.0, ell=12.0 m, vp=306.0 m/s -> dt (ms)
  const s10_Mtot = 760 + 40;
  const s10_v = Math.sqrt(2 * 10.0 * 12.0 * 0.6);
  const s10_p = 40 * 306.0;
  const s10 = ((s10_p * 0.8 - s10_Mtot * s10_v) / (s10_Mtot * 10.0 * 0.6)) * 1000; // 40.0 ms

  // Soal 11: Angled shot theta=23 deg above horizontal, alpha=30 deg -> angle=53 deg (cos53=0.6), M=500 kg, g=10.0, ell=14.4 m, dt=24.0 ms -> p (kNs)
  const s11_v = Math.sqrt(2 * 10.0 * 14.4 * 0.5);
  const s11_pPar = 500 * s11_v + 500 * 10.0 * 0.5 * 0.024;
  const s11 = s11_pPar / 0.6 / 1000; // 10.1 kNs

  // Soal 12: Triangular thrust pulse Fmax=412 kN, M=800 kg, alpha=37 deg, g=10.0, ell=12.0 m -> dt (ms)
  const s12_v = Math.sqrt(2 * 10.0 * 12.0 * 0.6);
  const s12 = ((800 * s12_v) / (0.5 * 412000 * 0.8 - 800 * 10.0 * 0.6)) * 1000; // 60.0 ms

  // Soal 13: Spring k=9000 N/m, x0=2.0 m, M=500 kg, alpha=37 deg, g=10.0, ell=6.0 m, p=7680 Ns -> dt (ms)
  const s13_v = Math.sqrt((2 * (0.5 * 9000 * 4.0 + 500 * 10.0 * 6.0 * 0.6)) / 500);
  const s13 = ((7680 * 0.8 - 500 * s13_v) / (500 * 10.0 * 0.6)) * 1000; // 48.0 ms

  // Soal 14: Constant thrust work on cannon: M=500 kg, alpha=37 deg, g=10.0, ell=12.0 m, p=7875 Ns -> W_reaksi (kJ)
  const s14_v = Math.sqrt(2 * 10.0 * 12.0 * 0.6);
  const s14 = (-0.5 * 7875 * 0.8 * s14_v) / 1000; // -37.8 kJ

  // Soal 15: Rebound & total final position from start: M=400 kg, alpha=37 deg, g=10.0, ell=12.0 m, dt=100.0 ms, p=9300 Ns -> s_akhir (m)
  const s15_v1 = Math.sqrt(2 * 10.0 * 12.0 * 0.6);
  const s15_dt = 0.1;
  const s15_v2 = (400 * s15_v1 + 400 * 10.0 * 0.6 * s15_dt - 9300 * 0.8) / 400; // -6.0 m/s
  const s15_dsShot = ((s15_v1 + s15_v2) / 2) * s15_dt; // +0.30 m
  const s15_sUp = (s15_v2 * s15_v2) / (2 * 10.0 * 0.6); // 3.00 m
  const s15 = 12.0 + s15_dsShot - s15_sUp; // 9.3 m

  return {
    1: s1,
    2: s2,
    3: s3,
    4: s4,
    5: s5,
    6: s6,
    7: s7,
    8: s8,
    9: s9,
    10: s10,
    11: s11,
    12: s12,
    13: s13,
    14: s14,
    15: s15
  };
}

/**
 * Generates full time-series simulation data for both the Simulation Lab and per-problem proof animations.
 */
export function generateInclineSimulation(params: {
  M: number;
  g: number;
  alphaDeg: number;
  ell: number;
  p: number;
  deltaTMs?: number;
  muK?: number;
  bulletAngleDeg?: number;
  springK?: number;
  springCompression?: number;
  v0?: number;
  directionMotion?: 'down' | 'up';
  thrustShape?: 'constant' | 'triangle';
}): SimulationOutput {
  const {
    M,
    g,
    alphaDeg,
    ell,
    p,
    deltaTMs: explicitDeltaTMs,
    muK = 0,
    bulletAngleDeg = 0,
    springK = 0,
    springCompression = 0,
    v0 = 0,
    directionMotion = 'down',
    thrustShape = 'constant'
  } = params;

  const { sinA, cosA } = getTrig(alphaDeg, false);

  // Angle of bullet momentum relative to +down-incline unit vector
  // Standard horizontal forward (0 deg) => angle = alphaDeg
  // Angled theta above horizontal => angle = alphaDeg + theta
  // Horizontal left (180 deg) => used for uphill motion where +axis is uphill
  let pBulletParallel = 0;
  let pBulletPerp = 0;

  if (directionMotion === 'down') {
    const bRad = degToRad(bulletAngleDeg);
    const sinB = Math.sin(bRad);
    const cosB = Math.cos(bRad);
    pBulletParallel = p * (cosA * cosB - sinA * sinB);
    pBulletPerp = p * (sinA * cosB + cosA * sinB);
  } else {
    // Positive axis = uphill
    pBulletParallel = p * cosA;
    pBulletPerp = p * sinA;
  }

  // Phase 1: Motion before firing
  const springEnergy = springK > 0 && springCompression > 0 ? 0.5 * springK * springCompression * springCompression : 0;
  let aSlide = 0;
  let vBeforeShot = 0;
  let slideTime = 0;

  if (directionMotion === 'down') {
    aSlide = g * (sinA - muK * cosA);
    const vStart = Math.sqrt(Math.max(0, v0 * v0 + (2 * springEnergy) / M));
    vBeforeShot = Math.sqrt(Math.max(0, vStart * vStart + 2 * aSlide * ell));
    slideTime = aSlide > 1e-6 ? Math.max(0.25, (vBeforeShot - vStart) / aSlide) : 1.0;
  } else {
    aSlide = -g * (sinA + muK * cosA);
    vBeforeShot = Math.sqrt(Math.max(0, v0 * v0 + 2 * aSlide * ell));
    slideTime = Math.abs(aSlide) > 1e-6 ? (v0 - vBeforeShot) / Math.abs(aSlide) : 1.0;
  }

  // Determine deltaT
  let deltaTSeconds = explicitDeltaTMs !== undefined ? explicitDeltaTMs / 1000 : 0.0324;
  if (explicitDeltaTMs === undefined) {
    const denom = M * g * (sinA - muK * cosA);
    if (denom > 1e-6) {
      const computed = (p * (cosA + muK * sinA) - M * vBeforeShot) / denom;
      deltaTSeconds = Math.max(0.005, Math.min(0.25, computed));
    }
  }

  const gravityImpulseParallel =
    directionMotion === 'down' ? M * g * sinA * deltaTSeconds : -M * g * sinA * deltaTSeconds;
  const frictionImpulseParallel =
    directionMotion === 'down'
      ? -muK * (M * g * cosA * deltaTSeconds + pBulletPerp)
      : -muK * (M * g * cosA * deltaTSeconds + pBulletPerp);

  const vAfterShot =
    (M * vBeforeShot + gravityImpulseParallel + frictionImpulseParallel - pBulletParallel) / M;

  const normalDuringSlide = M * g * cosA;
  const averageNormalDuringShot = M * g * cosA + pBulletPerp / Math.max(1e-6, deltaTSeconds);

  // Phase 3: Post-shot motion (if cannon rebounds or keeps moving)
  let reboundTime = 0.6;
  if (Math.abs(vAfterShot) > 0.2 && directionMotion === 'down') {
    reboundTime = Math.min(1.6, Math.max(0.5, Math.abs(vAfterShot) / (g * sinA) + 0.15));
  }

  // Generate sample points for smooth graphs & canvas playback
  const points: SimulationPoint[] = [];
  const slideSteps = 40;
  const shotSteps = 24;
  const postSteps = 24;
  const H0 = ell * sinA + 2;

  const vStartEffective =
    directionMotion === 'down'
      ? Math.sqrt(Math.max(0, v0 * v0 + (2 * springEnergy) / M))
      : v0;

  for (let i = 0; i <= slideSteps; i++) {
    const frac = i / slideSteps;
    const t = frac * slideTime;
    const v = vStartEffective + aSlide * t;
    const s = vStartEffective * t + 0.5 * aSlide * t * t;
    const h = directionMotion === 'down' ? H0 - s * sinA : s * sinA;
    points.push({
      t,
      s,
      v,
      pCannon: M * v,
      pBullet: 0,
      pTotalParallel: M * v,
      normalForce: normalDuringSlide,
      kineticEnergy: 0.5 * M * v * v,
      potentialEnergy: M * g * h
    });
  }

  const sAtShotStart = ell;
  for (let i = 1; i <= shotSteps; i++) {
    const frac = i / shotSteps;
    const t = slideTime + frac * deltaTSeconds;
    // Cumulative bullet impulse fraction
    let impulseFrac = frac;
    let forceMultiplier = 1;
    if (thrustShape === 'triangle') {
      if (frac <= 0.5) {
        impulseFrac = 2 * frac * frac;
        forceMultiplier = 4 * frac;
      } else {
        const u = 1 - frac;
        impulseFrac = 1 - 2 * u * u;
        forceMultiplier = 4 * u;
      }
    }
    const pB = pBulletParallel * impulseFrac;
    const pPerpNow = pBulletPerp * forceMultiplier;
    const v =
      vBeforeShot +
      ((gravityImpulseParallel + frictionImpulseParallel) * frac - pB) / M;
    const s = sAtShotStart + 0.5 * (vBeforeShot + v) * (frac * deltaTSeconds);
    const h = directionMotion === 'down' ? H0 - s * sinA : s * sinA;
    points.push({
      t,
      s,
      v,
      pCannon: M * v,
      pBullet: pB,
      pTotalParallel: M * v + pB,
      normalForce: normalDuringSlide + pPerpNow / Math.max(1e-6, deltaTSeconds),
      kineticEnergy: 0.5 * M * v * v,
      potentialEnergy: M * g * h
    });
  }

  const sAtShotEnd = points[points.length - 1].s;
  for (let i = 1; i <= postSteps; i++) {
    const frac = i / postSteps;
    const dtPost = frac * reboundTime;
    const t = slideTime + deltaTSeconds + dtPost;
    let v = vAfterShot;
    let s = sAtShotEnd;
    if (Math.abs(vAfterShot) > 0.15) {
      const aPost = directionMotion === 'down' ? g * sinA : -g * sinA;
      v = vAfterShot + aPost * dtPost;
      // Stop at peak if moving uphill with vAfterShot < 0
      if (directionMotion === 'down' && vAfterShot < 0 && v > 0) {
        const tPeak = Math.abs(vAfterShot) / aPost;
        v = 0;
        s = sAtShotEnd + vAfterShot * tPeak + 0.5 * aPost * tPeak * tPeak;
      } else {
        s = sAtShotEnd + vAfterShot * dtPost + 0.5 * aPost * dtPost * dtPost;
      }
    }
    const h = directionMotion === 'down' ? H0 - s * sinA : s * sinA;
    points.push({
      t,
      s,
      v,
      pCannon: M * v,
      pBullet: pBulletParallel,
      pTotalParallel: M * v + pBulletParallel,
      normalForce: normalDuringSlide,
      kineticEnergy: 0.5 * M * v * v,
      potentialEnergy: M * g * h
    });
  }

  return {
    vBeforeShot,
    vAfterShot,
    deltaTSeconds,
    deltaTMs: deltaTSeconds * 1000,
    slideTime,
    reboundTime,
    averageNormalDuringShot,
    normalDuringSlide,
    pBulletParallel,
    pBulletPerp,
    gravityImpulseParallel,
    frictionImpulseParallel,
    points
  };
}
