import React, { useCallback, useContext } from 'react';
import { Backdrop, Modal as MuiModal, Paper, Slide } from '@material-ui/core';

import { UIContext } from 'contexts/ui';
import useDetectKey from 'hooks/useDetectKey';

import useStyles from './styles';
import ModalContentWrapper from './ContentWrapper';

/* Exports */
export default Modal;

/* Module Functions */

function Modal({ children, name, title }) {
  const classes = useStyles();

  const {
    setModals,
    modals: {
      [name]: { open },
    },
  } = useContext(UIContext);

  const dialogHandler = setModals(name);

  const onClose = useCallback(() => {
    dialogHandler(false);
  }, [dialogHandler]);

  const handleEscKey = useCallback(
    (e) => {
      // Close the modal when ESC key is pressed
      if (e.keyCode === 27) onClose();
    },
    [onClose],
  );

  useDetectKey(handleEscKey);

  return (
    <MuiModal
      open={open}
      keepMounted={false}
      aria-labelledby="modal"
      aria-describedby="modal"
      onBackdropClick={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        open: open,
        timeout: { enter: 200, exit: 300 },
      }}
    >
      <Slide direction="left" in={open} timeout={{ enter: 200, exit: 200 }}>
        <Paper elevation={1} className={classes.modal}>
          <ModalContentWrapper title={title} onClose={onClose}>
            {children}
          </ModalContentWrapper>
        </Paper>
      </Slide>
    </MuiModal>
  );
}
