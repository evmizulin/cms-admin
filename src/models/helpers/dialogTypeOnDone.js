import clone from 'clone'
import { validatePropertyName } from 'src/models/helpers/validatePropertyName'

export function dialogTypeOnDone({ Type, fields, onDone }) {
  const { state } = this
  const { model } = state

  const { valid, errors } = Type.prototype.validateExactFields(
    model,
    fields.filter(item => item !== 'propertyName')
  )
  fields.forEach(field => {
    const fieldErrors = errors.filter(error => error.field === field)
    state.errors[field] = fieldErrors.length ? fieldErrors[0].message : ''
  })

  let propertyNameValid = true
  if (fields.some(item => item === 'propertyName')) {
    const { valid, errors } = validatePropertyName(model)
    propertyNameValid = valid
    state.errors.propertyName = errors.length ? errors[0].message : ''
  }

  if (valid && propertyNameValid) {
    onDone(clone(model))
  } else {
    this.setState(state)
  }
}
