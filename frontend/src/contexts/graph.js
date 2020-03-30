import React, { useState, createContext } from 'react';

import filterObject from 'utils/filterObject';

/**
 * @typedef {Object.<string, Attribute>} Attributes
 * @typedef {{ _from: string, _to: string }} EdgeAttribute
 * @typedef {{ type: string, required: boolean }} Attribute
 * @typedef {{ edge: string, source: string, target: string }} Edge
 * @typedef {{ id: string, label: string, collection: string }} Node
 */

const localState = window.localStorage.getItem('kalinigrad_state');

const defaultState = localState
  ? JSON.parse(localState)
  : {
      collections: {
        users: {
          username: {
            type: 'string',
            required: true,
          },
          name: {
            type: 'string',
            required: false,
          },
        },
      },
      edges: {
        follows: {
          _to: 'users',
          _from: 'users',
        },
      },
      nodes: [
        {
          id: 'users/1',
          label: 'User 1',
          collection: 'users',
        },
        {
          id: 'users/2',
          label: 'User 2',
          collection: 'users',
        },
      ],
      links: [
        {
          edge: 'follows',
          source: 'users/1',
          target: 'users/2',
        },
      ],
    };

export const GraphContext = createContext(defaultState);

const GraphContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultState);

  const updateState = newState => {
    setData(newState);
    window.localStorage.setItem('kalinigrad_state', JSON.stringify(newState));
  };

  //*************************//
  // Collection/Edge Actions //
  //*************************//

  /**
   * Creates/Updates a collection
   *
   * @param {string} name name of the collection
   * @param {Attributes} attributes attribute type definitions
   *
   */
  const setCollection = (name, attributes) => {
    updateState({
      ...data,
      collections: { ...data.collections, [name]: attributes },
    });
  };

  /**
   * Removes collection and all related nodes/links
   * @param {string} name
   */
  const removeCollection = name => {
    const {
      edges: oldEdges,
      links: oldLinks,
      nodes: oldNodes,
      collections: oldCollections,
    } = data;
    const collections = { ...oldCollections, [name]: null };

    const edges = filterObject(
      oldEdges,
      edge => ![edge._from, edge._to].includes(name),
    );

    const nodes = oldNodes.filter(node => node.collection !== name);
    const links = oldLinks.filter(
      ({ edge }) => ![oldEdges[edge]._from, oldEdges[edge]._to].includes(name),
    );

    updateState({ edges, links, nodes, collections });
  };

  /**
   * Creates/Updates an edge
   *
   * @param {string} name name of the edge
   * @param {EdgeAttribute | null} attributes edge definitions
   */
  const setEdge = (name, attributes) => {
    updateState({
      ...data,
      edges: { ...data.edges, [name]: attributes },
    });
  };

  /**
   * Removes edge with the given name
   *
   * @param {string} name name of the edge
   */
  const removeEdge = name => {
    setEdge(name, null);
  };

  //*******************//
  // Node/Link Actions //
  //*******************//

  /**
   * Adds a node to the graph
   *
   * @param {Node} node
   */
  const addNode = node => {
    updateState({
      ...data,
      nodes: [...data.nodes, node],
    });
  };

  /**
   * Removes given node from the graph
   *
   * @param {Node} node
   */
  const removeNode = node => {
    const newNodes = data.nodes.filter(_node => _node.id !== node.id);
    updateState({ ...data, nodes: newNodes });
  };

  /**
   * Adds an edge to the graph
   *
   * @param {Edge} link
   */
  const addLink = link => {
    updateState({
      ...data,
      links: [...data.links, link],
    });
  };

  /**
   * Removes given edge from the graph
   *
   * @param {Edge} edge
   */
  const removeLink = link => {
    const { edge: _edge, source: _source, target: _target } = link;
    const newLinks = data.links.filter(
      ({ edge, source, target }) =>
        !(edge === _edge && source === _source && target === _target),
    );

    updateState({ ...data, links: newLinks });
  };

  return (
    <GraphContext.Provider
      value={{
        data,
        addNode,
        addLink,
        setEdge,
        removeEdge,
        removeNode,
        removeLink,
        setCollection,
        removeCollection,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContextProvider;
