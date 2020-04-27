import fs from 'fs';
import path from 'path';
import omit from 'lodash.omit';
import validate from 'kaliningrad-validator';

/* Constants */

const KEYS_TO_OMIT = ['__meta__', 'links', 'nodes'];
const ERROR = new Error(
  'Invalid file format, please use a valid Kaliningrad graph',
);

/* EXPORTS */

export default processFile;

/* Module Functions */

function validateJSON(json: Kaliningrad.GraphConfig): Kaliningrad.Graph {
  const isValid = validate(json);

  if (!isValid) throw ERROR;

  const kalliningraph: Kaliningrad.Graph = omit<Kaliningrad.GraphConfig>(
    json,
    KEYS_TO_OMIT,
  );

  return kalliningraph;
}

function processOptions(initialPath: any): Kaliningrad.Graph {
  const filePath = initialPath as string;

  if (path.extname(filePath) !== '.json') {
    throw ERROR;
  }

  const file = fs.readFileSync(filePath, 'utf-8');
  const graph = JSON.parse(file);

  return validateJSON(graph);
}

function processFile(initialPath: any): Kaliningrad.Graph {
  const graph: Kaliningrad.Graph = processOptions(initialPath);

  return graph;
}
