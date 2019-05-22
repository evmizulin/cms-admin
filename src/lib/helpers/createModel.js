import { NumberModelType } from 'src/lib/types/models/NumberModelType'
import { StringModelType } from 'src/lib/types/models/StringModelType'
import { BooleanModelType } from 'src/lib/types/models/BooleanModelType'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'
import { EnumModelType } from 'src/lib/types/models/EnumModelType'
import { ReferenceModelType } from 'src/lib/types/models/ReferenceModelType'
import { AssetModelType } from 'src/lib/types/models/AssetModelType'

export function createModel(model) {
  const map = {
    'string-line': StringModelType,
    'string-html': StringModelType,
    'string-markdown': StringModelType,
    'string-multiline': StringModelType,
    number: NumberModelType,
    boolean: BooleanModelType,
    object: ObjectModelType,
    array: ArrayModelType,
    enum: EnumModelType,
    reference: ReferenceModelType,
    asset: AssetModelType,
  }

  if (!model || !model.type || !map[model.type]) {
    throw new Error('unknown type of model')
  }

  return new map[model.type](model)
}
