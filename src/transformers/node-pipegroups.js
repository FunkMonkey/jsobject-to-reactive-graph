import R from 'ramda';

export default function( node ) {

  const pipegroup = node._pipegroupData.pipegroup;
  const pgIndex = node._pipegroupData.index;
  node.id = `${pipegroup.id}[${pgIndex}]`;

  node.sources = node.sources.map( sourceName => {
    const sourcePG = node._graph._pipegroupData.pipegroupsById[ sourceName ];

    if( !sourcePG )
      throw new Error( `Pipegroup '${sourceName}' referenced by '${node.id}' does not exist!` );

    const lastNodeIndex = sourcePG.nodes.length - 1;

    if( lastNodeIndex < 0 )
      throw new Error( `Pipegroup '${sourceName}' referenced by '${node.id}' does not have any nodes!` );

    return sourcePG.nodes[lastNodeIndex].id;
  } );

  if( pgIndex > 0 ) {
    const prevID = pipegroup.nodes[pgIndex - 1].id;
    node.sources = R.prepend( prevID, node.sources );
  }
}
