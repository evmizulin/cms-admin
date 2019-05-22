import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { NumberModelType } from 'src/lib/types/models/NumberModelType'

export class NumberSubmodelType extends SubmodelType {
  _getBasicSchema() {
    const schema = NumberModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return NumberModelType.prototype.toSchema.call(this)
  }
}
