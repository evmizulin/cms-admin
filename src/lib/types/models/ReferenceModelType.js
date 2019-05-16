import { ModelType } from 'src/lib/types/models/ModelType'
import deepFreeze from 'deep-freeze'

export class ReferenceModelType extends ModelType {
  constructor(model) {
    super(model)
    deepFreeze(this)
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type', 'reference'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: {
          enum: ['reference'],
        },
        description: { type: 'string', minLength: 1 },
        reference: { type: 'string', minLength: 1 },
      },
    }
  }

  toSchema() {
    const schema = { type: 'string', minLength: 1 }
    return schema
  }
}
