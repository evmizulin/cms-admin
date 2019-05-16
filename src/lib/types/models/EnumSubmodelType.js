import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { EnumModelType } from 'src/lib/types/models/EnumModelType'

export class EnumSubmodelType extends SubmodelType {
  _getBasicSchema() {
    const schema = EnumModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  _validate(model) {
    const { valid, errors } = super._validate(model)
    const {
      valid: validByUniqueness,
      errors: uniquenessErrors,
    } = EnumModelType.prototype._validateUniqueness(model)
    const { valid: defaultFieldValid, errors: defaultFieldErrors } = EnumModelType.prototype._validateDefault(
      model
    )
    return {
      valid: valid && validByUniqueness && defaultFieldValid,
      errors: errors.concat(uniquenessErrors, defaultFieldErrors),
    }
  }

  toSchema() {
    return EnumModelType.prototype.toSchema.call(this)
  }
}
