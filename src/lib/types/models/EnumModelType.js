import { ModelType } from 'src/lib/types/models/ModelType'
import uniq from 'lodash.uniq'
import deepFreeze from 'deep-freeze'

export class EnumModelType extends ModelType {
  constructor(model) {
    super(model)
    deepFreeze(this)
  }

  _validate(model) {
    const { valid, errors } = super._validate(model)
    const { valid: validByUniqueness, errors: uniquenessErrors } = this._validateUniqueness(model)
    const { valid: defaultFieldValid, errors: defaultFieldErrors } = this._validateDefault(model)
    return {
      valid: valid && validByUniqueness && defaultFieldValid,
      errors: errors.concat(uniquenessErrors, defaultFieldErrors),
    }
  }

  _validateUniqueness(model) {
    const enumValues = model.enum.map(item => item.value)
    const valid = uniq(enumValues).length === enumValues.length
    return { valid, errors: valid ? [] : [{ field: 'enum', message: 'All values in enum must be unique' }] }
  }

  _validateDefault(model) {
    const valid = !model.hasOwnProperty('default')
      ? true
      : model.enum.some(item => item.value === model.default)
    return {
      valid,
      errors: valid ? [] : [{ field: 'enum', message: 'Default value must be one of enum values' }],
    }
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'title', 'apiId', 'type', 'enum'],
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        apiId: { type: 'string', minLength: 1 },
        type: {
          enum: ['enum'],
        },
        description: { type: 'string', minLength: 1 },
        default: { anyOf: [{ type: 'boolean' }, { type: 'string' }, { type: 'number' }] },
        enum: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['label', 'value'],
            properties: {
              label: { type: 'string', minLength: 1 },
              value: { anyOf: [{ type: 'boolean' }, { type: 'string' }, { type: 'number' }] },
            },
          },
        },
      },
    }
  }

  toSchema() {
    const model = this
    return { enum: model.enum.map(item => item.value) }
  }

  getBasicSchema() {
    return this._getBasicSchema()
  }

  validateUniqueness(model) {
    return this._validateUniqueness(model)
  }
}
