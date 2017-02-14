import ensureTransformLayer from './utils/ensure-transform-layer';

export function transformGraph( graph, gTransformers ) {
  return gTransformers.reduce( ( prevGraph, curr ) => {
    const newGraph = curr( prevGraph );
    // TODO: error if null
    return newGraph || prevGraph;
  }, ensureTransformLayer( graph ) );
}

export function transformNodes( nodes, nTransformers ) {
  return nTransformers.reduce( ( prevNodes, transformer ) =>
    prevNodes.map( conf => transformer( conf ) || conf ) // TODO: throw Error if null
  , nodes );
}

/**
 * Transforms a given JS object to a JS object that can be used with `toGraph`
 * to create a `graphlib` graph. Transformation happens on graph and on node
 * level using the passed transformers.
 *
 * @param    {Object}               graphOrig       Original graph representation
 * @param    {GraphTransformer[]}   gTransformers
 * @param    {NodeTransformer[]}    nTransformers
 * @return   {Object}
 */
export function transform( graphOrig, gTransformers, nTransformers ) {
  const graph = ensureTransformLayer( graphOrig );

  if ( !graph.nodes )
    graph.nodes = [];

  const transformedGraph = transformGraph( graph, gTransformers );

  const nodes = transformedGraph.nodes
    .map( nodeOrig => {
      const node = ensureTransformLayer( nodeOrig );
      node._graph = transformedGraph;
      return node;
    } );

  transformedGraph.nodes = transformNodes( nodes, nTransformers );

  return graph;
}
