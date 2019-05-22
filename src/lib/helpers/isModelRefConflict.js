export const isModelRefConflict = (model, models) => {
  return init(model, models)
}

const initObject = (model, models) => {
  return Object.keys(model.properties)
    .map(propName => {
      const subModel = model.properties[propName]
      return init(subModel, models)
    })
    .some(item => item === true)
}

const initArray = (model, models) => {
  return !model.items ? false : init(model.items, models)
}

const initReference = (model, models) => {
  return !models.some(item => item.id === model.reference)
}

const init = (model, models) => {
  const MAP = {
    'string-line': () => false,
    'string-multiline': () => false,
    'string-html': () => false,
    'string-markdown': () => false,
    boolean: () => false,
    number: () => false,
    object: initObject,
    array: initArray,
    enum: () => false,
    reference: initReference,
    asset: () => false,
  }
  return MAP[model.type].call(this, model, models)
}
