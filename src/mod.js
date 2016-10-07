/**
 * Modulo function for JavaScript, % operator is remainder and
 * gives non-modulo results for negative numbers.
 */
export default function (x, n) {
  return ((x % n) + n) % n;
}
