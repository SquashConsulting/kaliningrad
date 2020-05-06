import React, { useState, useEffect, useContext } from 'react';

import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import { UI } from './data';
import useStyles from './styles';
import DialogCore from './_Dialog';
import { validateNodes } from './utils/validators';

/* Constants */

const DEFAULT_STATE = { label: '', collection: '' };

/* Exports */

export default Dialog;
export const TYPE = 'node';

/* Module Functions */

function Dialog() {
  const classes = useStyles();

  const {
    addNode,
    data: { __meta__, collections, nodes },
  } = useContext(GraphContext);

  const {
    dialogs: { [TYPE]: open },
    setDialogs,
  } = useContext(UIContext);

  const [error, setError] = useState(null);
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (!open) {
      setError(null);
      setState(DEFAULT_STATE);
    }
  }, [open]);

  const handler = () => {
    const { collection, label } = state;

    const errorMessage = validateNodes(nodes, collection, label);
    if (errorMessage) return setError(errorMessage);

    const count = __meta__[collection] + 1;
    const id = `${collection}/${count}`;

    addNode({ label, collection, id });
    setDialogs(TYPE)(false);
  };

  const handleChange = (field) => ({ target: { value } }) => {
    setState({ ...state, [field]: value });
  };

  const renderOptions = () =>
    Object.keys(collections).map((collection) => (
      <MenuItem
        key={collection}
        value={collection}
        className={classes.collection}
      >
        {collection}
      </MenuItem>
    ));

  return (
    <DialogCore
      name={TYPE}
      title={UI.Dialog.Node.title}
      action={{ handler, label: UI.Dialog.Node.actionLabel }}
    >
      <DialogContent>
        <form className={classes.container}>
          <div className={classes.selectsColumn}>
            <FormControl className={classes.formControlFull}>
              <InputLabel id="collections-label">Collection</InputLabel>
              <Select
                required
                autoFocus
                fullWidth
                input={<Input />}
                id="collection-select"
                value={state.collection}
                labelId="collection-label"
                onChange={handleChange('collection')}
              >
                {renderOptions()}
              </Select>
            </FormControl>
            <FormControl className={classes.formControlFull}>
              <TextField
                required
                id="label"
                margin="dense"
                value={state.label}
                label="Display Label"
                onChange={handleChange('label')}
              />
            </FormControl>
          </div>
          <div className={classes.error}>
            <Typography variant="body1" color="textSecondary">
              {error}
            </Typography>
          </div>
        </form>
      </DialogContent>
    </DialogCore>
  );
}
