export const isEntryRefConflict = (model, entry, entries) => {
  return init(model, entry.value, entries)
}

const initObject = (model, value, entries) => {
  return Object.keys(model.properties)
    .map(propName => {
      const subModel = model.properties[propName]
      const isValue = value.value.hasOwnProperty(propName)
      return isValue ? init(subModel, value.value[propName], entries) : false
    })
    .some(item => item === true)
}

const initArray = (model, value, entries) => {
  return !model.items
    ? false
    : value.value.map(item => init(model.items, item, entries)).some(item => item === true)
}

const initReference = (model, value, entries) => {
  return !entries.filter(entry => entry.modelId === model.reference).some(entry => entry.id === value.value)
}

const init = (model, value, entries) => {
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
  return MAP[model.type].call(this, model, value, entries)
}
