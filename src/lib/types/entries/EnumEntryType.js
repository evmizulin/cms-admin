import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'

export class EnumEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = { enum: ['enum'] }
    schema.properties.value.properties.value = {
      anyOf: [{ type: 'boolean' }, { type: 'string' }, { type: 'number' }],
    }

    return schema
  }
}
