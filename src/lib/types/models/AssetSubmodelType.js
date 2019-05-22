import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { AssetModelType } from 'src/lib/types/models/AssetModelType'

export class AssetSubmodelType extends SubmodelType {
  _getBasicSchema() {
    const schema = AssetModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return AssetModelType.prototype.toSchema.call(this)
  }
}
