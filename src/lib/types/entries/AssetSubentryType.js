import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class AssetSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = { enum: ['asset'] }
    schema.properties.value = { type: 'string', minLength: 1 }
    return schema
  }
}
