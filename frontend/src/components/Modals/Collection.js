import React, { useEffect, useState, useContext } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
      [TYPE]: { name },
    },
  } = useContext(UIContext);

  const {
    setCollection,
    data: { collections },
  } = useContext(GraphContext);

  const [error, setError] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [json, setJson] = useState({ [name]: collections[name] });

  useEffect(() => {
    if (name) {
      setJson({ [name]: collections[name] });
    }
  }, [name, collections]);

  const handleEdit = () => {
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

    if (!collections[Object.keys(json)[0]])
      return setShowMsg(
        'You cannot modify the collection name, please instead create a new collection',
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

    setCollection(name, json[name]);

    setModals(TYPE)(false);
  };

  const handleError = (errors) => {
    if (!errors.length) setShowMsg(false);
    setError(!!errors.length);
  };

  const title = (
    <span>
      Editing collection <code>"{name}"</code>
    </span>
  );

  return (
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
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
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
  );
};
