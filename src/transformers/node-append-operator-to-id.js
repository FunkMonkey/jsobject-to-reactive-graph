export default function appendOperatorToID( node ) {
  if( !node.value.operator )
    throw new Error( `Node '${node.id}' does not have 'value.operator' ` );

  node.id = node.id + `(${node.value.operator})`;
}
