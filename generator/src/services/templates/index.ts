import execa from 'execa';

import pipe from 'utils/pipe';

const prepareConfig = (graph: Kaliningrad.Graph): string => {
  const collArray: string[] = Object.keys(graph.collections);
  const edgeArray: string[] = Object.keys(graph.edges);

  const collections = collArray.join(',');
  const edges = edgeArray.join(',');

  return `${collections} ${edges}`;
};

const bootstrap = (destination: string) => (params: string): void => {
  execa('sh', [
    '-c',
    `cd ${destination} && npm install && ./bin/init ${params}`,
  ]).stdout.pipe(process.stdout);
};

export default (destination: string, graph: Kaliningrad.Graph): void => {
  const cwd = process.cwd();

  try {
    pipe(graph, prepareConfig, bootstrap(destination));
  } catch (error) {
    console.error(error);
  } finally {
    execa('sh', ['-c', `cd ${cwd}`]);
  }
};
