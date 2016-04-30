
let referenceID = 0;
export function createTransformLayer( obj ) {
  const layer = Object.create( obj );

  layer._hasTransformLayer = true;
  layer._referenceID = referenceID++;

  return layer;
}

export default function ensureTransformLayer( obj ) {
  return ( obj._hasTransformLayer ) ? obj : createTransformLayer( obj );
}
