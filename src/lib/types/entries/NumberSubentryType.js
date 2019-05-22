import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class NumberSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['number'] }
    schema.properties.value = { type: 'number' }
    return schema
  }
}
