import R from 'ramda';


export default function( nodeConfig ) {
  const pg = nodeConfig._pipegroupData.config;

  nodeConfig.sources = nodeConfig.sources.map( sourceName => {

    const sourcePG = R.find( x => x.id === sourceName, nodeConfig.graphConfig._pipegroupData.configs );

    if( !sourcePG )
      throw new Error( `Pipegroup '${sourceName}' referenced by '${nodeConfig.id}' does not exist!` );

    const lastNodeIndex = sourcePG.nodeConfigs.length - 1;

    if( lastNodeIndex < 0 )
      throw new Error( `Pipegroup '${sourceName}' referenced by '${nodeConfig.id}' does not have any nodes!` );

    return sourcePG.nodeConfigs[lastNodeIndex].id;
  } );

  if( nodeConfig._pipegroupData.index > 0 ) {
    const prevID = pg.nodeConfigs[nodeConfig._pipegroupData.index-1].id;
    nodeConfig.sources = R.prepend( prevID, nodeConfig.sources );
  }
}
