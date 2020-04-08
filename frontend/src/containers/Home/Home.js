import React, { useContext } from 'react';

import Backdrop from '@material-ui/core/Backdrop';

import Graph from 'components/Graph';
import Modals from 'components/Modals';
import Actions from 'components/Actions';
import Dialogs from 'components/Dialogs';

import { UIContext } from 'contexts/ui';

import useStyles from './styles';

const Home = () => {
  const classes = useStyles();
  const { backdropOpen } = useContext(UIContext);

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={backdropOpen} />
      <Graph />
      <Modals />
      <Actions />
      <Dialogs />
    </div>
  );
};

export default Home;
