import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { BooleanModelType } from 'src/lib/types/models/BooleanModelType'

export class BooleanSubmodelType extends SubmodelType {
  _getBasicSchema() {
    const schema = BooleanModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return BooleanModelType.prototype.toSchema.call(this)
  }
}
