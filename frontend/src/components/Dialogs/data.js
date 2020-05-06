import React from 'react';

/* Constant Exports */

export const UI = {
  Dialog: {
    Link: {
      actionLabel: 'Create',
      title: 'Create a link',
    },
    Node: {
      actionLabel: 'Create',
      title: 'Create a node',
    },
    Save: {
      actionLabel: 'Download',
      title: 'Download Your Graph',
      ContentText: (
        <>
          Please note that this file must be processed through Kalinigrad{' '}
          <b>only</b>.
        </>
      ),
    },
  },
  Link: {
    emptyOptions: {
      _from: 'No valid node was found, try creating a new one.',
      _to:
        'No valid node was found consider changing the `_from` node, or try creating a new one.',
    },
  },
};

export const ERRORS = {
  required: 'All the fields are required',
  nodeExists: 'A node with that label already exists',
  noWhitespace: 'Edge names must not have any whitespace',
};
