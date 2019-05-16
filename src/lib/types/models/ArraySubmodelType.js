import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'
import { createSubmodel } from 'src/lib/helpers/createSubmodel'

export class ArraySubmodelType extends SubmodelType {
  constructor(submodel) {
    super(submodel)
    if (submodel.items) {
      this.items = createSubmodel(submodel.items)
    }
  }

  _getBasicSchema() {
    const schema = ArrayModelType.prototype._getBasicSchema()
    schema.required = schema.required.filter(field => field !== 'apiId' && field !== 'id')
    delete schema.properties.id
    delete schema.properties.apiId
    return schema
  }

  toSchema() {
    return ArrayModelType.prototype.toSchema.call(this)
  }
}
