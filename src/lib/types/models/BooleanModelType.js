import { ModelType } from 'src/lib/types/models/ModelType'
import deepFreeze from 'deep-freeze'

export class BooleanModelType extends ModelType {
  constructor(model) {
    super(model)
    deepFreeze(this)
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type', 'default'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: {
          enum: ['boolean'],
        },
        description: { type: 'string', minLength: 1 },
        default: { type: 'boolean' },
      },
    }
  }

  toSchema() {
    const schema = { type: 'boolean' }
    return schema
  }
}
