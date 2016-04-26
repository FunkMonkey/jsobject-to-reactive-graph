import { transform, transformGraphConfig, transformNodeConfig } from './transform';
import toGraph from './to-graph';

// graph transformers
import nodesFromDict from './transformers/graph-nodes-from-dict';
import nodesFromInput from './transformers/graph-nodes-from-input';
import graphPipegroups from './transformers/graph-pipegroups';
import graphComponents from './transformers/graph-components';
import graphComponentMacros from './transformers/graph-component-macros';

// node transformers
import appendOperatorToID from './transformers/node-append-operator-to-id';
import nodeComponents from './transformers/node-components';
import nodePipegroups from './transformers/node-pipegroups';
import valueFromArray from './transformers/node-value-from-array';
import valueFromOrigin from './transformers/node-value-from-origin';

const transformers = {
  graph: {
    nodesFromDict,
    nodesFromInput,
    components: graphComponents,
    componentMacros: graphComponentMacros,
    pipegroups: graphPipegroups
  },
  node: {
    appendOperatorToID,
    components: nodeComponents,
    pipegroups: nodePipegroups,
    valueFromArray,
    valueFromOrigin
  }
}

function convertToGraph( graphInput, gTransformers, nTransformers ) {
  return toGraph( transform( graphInput, gTransformers, nTransformers ) );
}

// named exports
export {
  convertToGraph,
  transform,
  transformGraphConfig,
  transformNodeConfig,
  toGraph,
  transformers
};

// default export
export default {
  convertToGraph,
  transform,
  transformGraphConfig,
  transformNodeConfig,
  toGraph,
  transformers
}
