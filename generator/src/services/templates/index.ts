import execa from 'execa';

import pipe from 'utils/pipe';

/* Exports */

export default clone;

/* Module Functions */

function prepareConfig(graph: Kaliningrad.Graph): string {
  const collArray: string[] = Object.keys(graph.collections);
  const edgeArray: string[] = Object.keys(graph.edges);

  const collections = collArray.join(',');
  const edges = edgeArray.join(',');

  return `${collections} ${edges}`;
}

function initiateProject(destination: string) {
  return function (params: string): void {
    execa('sh', [
      '-c',
      `cd ${destination} && npm install && ./bin/init ${params}`,
    ]).stdout.pipe(process.stdout);
  };
}

function clone(destination: string, graph: Kaliningrad.Graph): void {
  const cwd = process.cwd();

  try {
    pipe(graph, prepareConfig, initiateProject(destination));
  } catch (error) {
    console.error(error);
  } finally {
    execa('sh', ['-c', `cd ${cwd}`]);
  }
}
