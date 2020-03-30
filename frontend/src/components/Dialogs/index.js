import React from 'react';

import * as Node from './Node';
import * as Link from './Link';
import * as Save from './Save';

const all = [Node, Link, Save];

const Dialogs = () =>
  all.map(Component => <Component.Dialog key={Component.TYPE} />);

export default Dialogs;
