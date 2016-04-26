import toNodeConfig from '../to-node-config';
import R from 'ramda';

export const dictToPipegroups = R.pipe(
  R.toPairs,
  R.map( pipePair => ({
    id: pipePair[0],
    nodes: pipePair[1]
  }) )
);

export default function( graphConfig ) {

  let pipegroups = graphConfig.pipegroups || graphConfig.origin.pipegroups;

  if( !Array.isArray( pipegroups ) && typeof pipegroups === 'object' ) {
    pipegroups = dictToPipegroups( pipegroups );
  }

  if( !graphConfig.nodes )
    graphConfig.nodes = [];

  const pgConfigs = pipegroups.map( pg => {

    const pgConfig = {
      id: pg.id,
      origin: pg,
      nodeConfigs: null
    };

    pgConfig.nodeConfigs = pg.nodes.map( ( node, index ) => {
      const nodeConfig = toNodeConfig( node, graphConfig );

      nodeConfig.id = `${pg.id}[${index}]`;
      nodeConfig.value = node;
      nodeConfig._pipegroupData = {
        config: pgConfig,
        origin: node,
        index
      };

      graphConfig.nodes.push( nodeConfig );
      return nodeConfig;
    } );

    return pgConfig;
  } );

  graphConfig._pipegroupData = {
    configs: pgConfigs
  };
}
