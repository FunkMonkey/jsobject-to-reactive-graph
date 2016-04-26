
export default function graphComponentMacros( graphConfig ) {
  if( !graphConfig._componentData )
    throw new Error( 'GraphComponents has to be executed before GraphComponentMacros' );

  graphConfig.pipegroups.forEach( pg => {
    pg.nodes = pg.nodes.reduce( ( nodes, currNode ) => {
      if( typeof currNode === 'object' && currNode.macro ) {
        // TODO: macros from other components

        // TODO: soooo hacky...
        const macro = pg._componentData.config.origin.value.macros[ currNode.macro ];
        macro.forEach( node => nodes.push( node ) );
      } else {
        nodes.push( currNode );
      }

      return nodes;
    }, [] );
  } );
}
