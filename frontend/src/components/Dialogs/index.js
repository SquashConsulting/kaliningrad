import React from 'react';

import * as Link from './Link';
import * as Save from './Save';
import * as Node from './Node';

const all = [Link, Save, Node];

const Dialogs = () =>
  all.map((Component) => (
    <Component.Dialog key={`dialogs-${Component.TYPE}`} />
  ));

export default Dialogs;
