export function onBooleanChange(field, value) {
  const { state } = this
  const { model } = state

  model[field] = value

  this.setState(state)
}
