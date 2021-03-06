import { transform, transformGraphConfig, transformNodeConfig } from './transform';
import toGraph from './to-graph';
import ensureTransformLayer from './utils/ensure-transform-layer';

// graph transformers
import nodesFromDict from './transformers/graph-nodes-from-dict';
import graphPipegroups from './transformers/graph-pipegroups';
import graphComponents from './transformers/graph-components';
import graphComponentMacros from './transformers/graph-component-macros';

// node transformers
import appendOperatorToID from './transformers/node-append-operator-to-id';
import nodeComponents from './transformers/node-components';
import nodePipegroups from './transformers/node-pipegroups';
import valueFromArray from './transformers/node-value-from-array';

const transformers = {
  graph: {
    nodesFromDict,
    components: graphComponents,
    componentMacros: graphComponentMacros,
    pipegroups: graphPipegroups
  },
  node: {
    appendOperatorToID,
    components: nodeComponents,
    pipegroups: nodePipegroups,
    valueFromArray
  }
};

const utils = {
  ensureTransformLayer
};

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
  transformers,
  utils
};
