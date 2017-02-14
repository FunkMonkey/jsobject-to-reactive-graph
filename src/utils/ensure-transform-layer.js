
let referenceID = 0;

export function createTransformLayer( obj ) {
  const layer = Object.create( obj );

  layer._hasTransformLayer = true;
  layer._referenceID = referenceID++;

  return layer;
}

/**
 * Creates a simple transform layer around the given object if it doesn't
 * have one
 *
 * @param  {Object}   obj   Any object
 * @return {Object}         Object with transform layer
 */
export default function ensureTransformLayer( obj ) {
  return ( obj._hasTransformLayer ) ? obj : createTransformLayer( obj );
}
