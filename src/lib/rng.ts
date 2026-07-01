// Deterministic pseudo-random for demo data. Prevents SSR/CSR hydration drift.
let _s = 1337;
export function rand(): number {
  _s = (_s * 16807) % 2147483647;
  return _s / 2147483647;
}
export function reseed(seed: number) { _s = seed || 1337; }