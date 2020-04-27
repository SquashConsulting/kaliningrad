import { fetch, extract } from 'gitly';

import { TEMPLATE_URL as URL } from 'utils/constants';

/* Exports */

export default clone;

/* Module Functions */

async function clone(destination: string): Promise<string> {
  console.info('fetching', URL);
  const source: string = await fetch(URL);

  console.info('extracting to', destination);
  return extract(source, destination);
}
