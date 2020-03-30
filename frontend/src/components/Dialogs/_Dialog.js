import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { UIContext } from 'contexts/ui';

const _Dialog = ({
  name,
  title,
  children,
  action: { handler, label },
  ...rest
}) => {
  const {
    setDialogs,
    dialogs: { [name]: open },
  } = useContext(UIContext);

  const dialogHandler = setDialogs(name);

  const handleClose = () => {
    dialogHandler(false);
  };

  const handleClick = handler || handleClose;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      {...rest}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {children}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" variant="contained">
          {label}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default _Dialog;
