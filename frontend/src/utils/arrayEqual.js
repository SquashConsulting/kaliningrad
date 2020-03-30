/**
 *
 * @param {string[]} a
 * @param {string[]} b
 */
export default function(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  if (a == null || b == null) return false;

  const sorted1 = a.sort();
  const sorted2 = b.sort();

  return JSON.stringify(sorted1) === JSON.stringify(sorted2);
}
