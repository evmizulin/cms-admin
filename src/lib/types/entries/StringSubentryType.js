import { SubentryType } from 'src/lib/types/entries/SubentryType'

export class StringSubentryType extends SubentryType {
  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.type = {
      enum: ['string-line', 'string-multiline', 'string-html', 'string-markdown'],
    }
    schema.properties.value = { type: 'string' }
    return schema
  }
}
