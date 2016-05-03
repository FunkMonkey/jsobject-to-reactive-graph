import R from 'ramda';
import ifDictThenToArray from '../utils/if-dict-then-to-array';

import ensureTransformLayer from '../utils/ensure-transform-layer';

export function pairToPipegroup( [id, nodes] ) {
  return { id, nodes };
}

function pipegroupToPair( group ) {
  return [ group.id, group ];
}

export default function ( graph ) {
  const pipegroups = ifDictThenToArray( pairToPipegroup, graph.pipegroups );

  const nodes = [];
  graph.pipegroups = pipegroups.map( pgOrig => {
    const pg = ensureTransformLayer( pgOrig );

    pg.nodes = pg.nodes.map( ( nodeOrig, index ) => {
      const node = ensureTransformLayer( nodeOrig );
      node._pipegroupData = {
        pipegroup: pg,
        index
      };

      nodes.push( node );
      return node;
    } );

    return pg;
  } );

  graph.nodes = nodes;
  graph._pipegroupData = {
    pipegroupsById: R.fromPairs( R.map( pipegroupToPair, graph.pipegroups ) )
  };
}
