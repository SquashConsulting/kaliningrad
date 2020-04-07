import Ajv from 'ajv';

import schema from './schema';

const ajv = new Ajv({ allErrors: true });

/**
 * Validates given data structure to the official
 * Kaliningrad Graph Schema
 *
 * @param data Kaliningrad Graph Structure
 * @returns `isValid` — `true` or `false`
 */
export default function (data: object): boolean | PromiseLike<any> {
  const isValid = ajv.validate(schema, data);

  return isValid;
}
