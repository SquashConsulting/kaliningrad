import React from 'react';
import ReactDOM from 'react-dom';

import UIContextProvider from 'contexts/ui';
import GraphContextProvider from 'contexts/graph';

import Home from 'containers/Home';

ReactDOM.render(
  <GraphContextProvider>
    <UIContextProvider>
      <Home />
    </UIContextProvider>
  </GraphContextProvider>,
  document.getElementById('root'),
);
