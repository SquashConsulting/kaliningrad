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
import { getValidNodes, validateLink } from './utils/validators';

/* Constants */

const DEFAULT_STATE = { edge: '', _from: '', _to: '' };

/* Exports */

export default Dialog;
export const TYPE = 'link';

function Dialog() {
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
  const [state, setState] = useState(DEFAULT_STATE);
  const [validNodes, setValidNodes] = useState(nodes);

  useEffect(() => {
    if (!open) {
      setError(null);
      setState(DEFAULT_STATE);
    }
  }, [open]);

  useEffect(() => {
    if (state._from) {
      const _validNodes = getValidNodes(
        nodes,
        edges,
        links,
        state.edge,
        state._from,
      );

      setValidNodes(_validNodes);
    }
  }, [state._from, state.edge, edges, nodes, links]);

  const createLink = () => {
    setError(null);

    const { edge, _from, _to } = state;
    const edgeName = edge.trim();

    const errorMessage = validateLink(state, edgeName);
    if (errorMessage) setError(errorMessage);

    if (!edges[edgeName]) {
      const fromCollection = nodes.find((node) => node.id === _from).collection;
      const toCollection = nodes.find((node) => node.id === _to).collection;

      setEdge(
        edgeName,
        { _from: fromCollection, _to: toCollection },
        { source: _from, target: _to },
      );
    } else {
      addLink({ edge: edgeName, source: _from, target: _to });
    }

    setDialogs(TYPE)(false);
  };

  const updateState = (type) => ({ target: { value } }) => {
    setState({ ...state, [type]: value || '' });
  };

  const renderOptions = (type) => {
    const acceptedNodes = type === '_from' ? nodes : validNodes;

    if (!acceptedNodes.length)
      return (
        <MenuItem key={`${type}-no-result`} value="" disabled>
          {UI.Link.emptyOptions[type]}
        </MenuItem>
      );

    return acceptedNodes.map((node) => (
      <MenuItem key={node.id} value={node.id}>
        {node.label}
      </MenuItem>
    ));
  };

  return (
    <DialogCore
      name={TYPE}
      title={UI.Dialog.Link.title}
      action={{ handler: createLink, label: UI.Dialog.Link.actionLabel }}
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
                onChange={updateState('_from')}
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
                onChange={updateState('edge')}
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
                onChange={updateState('_to')}
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
}
