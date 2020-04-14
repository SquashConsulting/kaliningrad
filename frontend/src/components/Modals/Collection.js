import React, { useEffect, useState, useContext } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from 'components/Actions/Dialog';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import useStyles from './styles';
import ModalCore from './_Modal';
import 'jsoneditor-react/es/editor.min.css';

export const TYPE = 'collection';

export const Modal = () => {
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
  const [showMsg, setShowMsg] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDialog = (isOpen) => () => {
    setDialogOpen(isOpen);
  };

  const handleClick = () => {
    // refactor this validation to use JSON::Schema instead
    if (error) return setShowMsg('Please fix your JSON to continue');

    if (Object.keys(json).length !== 1)
      return setShowMsg(
        <span>
          Your schema must have only one root-level field
          <ul>
            <li>the collection name</li>
          </ul>
        </span>,
      );

    if (type === 'edit' && !collections[Object.keys(json)[0]])
      return setShowMsg(
        'You cannot modify the collection name, please instead create a new collection',
      );

    if (type === 'create' && collections[Object.keys(json)[0]])
      return setShowMsg(
        'Collection already exists, consider editing that collection by clicking on one of its nodes',
      );

    if (
      Object.values(Object.values(json)[0]).some(
        (field) =>
          !(
            Object.keys(field).length === 2 &&
            ['string', 'number', 'boolean'].includes(field.type) &&
            typeof field.required === typeof true
          ),
      )
    )
      return setShowMsg(
        <span>
          Your collection fields must have only these fields:
          <ul>
            <li>
              <code>type: "string" | "number" | "boolean"</code>
            </li>
            <li>
              <code>required: boolean</code>
            </li>
          </ul>
        </span>,
      );

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
    if (!errors.length) setShowMsg(false);
    setError(!!errors.length);
  };

  const title =
    type === 'edit' ? (
      <span>
        Editing collection <code>"{name}"</code>
      </span>
    ) : (
      <span>Create collection</span>
    );

  return (
    <>
      <Dialog
        open={dialogOpen}
        title="Are you sure?"
        handler={handleRemove}
        handleClose={handleDialog(false)}
        message="If you remove this collection all the nodes ands links related to this collection will be removed."
      />
      <ModalCore name={TYPE} title={title}>
        <>
          <Editor
            value={json}
            navigationBar
            onChange={setJson}
            enableSort={false}
            enableTransform={false}
            allowedModes={['tree', 'code']}
            onValidationError={handleError}
            templates={[
              {
                text: 'Attribute',
                field: 'fieldName',
                title: 'Insert an Attribute Node',
                className: 'jsoneditor-type-object',
                value: {
                  type: 'string',
                  required: true,
                },
              },
            ]}
          />
          <div className={classes.contentButton}>
            {type === 'edit' && (
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
                onClick={handleDialog(true)}
              >
                Remove
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={handleClick}
              className={classes.button}
            >
              {type}
            </Button>
          </div>
          {showMsg && (
            <Typography
              component="div"
              variant="body1"
              color="textSecondary"
              className={classes.error}
            >
              {showMsg}
            </Typography>
          )}
        </>
      </ModalCore>
    </>
  );
};