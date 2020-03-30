import React, { useContext } from 'react';

import Backdrop from '@material-ui/core/Backdrop';

import Graph from 'components/Graph';
import Actions from 'components/Actions';
import Dialogs from 'components/Dialogs';

import { UIContext } from 'contexts/ui';

import useStyles from './styles';

const Home = () => {
  const classes = useStyles();
  const { backdropOpen } = useContext(UIContext);

  return (
    <>
      <Backdrop className={classes.backdrop} open={backdropOpen} />
      <div className={classes.root}>
        <div className={classes.graph}>
          <Graph />
        </div>
        <div className={classes.controls}></div>
      </div>
      <Actions />
      <Dialogs />
    </>
  );
};

export default Home;
