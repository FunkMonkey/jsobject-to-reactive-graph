import R from 'ramda';

import { dictToPipegroups } from './graph-pipegroups';

const dictToComponents = R.pipe(
  R.toPairs,
  R.map( compPair => ({
    id: compPair[0],
    value: compPair[1]
  }) )
);

export default function graphComponents( graphConfig ) {
  let components = graphConfig.components || graphConfig.origin.components;

  if( !Array.isArray( components ) && typeof components === 'object' ) {
    components = dictToComponents( components );
  }

  if( !graphConfig.pipegroups )
    graphConfig.pipegroups = [];

  const compConfigs = components.map( component => {

    const pipegroups = dictToPipegroups( component.value.pipegroups );
    const compConfig = {
      id: component.id,
      origin: component,
      pipegroups: null
    };

    compConfig.pipegroups = pipegroups.map( pg => {
      const compPG = {
        id: `${component.id}::${pg.id}`,
        nodes: pg.nodes,
        _componentData: {
          origin: pg,
          config: compConfig
        }
      };

      graphConfig.pipegroups.push( compPG );

      return compPG;
    } )

    return compConfig;
  } );

  graphConfig._componentData = {
    configs: compConfigs
  };
}
