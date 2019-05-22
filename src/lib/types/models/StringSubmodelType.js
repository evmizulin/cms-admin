import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { StringModelType } from 'src/lib/types/models/StringModelType'

export class StringSubmodelType extends SubmodelType {
  _validate(model) {
    const { valid, errors } = super._validate(model)
    const { valid: patternValid, errors: patternErrors } = StringModelType.prototype._validatePattern(model)
    return { valid: valid && patternValid, errors: errors.concat(patternErrors) }
  }

  _getBasicSchema() {
    const schema = StringModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return StringModelType.prototype.toSchema.call(this)
  }
}
