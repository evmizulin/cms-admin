import { ModelType } from 'src/lib/types/models/ModelType'
import { createSubmodel } from 'src/lib/helpers/createSubmodel'
import deepFreeze from 'deep-freeze'

export class ObjectModelType extends ModelType {
  constructor(model) {
    super(model)
    Object.keys(model.properties).forEach(propName => {
      this.properties[propName] = createSubmodel(model.properties[propName])
    })
    deepFreeze(this)
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type', 'additionalProperties', 'required', 'properties'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: { enum: ['object'] },
        description: { type: 'string', minLength: 1 },
        additionalProperties: { enum: [false] },
        required: { type: 'array', uniqueItems: true, items: { type: 'string', minLength: 1 } },
        properties: { type: 'object' },
      },
    }
  }

  _validate(model) {
    const { valid, errors } = super._validate(model)
    const { valid: requiredFieldsValid, errors: requiredFieldsErrors } = this._validateRequireqFields(model)
    return { valid: valid && requiredFieldsValid, errors: errors.concat(requiredFieldsErrors) }
  }

  _validateRequireqFields(model) {
    const errors = []
    if (model.required && model.required.forEach && model.properties) {
      model.required.forEach(field => {
        if (!model.properties[field]) {
          errors.push({
            field: 'required',
            message: `Field ${field} required but doesn't exist in properties`,
          })
        }
      })
    }
    return { valid: !errors.length, errors }
  }

  toSchema() {
    const model = this
    const schema = { type: 'object' }
    const props = ['additionalProperties', 'required']
    props.forEach(item => {
      if (model.hasOwnProperty(item)) {
        schema[item] = model[item]
      }
    })
    schema.properties = {}
    Object.keys(model.properties).forEach(propName => {
      schema.properties[propName] = model.properties[propName].toSchema()
    })
    return schema
  }
}
