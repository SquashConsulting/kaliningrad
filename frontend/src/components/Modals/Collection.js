import React, { useEffect, useState, useContext } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from 'components/Actions/Dialog';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import { UI } from './data';
import useStyles from './styles';
import ModalCore from './_Modal';
import { validateJson } from './utils/validators';

import 'jsoneditor-react/es/editor.min.css';

/* Exports */

export default Modal;
export const TYPE = 'collection';

/* Module Functions */

function Modal() {
  const classes = useStyles();

  const {
    setModals,
    modals: {
      [TYPE]: { open, name, type },
    },
  } = useContext(UIContext);

  const {
    setCollection,
    removeCollection,
    data: { collections },
  } = useContext(GraphContext);

  const [json, setJson] = useState({});
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (!open) return;

    const typeToJson = {
      edit: {
        [name]: collections[name],
      },
      create: {
        collectionName: {
          field: {
            type: 'string',
            required: true,
          },
        },
      },
    };

    setJson(typeToJson[type]);
  }, [open, type, name, collections]);

  const setDialogStatus = (isOpen) => () => {
    setDialogOpen(isOpen);
  };

  const updateCollection = () => {
    const message = validateJson(json, collections, type, error);

    if (message) return setErrorMessage(message);

    const collectionName = type === 'edit' ? name : Object.keys(json)[0];

    setCollection(collectionName, json[collectionName]);
    setModals(TYPE)(false);
  };

  const handleRemove = () => {
    removeCollection(name);
    setDialogOpen(false);
    setModals(TYPE)(false);
  };

  const handleError = (errors) => {
    if (!errors.length) setErrorMessage(null);
    setError(!!errors.length);
  };

  const Title = UI.Modal.title[type]();

  return (
    <>
      <Dialog
        open={dialogOpen}
        handler={handleRemove}
        title={UI.Dialog.title}
        message={UI.Dialog.message}
        handleClose={setDialogStatus(false)}
      />
      <ModalCore name={TYPE} title={Title}>
        <>
          <Editor
            value={json}
            navigationBar
            onChange={setJson}
            enableSort={false}
            enableTransform={false}
            allowedModes={['tree', 'code']}
            onValidationError={handleError}
            templates={UI.configs.templates}
          />
          <div className={classes.contentButton}>
            {type === 'edit' && (
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
                onClick={setDialogStatus(true)}
              >
                Remove
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={updateCollection}
              className={classes.button}
            >
              {type}
            </Button>
          </div>
          {errorMessage && (
            <Typography
              component="div"
              variant="body1"
              color="textSecondary"
              className={classes.error}
            >
              {errorMessage}
            </Typography>
          )}
        </>
      </ModalCore>
    </>
  );
}
