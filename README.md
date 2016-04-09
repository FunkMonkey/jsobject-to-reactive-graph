# rx-json-graph

## Open Questions

- How to construct the JSON?
- Do we need macros?
- Can bricks get graph nodes and macros?
- Do we provide multiple input nodes?
- Should we use a graph library?
- strict seperation of node elements (nodes vs bricks) in JSON or internal testing?
- multiple layers of graph strictness and functionality (f.ex macros as an addition)?
- how to handle inouts? => macros?
- instantiable vs. unique (instantiated by loader) => macros?

how to determine endpoints?
 - declare them
 - deduce from graph
 - necessary at all? => resolve nodes synchronously, when required

subscriptions may be hidden in code
  => rx endpoints unknown ( could even be inbetween )
  => everything must be evaluated OR observers must be marked

## GETTERS
- Can bricks get graph nodes and macros?
 - PROS:
   => flexibility for bricks
 - CONS:
   => more functionality in context

## GRAPHS
- Should we use a graph library?
 - PROS:
   => checking cyclic dependencies
   => visually create graphs
 - CONS:
   => graph endpoints are not necessarrily RX endpoints (observers)
   => only makes sense if there are no getter's for nodes

## MACROS

const macro = graph.getMacro( 'X' ); // returns function
o.let( macro( context ) )

## GRAPH FORMATS

Components => GraphX => Graph

## MULTIPLE INPUTS

- have 1 input from previous element plus more as a parameter
- [ "previous", ["next", args, ["other"] ] ]

## EXAMPLE

{
  macros: {
    // normal nodes without source
  },

  graph: {
    "endNodeName": {
      source: "inputNodeName",
      operators: [
        { macro:    "macroName" },
        { operator: "operatorName", context: "contextName", args: "foobar", extraSources: [ "otherNodeName" ] }
       ]
    }
  }
}
