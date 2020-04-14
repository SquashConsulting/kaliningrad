import { fetch, extract } from 'gitly';

import { TEMPLATE_URL as URL } from 'utils/constants';

export default async function (destination: string): Promise<void> {
  console.log('fetching', URL);
  const source: string = await fetch(URL);

  console.log('extracting to', destination);
  await extract(source, destination);
}
