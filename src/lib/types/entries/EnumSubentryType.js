import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class EnumSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['enum'] }
    schema.properties.value = {
      anyOf: [{ type: 'boolean' }, { type: 'string' }, { type: 'number' }],
    }
    return schema
  }
}
