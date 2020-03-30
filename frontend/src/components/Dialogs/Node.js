import React from 'react';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogCore from './_Dialog';

export const TYPE = 'node';

export const Dialog = () => {
  return (
    <DialogCore name={TYPE} action={{ label: 'Create' }}>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="collection-name"
          label="Collection Name"
        />
      </DialogContent>
    </DialogCore>
  );
};
