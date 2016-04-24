import R from 'ramda';


export default function( nodeConfig ) {
  const pg = nodeConfig.pipegroup;


  // TODO: add pipegroup names to sources
  nodeConfig.sources = nodeConfig.sources.map( sourceName => {
    // TODO: throw error if sourcePG has no nodes
    const sourcePG = R.find( x => x.id === sourceName, nodeConfig.graphConfig.pipegroups );

    if( !sourcePG )
      throw new Error( `Pipegroup '${sourceName}' referenced by '${nodeConfig.id}' does not exist!` );

    return `${sourcePG.id}[${sourcePG.nodes.length - 1}]`;
  } )

  if( nodeConfig.pipegroupIndex > 0 )
    nodeConfig.sources = R.prepend( `${pg.id}[${nodeConfig.pipegroupIndex-1}]`, nodeConfig.sources );

  return nodeConfig;
}
