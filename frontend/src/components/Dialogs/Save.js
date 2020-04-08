import React, { useState, useContext } from 'react';
import FileSaver from 'file-saver';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import DialogCore from './_Dialog';

export const TYPE = 'save';

export const Dialog = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const { data } = useContext(GraphContext);
  const { setDialogs } = useContext(UIContext);

  const handleNameChange = ({ target: { value } }) => {
    setError(false);
    setName(value);
  };

  const handler = () => {
    if (!name.length) return setError(true);

    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    FileSaver.saveAs(blob, `${name}.json`);
    setDialogs(TYPE)(false);
  };

  return (
    <DialogCore
      name={TYPE}
      title="Download your graph"
      action={{ handler, label: 'Download' }}
    >
      <DialogContent>
        <DialogContentText>
          Please note that this file must be processed through Kalinigrad{' '}
          <b>only</b>.
        </DialogContentText>
        <TextField
          required
          autoFocus
          fullWidth
          value={name}
          error={error}
          onChange={handleNameChange}
          label="File Name (we will append .json)"
        />
      </DialogContent>
    </DialogCore>
  );
};
