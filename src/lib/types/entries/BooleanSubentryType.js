import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class BooleanSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['boolean'] }
    schema.properties.value = { type: 'boolean' }
    return schema
  }
}
