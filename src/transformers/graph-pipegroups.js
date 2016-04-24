import toNodeConfig from '../to-node-config';
import R from 'ramda';

const dictToPipegroups = R.pipe(
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

  pipegroups.forEach( pg => {

    pg.nodes.forEach( ( node, index ) => {
      const nodeConfig = toNodeConfig( node, graphConfig );
      nodeConfig.id = `${pg.id}[${index}]`;
      nodeConfig.value = node;
      nodeConfig.pipegroup = pg;
      nodeConfig.pipegroupIndex = index;

      graphConfig.nodes.push( nodeConfig );
    } );
  } );

  graphConfig.pipegroups = pipegroups;

  return graphConfig;
}
