import { isNumber } from 'src/lib/helpers/isNumber'

export function onNumberChange(field, value) {
  const { state } = this
  const { model, errors } = state

  model[field] = isNumber(value) ? +value : value
  errors[field] = ''

  if (model[field] === '') {
    delete model[field]
  }

  this.setState(state)
}
