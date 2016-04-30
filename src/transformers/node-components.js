export default function nodeComponents( node ) {

  const pipegroup = node._pipegroupData.pipegroup;
  const component = pipegroup._componentData.component;

  node.sources = node.sources.map( sourceName => {
    if( sourceName.indexOf( '::' ) === -1 )
      return `${component.id}::${sourceName}`;
    else
      return sourceName;
  } );
}
