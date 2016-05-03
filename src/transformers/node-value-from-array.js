import R from 'ramda';

export default function ( node ) {
  if ( node[0] )
    node.sources = R.concat( node.sources || [], node[0] );
  else
    node.sources = [];

  node.value = {
    operator: node[1],
    args: node.splice( 2 )
  };
}
