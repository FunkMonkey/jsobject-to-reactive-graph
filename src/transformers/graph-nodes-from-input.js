
export default function( graphConfig ) {
  graphConfig.nodes = graphConfig.origin.nodes || [];
  return graphConfig;
}
