import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'
import { createSubentry } from 'src/lib/helpers/createSubentry'

export class ArrayEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    entry.value.value.forEach((subentry, i) => {
      this.value.value[i] = createSubentry(subentry)
    })
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = { enum: ['array'] }
    schema.properties.value.properties.value = { type: 'array' }
    return schema
  }

  toValue() {
    return this.value.value.map(item => item.toValue())
  }
}
