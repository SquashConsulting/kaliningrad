import { ERRORS } from 'components/Modals/data';

/* Exports */

export { validateJson };

/* Module Functions */

/**
 * @param {object.<string, any>} json
 * @param {object.<string, any>} collections
 * @param {string} type
 * @param {boolean} hasErrors
 */
function validateJson(json, collections, type, hasErrors) {
  if (hasErrors) return ERRORS.default;

  if (Object.keys(json).length !== 1) return ERRORS.singleRoot;

  if (type === 'edit' && !collections[Object.keys(json)[0]])
    return ERRORS.doesNotExist;

  if (type === 'create' && collections[Object.keys(json)[0]])
    return ERRORS.alreadyExists;

  if (
    Object.values(Object.values(json)[0]).some(
      (field) =>
        !(
          Object.keys(field).length === 2 &&
          ['string', 'number', 'boolean'].includes(field.type) &&
          typeof field.required === typeof true
        ),
    )
  )
    return ERRORS.invalidFields;

  return null;
}
