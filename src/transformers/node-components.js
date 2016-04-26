export default function nodeComponents( nodeConfig ) {

  // far to hacky!
  const compConfig = nodeConfig._pipegroupData.config.origin._componentData.config;

  nodeConfig.sources = nodeConfig.sources.map( sourceName => {
    if( sourceName.indexOf( '::' ) === -1 )
      return `${compConfig.id}::${sourceName}`;
    else
      return sourceName;
  } );
}
