import R from 'ramda';

export default R.curry( function dictToArray( creator, dict ) {
  return R.map( creator, R.toPairs( dict ) );
} );
