export default {
  type: 'object',
  properties: {
    __meta__: {
      type: 'object',
      patternProperties: {
        '^S+': {
          type: 'number',
        },
      },
    },

    links: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          edge: {
            type: 'string',
          },
          source: {
            type: 'string',
          },
          target: {
            type: 'string',
          },
        },
      },
    },

    nodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
          collection: {
            type: 'string',
          },
        },
      },
    },
  },

  edges: {
    type: 'object',
    patternProperties: {
      '^S+': {
        type: 'object',
        properties: {
          _to: {
            type: 'string',
          },
          _from: {
            type: 'string',
          },
        },
      },
    },
  },

  collections: {
    type: 'object',
    patternProperties: {
      '^S+': {
        type: 'object',
        patternProperties: {
          '^S+': {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              required: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
};
