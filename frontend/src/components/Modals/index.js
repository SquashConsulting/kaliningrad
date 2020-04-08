import React from 'react';

import * as Collection from './Collection';

const all = [Collection];

const Modals = () =>
  all.map((Component) => <Component.Modal key={`modals-${Component.TYPE}`} />);

export default Modals;
