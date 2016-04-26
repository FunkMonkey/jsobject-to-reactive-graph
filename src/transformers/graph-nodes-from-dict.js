import R from 'ramda';
import toNodeConfig from '../to-node-config'

const dictToNodeConfigs = R.pipe(
  R.toPairs,
  R.map( nodePair => {
    const nodeConfig = toNodeConfig( nodePair );
    nodeConfig.id = nodePair[0];
    nodeConfig.value = nodePair[1];
    return nodeConfig;
  } )
);

export default function( graphConfig ) {
  const nodes = graphConfig.nodes || graphConfig.origin.nodes;

  graphConfig.nodes = dictToNodeConfigs( nodes );
}
