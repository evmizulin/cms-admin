import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'
import { createSubentry } from 'src/lib/helpers/createSubentry'

export class ObjectEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    Object.keys(entry.value.value).forEach(key => {
      this.value.value[key] = createSubentry(entry.value.value[key])
    })
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = { enum: ['object'] }
    schema.properties.value.properties.value = { type: 'object' }
    return schema
  }

  toValue() {
    return Object.keys(this.value.value).reduce((res, key) => {
      res[key] = this.value.value[key].toValue()
      return res
    }, {})
  }
}
