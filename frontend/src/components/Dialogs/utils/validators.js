import { ERRORS } from 'components/Dialogs/data';

/* Exports */
export { validateLink, getValidNodes, validateNodes };

/* Module Functions */

/**
 *
 * @param {any} nodes
 * @param {any} edges
 * @param {any} links
 * @param {string} edge
 * @param {string} source
 */
function getValidNodes(nodes, edges, links, edge, source) {
  return nodes.filter((node) => {
    if (node.id === source) return false;
    if (edges[edge]) return node.collection === edges[edge]._to;

    return !links.find(
      ({ source: _source, target }) => target === node.id && _source === source,
    );
  });
}

/**
 *
 * @param {*} nodes
 * @param {*} collection
 * @param {*} label
 *
 * @returns {(string | null)}
 */
function validateNodes(nodes, collection, label) {
  if (!(collection && label)) return ERRORS.required;
  if (nodes.find((node) => node.label === label)) return ERRORS.nodeExists;

  return null;
}

/**
 *
 * @param {any} state
 * @param {string} edgeName
 *
 * @returns {(string | false)}
 */
function validateLink(state, edgeName) {
  if (Object.values(state).some((value) => !value)) return ERRORS.required;
  if (edgeName.split(' ').length > 1) return ERRORS.noWhitespace;

  return false;
}
