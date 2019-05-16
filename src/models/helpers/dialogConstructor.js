export function dialogConstructor(props, initialModel) {
  const clearState = this.getClearState()
  if (initialModel) {
    Object.keys(initialModel).forEach(key => {
      clearState.model[key] = initialModel[key]
    })
  }
  this.state = clearState
}
