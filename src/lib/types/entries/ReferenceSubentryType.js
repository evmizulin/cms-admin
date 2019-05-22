import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class ReferenceSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['reference'] }
    schema.properties.value = { type: 'string', minLength: 1 }
    return schema
  }
}
