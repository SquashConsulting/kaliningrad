import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { UIContext } from 'contexts/ui';

/* Exports */

export default _Dialog;

/* Module Functions */

function _Dialog({
  name,
  title,
  children,
  action: { handler, label },
  ...rest
}) {
  const {
    setDialogs,
    dialogs: { [name]: open },
  } = useContext(UIContext);

  const dialogHandler = setDialogs(name);

  const closeDialog = () => {
    dialogHandler(false);
  };

  const handleClick = handler || closeDialog;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      {...rest}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {children}
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" variant="contained">
          {label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
