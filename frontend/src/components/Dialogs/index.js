import React from 'react';

import * as Link from './Link';
import * as Save from './Save';
import * as Node from './Node';

/* Constants */

const ALL = [Link, Save, Node];

/* Exports */

export default Dialogs;

/* Module functions */

function Dialogs() {
  return ALL.map((Component) => (
    <Component.default key={`dialogs-${Component.TYPE}`} />
  ));
}
