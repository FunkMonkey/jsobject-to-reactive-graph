import R from 'ramda';
import ifDictThenToArray from '../utils/if-dict-then-to-array';
import ensureTransformLayer from '../utils/ensure-transform-layer';

import { pairToPipegroup } from './graph-pipegroups';

function pairToComponent( [id, compOrig] ) {
  const component = ensureTransformLayer( compOrig );
  component.id = id;
  return component;
}

function componentToPair( component ) {
  return [ component.id, component ];
}

export default function graphComponents( graph ) {
  const components = ifDictThenToArray( pairToComponent, graph.components );

  const pipegroups = [];

  graph.components = components.map( componentOrig => {
    const component = ensureTransformLayer( componentOrig );

    const compPGs = ifDictThenToArray( pairToPipegroup, component.pipegroups );
    component.pipegroups = compPGs.map( pgOrig => {
      const pg = ensureTransformLayer( pgOrig );
      pg.shortID = pg.id;
      pg.id = `${component.id}::${pg.id}`;
      pg._componentData = {
        component
      };

      pipegroups.push( pg );

      return pg;
    } );

    return component;
  } );

  graph.pipegroups = pipegroups;
  graph._componentData = {
    componentsById: R.fromPairs( R.map( componentToPair, graph.components ) )
  };
}
