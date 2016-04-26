import toNodeConfig from './to-node-config';

export function transformGraphConfig( graphConfig, gTransformers ) {
  return gTransformers.reduce( ( prevConf, curr ) => {
    const newConf = curr( prevConf );
    return newConf || prevConf;
  }, graphConfig );
}


// export function transformNodeConfig( nodeConfig, nTransformers ) {
//   return nTransformers.reduce( ( prevConf, curr ) => {
//     const newConf = curr( prevConf );
//     return newConf || prevConf;
//   }, nodeConfig );
// }

export function transformNodeConfigs( nodeConfigs, nTransformers ) {
  return nTransformers.reduce( ( prevConfigs, transformer ) => {
    return prevConfigs.map( conf => transformer( conf ) || conf );
  }, nodeConfigs );
}

export function transform( graphInput, gTransformers, nTransformers ) {
  const graphConfig = {
    origin: graphInput,
    nodes: null
  };

  const transformedGraphConfig = transformGraphConfig( graphConfig, gTransformers );

  const nodeConfigs = transformedGraphConfig.nodes
    .map( node => toNodeConfig( node, transformedGraphConfig ) );

  transformedGraphConfig.nodes = transformNodeConfigs( nodeConfigs, nTransformers );
  console.log( transformedGraphConfig );

  // transformedGraphConfig.nodes = transformedGraphConfig.nodes
  //   .map( node => transformNodeConfig( toNodeConfig( node, transformedGraphConfig ),
  //                                      nTransformers ) );

  return graphConfig;
}
