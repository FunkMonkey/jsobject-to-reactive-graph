import R from 'ramda';

export default R.curry( ( creator, dict ) =>
  R.map( creator, R.toPairs( dict ) )
);
