import React, { useContext } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import config from './config';

const Graph = () => {
  const { data } = useContext(GraphContext);
  const { setSelected } = useContext(UIContext);

  return (
    <D3Graph
      id="d3-graph"
      {...{
        data,
        config,
        onClickLink: setSelected('edge'),
        onClickNode: setSelected('collection'),
      }}
    />
  );
};

export default Graph;
