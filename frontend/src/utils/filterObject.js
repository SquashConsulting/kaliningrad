/**
 * @param {Object.<string, any>} object
 * @param {Function} predicate
 *
 * @returns {Object.<string, any>} object
 */
export default (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key], key))
    .reduce((res, key) => ({ ...res, [key]: obj[key] }), {});
