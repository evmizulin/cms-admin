import { validate } from 'src/lib/services/Validator'

// abstract class
export class AbstractType {
  constructor(model) {
    const { valid, errors } = this._validate(model)
    if (!valid) {
      throw new Error(`Unvalid model/submodel: ${model.type}, message: ${errors[0].message}`)
    }
    Object.keys(model).forEach(key => {
      this[key] = model[key]
    })
  }

  _validate(model) {
    return validate(model, this._getBasicSchema())
  }

  _getBasicSchema() {
    throw new Error('method _getBasicSchema must be implemented')
  }

  toSchema() {
    throw new Error('method toSchema must be implemented')
  }

  validateExactFields(model, fields) {
    const { errors } = this._validate(model)
    const filtredErrors = errors.filter(error => fields.some(field => field === error.field))
    return { valid: !filtredErrors.length, errors: filtredErrors }
  }
}
