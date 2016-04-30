
import ensureTransformLayer from '../utils/ensure-transform-layer';
import ifDictThenToArray from '../utils/if-dict-then-to-array';

function pairToNode( [id, nodeOrig] ) {
  const node = ensureTransformLayer( nodeOrig );
  node.id = id;
  return node;
}


export default function graphNodesFromDict( graph ) {
  graph.nodes = ifDictThenToArray( pairToNode, graph.nodes )
}
