import R from 'ramda';
import dictToArray from './dict-to-array';

export default R.curry( ( creator, dict ) => {
  if( typeof dict === 'object' && !Array.isArray( dict ) ) {
    return dictToArray( creator, dict );
  } else {
    return dict;
  }
} );
