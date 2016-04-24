import graphlib from 'graphlib';

export default function toGraph( graphConfig ) {
  const graph = new graphlib.Graph();

  // creating nodes
  graphConfig.nodes.forEach( node => {
    graph.setNode( node.id, node.value );
  } );

  // connecting nodes
  graphConfig.nodes.forEach( ( node ) => {
    let edgeIndex = 0;
    node.sources.forEach( sourceName => {
      graph.setEdge( sourceName, node.id, edgeIndex++ );
    } );
  } );

  return graph;
}
