import { validate } from 'src/lib/services/Validator'

// abstract class
export class EntryType {
  constructor(entry) {
    const { valid, errors } = this._validate(entry)
    if (!valid) {
      throw new Error(`Unvalid entry: ${entry.id}, message: ${errors[0].message}`)
    }
    Object.keys(entry).forEach(key => {
      this[key] = entry[key]
    })
  }

  _validate(entry) {
    return validate(entry, this._getBasicSchema())
  }

  _getBasicSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'modelId', 'value', 'identificator'],
      properties: {
        id: { type: 'string', minLength: 1 },
        modelId: { type: 'string', minLength: 1 },
        identificator: { type: 'string' },
        value: {
          type: 'object',
          additionalProperties: false,
          required: ['type', 'value'],
          properties: {
            type: {},
            value: {},
          },
        },
      },
    }
  }

  toValue() {
    return this.value.value
  }
}
