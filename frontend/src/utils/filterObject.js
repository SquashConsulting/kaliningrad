/* Exports */

export default filterObject;

/* Module Functions */

/**
 * @param {Object.<string, any>} object
 * @param {Function} predicate
 *
 * @returns {Object.<string, any>} object
 */
function filterObject(obj, predicate) {
  return Object.keys(obj)
    .filter((key) => predicate(obj[key], key))
    .reduce((res, key) => ({ ...res, [key]: obj[key] }), {});
}
