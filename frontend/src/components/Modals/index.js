import React from 'react';

import * as Collection from './Collection';

/* Constants */

const ALL = [Collection];

/* Exports */

export default Modals;

/* Module Functions */

function Modals() {
  return ALL.map((Component) => (
    <Component.default key={`modals-${Component.TYPE}`} />
  ));
}
