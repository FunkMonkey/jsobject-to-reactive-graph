
export default function appendOperatorToID( nodeConfig ) {
  if( !nodeConfig.value.operator )
    throw new Error( `NodeConfig for ${nodeConfig.id} does not have 'value.operator' ` );
  nodeConfig.id += `(${nodeConfig.value.operator})`;
}
