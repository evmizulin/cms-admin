import { NumberSubentryType } from 'src/lib/types/entries/NumberSubentryType'
import { StringSubentryType } from 'src/lib/types/entries/StringSubentryType'
import { BooleanSubentryType } from 'src/lib/types/entries/BooleanSubentryType'
import { ObjectSubentryType } from 'src/lib/types/entries/ObjectSubentryType'
import { ArraySubentryType } from 'src/lib/types/entries/ArraySubentryType'
import { EnumSubentryType } from 'src/lib/types/entries/EnumSubentryType'
import { ReferenceSubentryType } from 'src/lib/types/entries/ReferenceSubentryType'
import { AssetSubentryType } from 'src/lib/types/entries/AssetSubentryType'

export function createSubentry(subentry) {
  const map = {
    'string-line': StringSubentryType,
    'string-html': StringSubentryType,
    'string-markdown': StringSubentryType,
    'string-multiline': StringSubentryType,
    number: NumberSubentryType,
    boolean: BooleanSubentryType,
    object: ObjectSubentryType,
    array: ArraySubentryType,
    enum: EnumSubentryType,
    reference: ReferenceSubentryType,
    asset: AssetSubentryType,
  }

  if (!subentry || !subentry.type || !map[subentry.type]) {
    throw new Error('Unvalid subentry: unknown type of subentry')
  }

  return new map[subentry.type](subentry)
}
