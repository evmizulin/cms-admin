import { ModelType } from 'src/lib/types/models/ModelType'
import { createSubmodel } from 'src/lib/helpers/createSubmodel'
import deepFreeze from 'deep-freeze'

export class ArrayModelType extends ModelType {
  constructor(model) {
    super(model)
    if (model.items) {
      this.items = createSubmodel(model.items)
    }
    deepFreeze(this)
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type', 'uniqueItems'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: { enum: ['array'] },
        description: { type: 'string', minLength: 1 },
        minItems: { type: 'integer', minimum: 0 },
        maxItems: { type: 'integer', minimum: 0 },
        uniqueItems: { enum: [false] },
        items: { type: 'object' },
      },
    }
  }

  toSchema() {
    const model = this
    const schema = { type: 'array' }
    const props = ['minItems', 'maxItems', 'uniqueItems']
    props.forEach(item => {
      if (model.hasOwnProperty(item)) {
        schema[item] = model[item]
      }
    })
    if (model.items) {
      schema.items = model.items.toSchema()
    } else {
      /* app could work only with strict values, if model.items not set in enrty could be only empty array */
      schema.maxItems = 0
      schema.minItems = 0
    }
    return schema
  }
}
