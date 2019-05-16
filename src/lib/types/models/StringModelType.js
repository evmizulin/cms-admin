import { ModelType } from 'src/lib/types/models/ModelType'
import deepFreeze from 'deep-freeze'

export class StringModelType extends ModelType {
  constructor(model) {
    super(model)
    deepFreeze(this)
  }

  _validate(model) {
    const { valid, errors } = super._validate(model)
    const { valid: patternValid, errors: patternErrors } = this._validatePattern(model)
    return { valid: valid && patternValid, errors: errors.concat(patternErrors) }
  }

  _validatePattern(model) {
    if (model.pattern) {
      try {
        RegExp(model.pattern)
      } catch (error) {
        return { valid: false, errors: [{ field: 'pattern', message: error.message }] }
      }
    }
    return { valid: true, errors: [] }
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['apiId', 'type', 'title', 'id'],
      properties: {
        id: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: {
          enum: ['string-line', 'string-multiline', 'string-html', 'string-markdown'],
        },
        title: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        default: { type: 'string', minLength: 1 },
        minLength: { type: 'integer', minimum: 0 },
        maxLength: { type: 'integer', minimum: 0 },
        pattern: { type: 'string', minLength: 1 },
      },
    }
  }

  toSchema() {
    const model = this
    const schema = { type: 'string' }
    const props = ['minLength', 'maxLength', 'pattern']
    props.forEach(item => {
      if (model.hasOwnProperty(item)) {
        schema[item] = model[item]
      }
    })
    return schema
  }
}
