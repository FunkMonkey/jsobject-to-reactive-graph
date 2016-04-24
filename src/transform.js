import toNodeConfig from './to-node-config';

export function transformGraphConfig( graphConfig, gTransformers ) {
  return gTransformers.reduce( ( prevConf, curr ) => {
    return curr( prevConf );
  }, graphConfig );
}


export function transformNodeConfig( nodeConfig, nTransformers ) {
  return nTransformers.reduce( ( prevConf, curr ) => {
    return curr( prevConf );
  }, nodeConfig );
}


export function transform( graphInput, gTransformers, nTransformers ) {
  const graphConfig = {
    origin: graphInput,
    nodes: null
  };

  const transformedGraphConfig = transformGraphConfig( graphConfig, gTransformers );

  transformedGraphConfig.nodes = transformedGraphConfig.nodes
    .map( node => transformNodeConfig( toNodeConfig( node, transformedGraphConfig ),
                                       nTransformers ) );

  return graphConfig;
}
