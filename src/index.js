import { transform, transformGraphConfig, transformNodeConfig } from './transform';
import toGraph from './to-graph';
import graphNodesFromDict from './transformers/graph-nodes-from-dict';
import graphNodesFromInput from './transformers/graph-nodes-from-input';
import graphPipegroups from './transformers/graph-pipegroups';
import nodePipegroups from './transformers/node-pipegroups';
import nodeValueFromArray from './transformers/node-value-from-array';
import nodeValueFromOrigin from './transformers/node-value-from-origin';

const transformers = {
  graph: {
    nodesFromDict: graphNodesFromDict,
    nodesFromInput: graphNodesFromInput,
    pipegroups: graphPipegroups
  },
  node: {
    pipegroups: nodePipegroups,
    valueFromArray: nodeValueFromArray,
    valueFromOrigin: nodeValueFromOrigin
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
