import fs from 'fs';
import path from 'path';
import omit from 'lodash.omit';
import validate from 'kaliningrad-validator';

const KEYS_TO_OMIT = ['__meta__', 'links', 'nodes'];
const ERROR = new Error(
  'Invalid file format, please use a valid Kaliningrad graph',
);

type OptionsResult = [Error | null, Kaliningrad.Graph | null];

export function validateJSON(json: Kaliningrad.GraphConfig): OptionsResult {
  const isValid = validate(json);

  if (!isValid) return [ERROR, null];

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

export default function (initialPath: any): Kaliningrad.Graph {
  const [error, graph] = processOptions(initialPath);

  if (error) throw error;

  return graph;
}
