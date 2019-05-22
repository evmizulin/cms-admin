export const isEntryConsistencyConflict = (entry, model) => {
  return !validate(model, entry.value)
}

const isValid = (model, value) => model.type === value.type

const isValidObject = (model, value) => {
  if (!isValid(model, value)) return false
  return Object.keys(model.properties).every(propName => {
    const subModel = model.properties[propName]
    const isValue = value.value.hasOwnProperty(propName)
    return isValue ? validate(subModel, value.value[propName]) : true
  })
}

const isValidArray = (model, value) => {
  if (!isValid(model, value)) return false
  return !model.items ? true : value.value.every(item => validate(model.items, item))
}

const validate = (model, value, entries) => {
  const MAP = {
    'string-line': isValid,
    'string-multiline': isValid,
    'string-html': isValid,
    'string-markdown': isValid,
    boolean: isValid,
    number: isValid,
    object: isValidObject,
    array: isValidArray,
    enum: isValid,
    reference: isValid,
    asset: isValid,
  }
  return MAP[model.type].call(this, model, value, entries)
}
