import React, { useState, useContext } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';

import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';

import { UIContext } from 'contexts/ui';
import { GraphContext } from 'contexts/graph';

import useStyles from './styles';
import DialogCore from './_Dialog';
import 'jsoneditor-react/es/editor.min.css';

export const TYPE = 'collection';

export const Dialog = () => {
  const classes = useStyles();
  const { setDialogs } = useContext(UIContext);
  const {
    data: { collections },
    setCollection,
  } = useContext(GraphContext);

  const [error, setError] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [json, setJson] = useState({
    collectionName: {
      field: {
        type: 'string',
        required: true,
      },
    },
  });

  const handleCreate = () => {
    // refactor this validation to use JSON::Schema instead
    if (error) return setShowMsg('Please fix your JSON to continue');

    if (Object.keys(json).length !== 1)
      return setShowMsg(
        <span>
          Your schema must have only one top-level field
          <ul>
            <li>the collection name</li>
          </ul>
        </span>,
      );

    if (collections[Object.keys(json)[0]])
      return setShowMsg('A collection with that name already exists');

    if (
      Object.values(Object.values(json)[0]).some(
        field =>
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

    const collectionName = Object.keys(json)[0];
    setCollection(collectionName, json[collectionName]);

    setDialogs(TYPE)(false);
  };

  const handleError = errors => {
    if (!errors.length) setShowMsg(false);
    setError(!!errors.length);
  };

  return (
    <DialogCore name={TYPE} action={{ handler: handleCreate, label: 'Create' }}>
      <DialogContent className={classes.content}>
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
      </DialogContent>
    </DialogCore>
  );
};
