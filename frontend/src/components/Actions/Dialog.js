import React from 'react';

import Button from '@material-ui/core/Button';
import DialogCore from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

/* Exports */

export default Dialog;

/* Module Functions */

function Dialog({ title, open, handleClose, handler, message }) {
  return (
    <DialogCore
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handler && (
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        )}
        <Button onClick={handler || handleClose} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </DialogCore>
  );
}
