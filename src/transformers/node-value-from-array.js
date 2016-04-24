import R from 'ramda';

export default function( nodeConfig ) {
  const prevValue = nodeConfig.value;
  if( prevValue[0] )
    nodeConfig.sources = R.concat( nodeConfig.sources, prevValue[0] );

  nodeConfig.value = {
    operator: prevValue[1],
    args: prevValue.splice( 2 )
  }

  return nodeConfig;
}
