// how to save additional data?
//  - ID or new Object
//  - positions may change
//  - don't change original
//  - not sure if we want to deep-copy
// how to support both dynamically added data and data from original?

import ensureTransformLayer from './utils/ensure-transform-layer';

export function transformGraph( graph, gTransformers ) {
  return gTransformers.reduce( ( prevGraph, curr ) => {
    const newGraph = curr( prevGraph );
    // TODO: error if null
    return newGraph || prevGraph ;
  }, ensureTransformLayer( graph ) );
}

export function transformNodes( nodes, nTransformers ) {
  return nTransformers.reduce( ( prevNodes, transformer ) => {
    return prevNodes.map( conf => transformer( conf ) || conf ); // TODO: throw Error if null
  }, nodes );
}

export function transform( graphOrig, gTransformers, nTransformers ) {
  const graph = ensureTransformLayer( graphOrig );

  if( !graph.nodes )
    graph.nodes = [];

  const transformedGraph = transformGraph( graph, gTransformers );

  const nodes = transformedGraph.nodes
    .map( nodeOrig => {
      const node = ensureTransformLayer( nodeOrig );
      node._graph = transformedGraph;
      return node;
    } );

  transformedGraph.nodes = transformNodes( nodes, nTransformers );

  // transformedGraph.nodes = transformedGraph.nodes
  //   .map( node => transformNodeConfig( toNodeConfig( node, transformedGraph ),
  //                                      nTransformers ) );

  return graph;
}
