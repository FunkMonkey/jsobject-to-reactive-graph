import ensureTransformLayer from '../utils/ensure-transform-layer';

function getMacro( id, component ) {
  const macro = component.macros && component.macros[ id ];

  if( !macro )
    throw new Error( `Component '${component.id}' does not have a macro named '${id}'` );

  return macro;
}

export default function graphComponentMacros( graph ) {
  if( !graph._componentData )
    throw new Error( 'GraphComponents has to be executed before GraphComponentMacros' );

  graph.pipegroups = graph.pipegroups.map( pgOrig => {
    const pg = ensureTransformLayer( pgOrig );

    pg.nodes = pg.nodes.reduce( ( nodes, currNode ) => {
      if( typeof currNode === 'object' && currNode.macro ) {

        let macroID = '';
        let macroComp = null;
        if( currNode.macro.indexOf( '::' ) === -1 ) {
          macroID = currNode.macro;
          macroComp = pg._componentData.component;
        }
        else {
          const macroInfo = currNode.macro.split( '::' );
          macroID = macroInfo[1];
          macroComp = graph._componentData.componentsById[ macroInfo[0] ];

          if( !macroComp )
            throw new Error( `Component '${macroInfo[0]}' referenced by macro '${currNode.macro}' in component pipegroup '${pg.id}' does not exist!` )
        }

        const macro = getMacro( macroID, macroComp );

        macro.forEach( nodeOrig =>  {
          const node = ensureTransformLayer( nodeOrig );
          node._macroData = {
            originalComponent: macroComp,
            id: macroID
          };
          nodes.push( node );
        } );
      } else {
        nodes.push( ensureTransformLayer( currNode ) );
      }

      return nodes;
    }, [] );

    return pg;
  } );
}
