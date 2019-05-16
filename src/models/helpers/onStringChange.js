export function onStringChange(field, value) {
  const { state } = this
  const { model, errors } = state

  model[field] = value
  errors[field] = ''

  if (!model[field]) {
    delete model[field]
  }

  this.setState(state)
}
