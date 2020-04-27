import React from 'react';

/* Constant Exports */

export const UI = {
  Modal: {
    title: {
      edit: (name) => (
        <span>
          Editing collection <code>"{name}"</code>
        </span>
      ),
      create: () => <span>Create collection</span>,
    },
  },
  Dialog: {
    title: 'Are you sure?',
    message:
      'If you remove this collection all the nodes ands links related to this collection will be removed.',
  },
  configs: {
    templates: [
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
    ],
  },
};

export const ERRORS = {
  default: <span>Please fix your JSON to continue</span>,
  doesNotExist: (
    <span>
      You cannot modify the collection name, please instead create a new
      collection
    </span>
  ),
  alreadyExists: (
    <span>
      Collection already exists, consider editing that collection by clicking on
      one of its nodes
    </span>
  ),
  singleRoot: (
    <span>
      Your schema must have only one root-level field
      <ul>
        <li>the collection name</li>
      </ul>
    </span>
  ),
  invalidFields: (
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
    </span>
  ),
};
