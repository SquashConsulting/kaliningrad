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

import useStyles from './styles';
import DialogCore from './_Dialog';

export const TYPE = 'node';

const defaultState = { label: '', collection: '' };

export const Dialog = () => {
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
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (!open) {
      setError(null);
      setState(defaultState);
    }
  }, [open]);

  const handler = () => {
    const { collection, label } = state;

    if (!(collection && label)) return setError('All the fields are required');

    if (nodes.find(node => node.label === label))
      return setError('A node with that label already exists.');

    const count = __meta__[collection] + 1;

    addNode({ label, collection, id: `${collection}/${count}` });

    setDialogs(TYPE)(false);
  };

  const handleChange = field => ({ target: { value } }) => {
    setState({ ...state, [field]: value });
  };

  const renderOptions = () =>
    Object.keys(collections).map(collection => (
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
      title="Create a node"
      action={{ handler, label: 'Create' }}
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
                label="Display Label"
                value={state.label}
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
};
