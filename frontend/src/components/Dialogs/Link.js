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

export const TYPE = 'link';

const defaultState = { edge: '', _from: '', _to: '' };

export const Dialog = () => {
  const classes = useStyles();

  const {
    setEdge,
    addLink,
    data: { nodes, edges, links },
  } = useContext(GraphContext);

  const {
    setDialogs,
    dialogs: { [TYPE]: open },
  } = useContext(UIContext);

  const [error, setError] = useState(null);
  const [state, setState] = useState(defaultState);
  const [validNodes, setValidNodes] = useState(nodes);

  useEffect(() => {
    if (!open) {
      setError(null);
      setState(defaultState);
    }
  }, [open]);

  useEffect(() => {
    if (state._from) {
      setValidNodes(
        nodes.filter(
          node =>
            node.id !== state._from &&
            !links.find(
              ({ source, target }) =>
                target === node.id && source === state._from,
            ),
        ),
      );
    }
  }, [state._from, nodes, links]);

  const handleCreate = () => {
    setError(null);

    const { edge, _from, _to } = state;
    const edgeName = edge.trim();

    if (Object.values(state).some(value => !value))
      return setError('All the fields are required');

    if (edgeName.split(' ').length > 1)
      return setError('Edge names must not have any whitespace');

    if (!edges[edgeName]) {
      const fromCollection = nodes.find(node => node.id === _from).collection;
      const toCollection = nodes.find(node => node.id === _to).collection;
      setEdge(edgeName, { _from: fromCollection, _to: toCollection });
    }

    addLink({ edge: edgeName, source: _from, target: _to });

    setDialogs(TYPE)(false);
  };

  const handleChange = type => ({ target: { value } }) => {
    setState({ ...state, [type]: value || '' });
  };

  const renderOptions = type => {
    const acceptedNodes = type === '_from' ? nodes : validNodes;

    if (!acceptedNodes.length)
      return (
        <MenuItem key={`${type}-no-result`} value="" disabled>
          No valid node was found,{' '}
          {type === '_to' && 'consider changing the `_from` node, or '}
          try creating a new one.
        </MenuItem>
      );

    return acceptedNodes.map(node => (
      <MenuItem key={node.id} value={node.id}>
        {node.label}
      </MenuItem>
    ));
  };

  return (
    <DialogCore
      name={TYPE}
      title="Create a link"
      action={{ handler: handleCreate, label: 'Create' }}
    >
      <DialogContent>
        <form className={classes.container}>
          <div className={classes.selects}>
            <FormControl className={classes.formControl}>
              <InputLabel id="_from-label">From</InputLabel>
              <Select
                required
                autoFocus
                id="_from-select"
                input={<Input />}
                value={state._from}
                labelId="_from-label"
                onChange={handleChange('_from')}
              >
                {renderOptions('_from')}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                error={error}
                id="edge-name"
                margin="dense"
                label="Edge Name"
                value={state.edge}
                onChange={handleChange('edge')}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="_to-label">To</InputLabel>
              <Select
                required
                id="_to-select"
                input={<Input />}
                value={state._to}
                labelId="_to-label"
                onChange={handleChange('_to')}
              >
                {renderOptions('_to')}
              </Select>
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
