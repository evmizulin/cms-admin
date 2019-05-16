import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'

export class BooleanEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = { enum: ['boolean'] }
    schema.properties.value.properties.value = { type: 'boolean' }
    return schema
  }
}
