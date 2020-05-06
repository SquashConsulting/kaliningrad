import React, { useState, useContext } from 'react';
import FileSaver from 'file-saver';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import { UI } from './data';
import DialogCore from './_Dialog';

/* Exports */

export default Dialog;
export const TYPE = 'save';

/* Module Functions */

function Dialog() {
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

    const fileName = name.endsWith('.json') ? name : `${name}.json`;

    FileSaver.saveAs(blob, fileName);
    setDialogs(TYPE)(false);
  };

  return (
    <DialogCore
      name={TYPE}
      title={UI.Dialog.Save.title}
      action={{ handler, label: UI.Dialog.Save.actionLabel }}
    >
      <DialogContent>
        <DialogContentText>{UI.Dialog.Save.ContentText}</DialogContentText>
        <TextField
          required
          autoFocus
          fullWidth
          value={name}
          error={error}
          onChange={handleNameChange}
          label="File Name (we will append `.json`)"
        />
      </DialogContent>
    </DialogCore>
  );
}
