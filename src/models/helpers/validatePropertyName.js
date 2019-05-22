import { validate } from 'src/lib/services/Validator'

export function validatePropertyName(model) {
  return validate(model.propertyName, { type: 'string', minLength: 1 })
}
