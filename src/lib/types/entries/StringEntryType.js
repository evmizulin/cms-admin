import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'

export class StringEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = {
      enum: ['string-line', 'string-multiline', 'string-html', 'string-markdown'],
    }
    schema.properties.value.properties.value = { type: 'string' }

    return schema
  }
}
