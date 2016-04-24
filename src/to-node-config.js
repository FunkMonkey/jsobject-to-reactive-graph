
function createNodeConfig( originNode, graphConfig ) {
  return {
    _isNodeConfig: true,
    origin: originNode,
    graphConfig,

    id: '',
    sources: [],

    value: null
  };
}

export default function toNodeConfig( node, graphConfig ) {
  if( node._isNodeConfig )
    return node;
  else
    return createNodeConfig( node, graphConfig );
}
