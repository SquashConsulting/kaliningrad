import React, { useState, useContext, useRef } from 'react';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import Dialog from './Dialog';
import useStyles from './styles';
import { UI, ACTIONS } from './data';

/* Exports */

export default Actions;

/* Module Functions */

function Actions() {
  const classes = useStyles();

  const fileUploader = useRef(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { loadGraph, resetGraph } = useContext(GraphContext);
  const { setBackdropOpen, setDialogs, setModals } = useContext(UIContext);

  const handleUpload = async ({ target: { files } }) => {
    try {
      setBackdropOpen(true);
      const file = files[0];

      if (file.type !== 'application/json')
        throw new Error(UI.ERRORS.invalidFormat);

      const content = await file.text();

      loadGraph(content);
    } catch (e) {
      setError(e.message);
    } finally {
      setBackdropOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setBackdropOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBackdropOpen(false);
  };

  const closeErrorDialog = () => {
    setError(false);
  };

  const closeConfirmationDialog = () => {
    setConfirm(false);
  };

  const handleReset = () => {
    resetGraph();
    closeConfirmationDialog();
  };

  const typeToAction = {
    reset: () => setConfirm(true),
    upload: () => fileUploader.current.click(),
    collection: () => setModals('collection')(true, { type: 'create' }),
  };

  const handler = (type) => () => {
    if (typeToAction[type]) return typeToAction[type]();

    setDialogs(type)(true);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={confirm}
        handler={handleReset}
        title={UI.Dialog.title}
        message={UI.Dialog.message}
        handleClose={closeConfirmationDialog}
      />
      {error && (
        <Dialog
          title="Whoops!"
          open={!!error}
          message={error}
          handleClose={closeErrorDialog}
        />
      )}
      <input
        id="file"
        type="file"
        ref={fileUploader}
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
      <SpeedDial
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        icon={<SpeedDialIcon />}
        className={classes.speedDial}
        ariaLabel="Open Actions Dial"
      >
        {ACTIONS.map((Action) => (
          <SpeedDialAction
            tooltipOpen
            key={Action.name}
            icon={<Action.Icon />}
            tooltipTitle={Action.name}
            onClick={handler(Action.type)}
            classes={{ staticTooltipLabel: classes.tooltip }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
