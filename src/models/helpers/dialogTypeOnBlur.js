import { validatePropertyName } from 'src/models/helpers/validatePropertyName'

export function dialogTypeOnBlur({ Type, field }) {
  const { state } = this
  const { model } = state

  const { errors } =
    field !== 'propertyName'
      ? Type.prototype.validateExactFields(model, [field])
      : validatePropertyName(model)
  state.errors[field] = errors.length ? errors[0].message : ''

  this.setState(state)
}
