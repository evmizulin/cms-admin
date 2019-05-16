import { NumberEntryType } from 'src/lib/types/entries/NumberEntryType'
import { StringEntryType } from 'src/lib/types/entries/StringEntryType'
import { BooleanEntryType } from 'src/lib/types/entries/BooleanEntryType'
import { ObjectEntryType } from 'src/lib/types/entries/ObjectEntryType'
import { ArrayEntryType } from 'src/lib/types/entries/ArrayEntryType'
import { EnumEntryType } from 'src/lib/types/entries/EnumEntryType'
import { ReferenceEntryType } from 'src/lib/types/entries/ReferenceEntryType'
import { AssetEntryType } from 'src/lib/types/entries/AssetEntryType'

export function createEntry(entry) {
  const map = {
    'string-line': StringEntryType,
    'string-html': StringEntryType,
    'string-markdown': StringEntryType,
    'string-multiline': StringEntryType,
    number: NumberEntryType,
    boolean: BooleanEntryType,
    object: ObjectEntryType,
    array: ArrayEntryType,
    enum: EnumEntryType,
    reference: ReferenceEntryType,
    asset: AssetEntryType,
  }

  if (!entry || !entry.value || !entry.value.type || !map[entry.value.type]) {
    throw new Error('Unvalid entry: unknown type of entry')
  }

  return new map[entry.value.type](entry)
}
