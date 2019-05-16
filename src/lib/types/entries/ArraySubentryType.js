import { SubentryType } from 'src/lib/types/entries/SubentryType'
import { createSubentry } from 'src/lib/helpers/createSubentry'

export class ArraySubentryType extends SubentryType {
  constructor(subentry) {
    super(subentry)
    subentry.value.forEach((subentry, i) => {
      this.value[i] = createSubentry(subentry)
    })
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['array'] }
    schema.properties.value = { type: 'array' }
    return schema
  }

  toValue() {
    return this.value.map(item => item.toValue())
  }
}
