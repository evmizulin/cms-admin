import { SubentryType } from 'src/lib/types/entries/SubentryType'
import { createSubentry } from 'src/lib/helpers/createSubentry'

export class ObjectSubentryType extends SubentryType {
  constructor(subentry) {
    super(subentry)
    Object.keys(subentry.value).forEach(key => {
      this.value[key] = createSubentry(subentry.value[key])
    })
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['object'] }
    schema.properties.value = { type: 'object' }
    return schema
  }

  toValue() {
    return Object.keys(this.value).reduce((res, key) => {
      res[key] = this.value[key].toValue()
      return res
    }, {})
  }
}
