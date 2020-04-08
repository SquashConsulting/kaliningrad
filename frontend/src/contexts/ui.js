import React, { useState, useContext, createContext } from 'react';

import { GraphContext } from 'contexts/graph';

/**
 * @typedef {{ source: string, target: string }} Link
 */

const defaultState = {
  backdropOpen: false,
  modals: {
    edge: {
      name: null,
      open: false,
    },
    collection: {
      name: null,
      open: false,
    },
  },
  dialogs: {
    node: false,
    link: false,
    save: false,
    collection: false,
  },
};

export const UIContext = createContext(defaultState);

const UIContextProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const {
    data: { nodes, links },
  } = useContext(GraphContext);

  /**
   *
   * @param {boolean} backdropOpen
   */
  const setBackdropOpen = (backdropOpen) => {
    setState({ ...state, backdropOpen });
  };

  /**
   *
   * @param {("node" | "link")} type either `node` or `link`
   */
  const setSelected = (type) =>
    /**
     * @param {(Link | string)} entity either nodeId or link source
     * @param {(string | undefined)} target link `target` if type if 'link', `undefined` otherwise
     */
    (entity, target) => {
      const name =
        type === 'collection'
          ? nodes.find(({ id }) => id === entity)?.collection
          : links.find(
              ({ source, target: _target }) =>
                source === entity && _target === target,
            )?.edge;

      setState({
        ...state,
        modals: { ...state.modals, [type]: { name, open: true } },
      });
    };

  /**
   *
   * @param {string} name
   */
  const setDialogs = (name) =>
    /**
     * @param {boolean} open
     */
    (open) => {
      setState({ ...state, dialogs: { ...state.dialogs, [name]: open } });
    };

  /**
   *
   * @param {string} name name of the collection
   */
  const setModals = (name) =>
    /**
     * @param {boolean} open
     */
    (open) => {
      setState({
        ...state,
        modals: { ...state.modals, [name]: { ...state.modals[name], open } },
      });
    };

  return (
    <UIContext.Provider
      value={{ ...state, setModals, setDialogs, setSelected, setBackdropOpen }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
