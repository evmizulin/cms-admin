import { ModelType } from 'src/lib/types/models/ModelType'
import deepFreeze from 'deep-freeze'

export class NumberModelType extends ModelType {
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
          enum: ['number'],
        },
        description: { type: 'string', minLength: 1 },
        default: { type: 'number' },
        minimum: { type: 'number' },
        maximum: { type: 'number' },
        // TODO: exist if exist min and max
        exclusiveMaximum: { type: 'boolean' },
        exclusiveMinimum: { type: 'boolean' },
        multipleOf: { type: 'number', minimum: 0, exclusiveMinimum: true },
      },
    }
  }

  toSchema() {
    const model = this
    const schema = { type: 'number' }
    const props = ['minimum', 'maximum', 'exclusiveMaximum', 'exclusiveMinimum', 'multipleOf']
    props.forEach(item => {
      if (model.hasOwnProperty(item)) {
        schema[item] = model[item]
      }
    })
    return schema
  }
}
