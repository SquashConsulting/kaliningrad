import { fetch, extract } from 'gitly';

const URL = 'SquashConsulting/foxx_typescript#next';

export default async function(destination: string): Promise<void> {
  console.log('fetching', URL);
  const source: string = await fetch(URL);

  console.log('extracting to', destination);
  extract(source, destination);
}
