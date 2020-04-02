declare namespace Kaliningrad {
  type AttributeType = 'number' | 'string' | 'boolean';

  interface Attribute {
    required: boolean;
    type: AttributeType;
  }

  interface Edge {
    _to: string;
    _from: string;
  }

  interface Node {
    id: string;
    label: string;
    collection: string;
  }

  interface Link {
    edge: string;
    source: string;
    target: string;
  }

  interface Attributes {
    [key: string]: Attribute;
  }

  interface Edges {
    [key: string]: Edge;
  }

  interface Collections {
    [key: string]: Attributes;
  }

  interface GraphConfig {
    edges: Edges;
    nodes: Node[];
    links: Link[];
    collections: Collections;
  }

  interface Graph {
    edges?: Edges;
    collections?: Collections;
  }
}
