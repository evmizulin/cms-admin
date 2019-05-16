import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import { createSubmodel } from 'src/lib/helpers/createSubmodel'

export class ObjectSubmodelType extends SubmodelType {
  constructor(submodel) {
    super(submodel)
    Object.keys(submodel.properties).forEach(propName => {
      this.properties[propName] = createSubmodel(submodel.properties[propName])
    })
  }

  _validate(model) {
    const { valid, errors } = super._validate(model)
    const {
      valid: requiredFieldsValid,
      errors: requiredFieldsErrors,
    } = ObjectModelType.prototype._validateRequireqFields(model)
    return { valid: valid && requiredFieldsValid, errors: errors.concat(requiredFieldsErrors) }
  }

  _getBasicSchema() {
    const schema = ObjectModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return ObjectModelType.prototype.toSchema.call(this)
  }
}
