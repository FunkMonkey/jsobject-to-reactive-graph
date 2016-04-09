import Rx from 'rx';
import TestGraph from './test/test-graph';
import operators from './test/operators';

// TODO: think about using graphlib and traversing backwards from the end nodes

function createNode( rxGraph, nodeName ) {
  const nodeConfig = rxGraph.config.nodes[ nodeName ];
  if( !nodeConfig )
    throw new Error( `Node '${nodeName}' is referenced, but does not exist!` );

  if( rxGraph.nodesInCreation[ nodeName ] )
    throw new Error( `Node '${nodeName}' is in a cyclic dependency!` );
  else
    rxGraph.nodesInCreation[ nodeName ] = true;

  // collecting sources
  const sourceNodes = [];
  if( nodeConfig.source )
    sourceNodes.push( nodeConfig.source );

  nodeConfig.operators.forEach( operator => {
    if( operator.extraSources )
      sourceNodes.push( ...operator.extraSources );
  } );

  // creating sources
  sourceNodes.forEach( sourceNodeName => {
      if( !rxGraph.nodes[ sourceNodeName ] ) {
        createNode( rxGraph, sourceNodeName, rxGraph.config.nodes[ sourceNodeName ] );
      }
    } );

  // connecting
  let source = ( nodeConfig.source ) ? rxGraph.nodes[ nodeConfig.source ]
                                     : null;
  const node = nodeConfig.operators.reduce( ( prev, curr ) => {
    const operator = rxGraph.context.getOperator( curr.operator );

    const opConfig = {};

    if( curr.context )
      opConfig.context = rxGraph.context.getContext( curr.context );

    if( curr.extraSources )
      opConfig.extraSources = curr.extraSources.map( nodeName => rxGraph.nodes[ nodeName ] )

    if( prev )
      return prev.let( o => operator( o, opConfig ) );
    else
      return operator( null, opConfig );
  }, source );

  rxGraph.nodes[ nodeName ] = node;
  delete rxGraph.nodesInCreation[ nodeName ];
}

function createGraph( jsonGraph, graphContext ) {
  const output = Rx.Observer.create(
    ( val ) => {},
    ( err ) => console.error( err, err.stack ),
    ()  => console.info( 'DONE' )
  );

  const rxGraph = {
    config: jsonGraph,
    context: graphContext,
    nodes: {},
    nodesInCreation: {}
  }

  const nodes = Rx.Observable.pairs( jsonGraph.nodes )
    .map( ([ nodeName, config ]) => {
      if( rxGraph[ nodeName ] )
        return;

      createNode( rxGraph, nodeName );

    } )
    .subscribe( output );
}

export default function() {

  const Context = {
    getOperator ( opName ) {
      return operators[ opName ];
    },
    getContext( contextName ) {
      return contextName;
    }
  }

  const graph = createGraph( TestGraph, Context );
}
