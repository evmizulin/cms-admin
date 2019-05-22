import { ModelType } from 'src/lib/types/models/ModelType'
import deepFreeze from 'deep-freeze'

export class AssetModelType extends ModelType {
  constructor(model) {
    super(model)
    deepFreeze(this)
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: {
          enum: ['asset'],
        },
        description: { type: 'string', minLength: 1 },
      },
    }
  }

  toSchema() {
    const schema = { type: 'string', minLength: 1 }
    return schema
  }
}
