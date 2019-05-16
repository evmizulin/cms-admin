export const isEmptyObject = (model, value) =>
  !Object.keys(model.properties).some(key => Object.keys(value).some(item => item === key))
