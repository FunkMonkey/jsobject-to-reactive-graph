import graphlib from 'graphlib';

function createOperatorID( node, operator, index ) {
  return `${node.name}/${index}/${operator.operator}`;
}

function getNode( nodes, nodeName ) {
  for( var i = 0; i < nodes.length; ++i )
    if( nodes[i].name === nodeName )
      return nodes[i];

  return null;
}

function getNodeEndID( nodes, nodeName ) {
  const node = getNode( nodes, nodeName );
  if( !node )
    throw new Error( `Node '${nodeName}' is referenced, but does not exist!` );

  if( node.operators.length === 0 )
    throw new Error( `Node '${nodeName}' is referenced, but does not have operators!` );

  const lastIndex = node.operators.length - 1;
  const lastOperator = node.operators[ lastIndex ];

  return createOperatorID(node, lastOperator, lastIndex);
}

// TODO: use ramda
function checkNodeNamesAreUnique( nodes ) {
  const nodeNames = Object.create( null );

  nodes.forEach( node => {
    if( nodeNames[ node.name ] )
    throw new Error( `Node '${node.name}' is not unique. Name already taken!` );
    nodeNames[ node.name ] = node;
  } );

}

export default function convertToGraph( rxJSONGraph ) {
  const rxNodes = rxJSONGraph.nodes;

  const graph = new graphlib.Graph();

  checkNodeNamesAreUnique( rxNodes );

  // creating operator nodes
  // TODO: sanity checks (node has 'name', etc.)
  rxNodes.forEach( node => {

    node.operators.forEach( ( operator, index ) => {
      const graphNodeID = createOperatorID(node, operator, index);
      graph.setNode( graphNodeID, {
        id: graphNodeID,
        parent: node,
        index,
        operator
      } );
    } );
  } );

  // creating operator edges
  rxNodes.forEach( node => {

    const source = node.source ? getNodeEndID( rxNodes, node.source ) : null;

    node.operators.reduce( ( prevID, currOp, i ) => {
      const currID = createOperatorID( node, currOp, i );

      if( prevID )
        graph.setEdge( prevID, currID, { index: 0 } );

      if( currOp.extraSources )
        currOp.extraSources.forEach( (sourceName, index) => {
          const sourceEndID = getNodeEndID( rxNodes, sourceName );
          graph.setEdge( sourceEndID, currID, { index: index + 1 } );
        } )

      return currID;
    }, source );

  } );

  return graph;

}
