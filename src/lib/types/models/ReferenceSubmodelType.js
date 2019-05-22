import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { ReferenceModelType } from 'src/lib/types/models/ReferenceModelType'

export class ReferenceSubmodelType extends SubmodelType {
  _getBasicSchema() {
    const schema = ReferenceModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return ReferenceModelType.prototype.toSchema.call(this)
  }
}
