import fs from 'fs';
import path from 'path';
import omit from 'lodash.omit';

import arrayEqual from 'utils/arrayEqual';

const KEYS_TO_OMIT = ['__meta__', 'links', 'nodes'];
const REQUIRED_KEYS = ['__meta__', 'links', 'nodes', 'collections', 'edges'];
const ERROR = new Error(
  'Invalid file format, please use a valid Kaliningrad graph',
);

type OptionsResult = [Error | null, Kaliningrad.Graph | null];

export function validateJSON(json: Kaliningrad.GraphConfig): OptionsResult {
  if (!arrayEqual(REQUIRED_KEYS, Object.keys(json))) return [ERROR, null];

  if (
    !Object.values(
      json.collections,
    ).every((attributes: Kaliningrad.Attributes): boolean =>
      Object.values(attributes).every(
        (attribute: Kaliningrad.Attribute): boolean =>
          Object.keys(attribute).length === 2 &&
          ['string', 'number', 'boolean'].includes(attribute.type) &&
          typeof attribute.required === typeof true,
      ),
    )
  )
    return [ERROR, null];

  if (
    !Object.values(json.edges).every(
      (edge: Kaliningrad.Edge): boolean =>
        Object.keys(edge).length === 2 &&
        typeof edge._from === 'string' &&
        typeof edge._to === 'string',
    )
  )
    return [ERROR, json];

  const kalliningraph: Kaliningrad.Graph = omit<Kaliningrad.GraphConfig>(
    json,
    KEYS_TO_OMIT,
  );

  return [null, kalliningraph];
}

export function processOptions(initialPath: any): OptionsResult {
  const filePath = initialPath as string;

  if (path.extname(filePath) !== '.json') return [ERROR, null];

  const file = fs.readFileSync(filePath, 'utf-8');
  const graph = JSON.parse(file);

  return validateJSON(graph);
}

export default function(initialPath: any): Kaliningrad.Graph {
  const [error, graph] = processOptions(initialPath);

  if (error) throw error;

  return graph;
}
