import { StringSubmodelType } from 'src/lib/types/models/StringSubmodelType'
import { NumberSubmodelType } from 'src/lib/types/models/NumberSubmodelType'
import { BooleanSubmodelType } from 'src/lib/types/models/BooleanSubmodelType'
import { ObjectSubmodelType } from 'src/lib/types/models/ObjectSubmodelType'
import { ArraySubmodelType } from 'src/lib/types/models/ArraySubmodelType'
import { EnumSubmodelType } from 'src/lib/types/models/EnumSubmodelType'
import { ReferenceSubmodelType } from 'src/lib/types/models/ReferenceSubmodelType'
import { AssetSubmodelType } from 'src/lib/types/models/AssetSubmodelType'

export function createSubmodel(submodel) {
  const map = {
    'string-line': StringSubmodelType,
    'string-html': StringSubmodelType,
    'string-markdown': StringSubmodelType,
    'string-multiline': StringSubmodelType,
    number: NumberSubmodelType,
    boolean: BooleanSubmodelType,
    object: ObjectSubmodelType,
    array: ArraySubmodelType,
    enum: EnumSubmodelType,
    reference: ReferenceSubmodelType,
    asset: AssetSubmodelType,
  }

  if (!submodel || !submodel.type || !map[submodel.type]) {
    throw new Error('unknown type of submodel')
  }

  return new map[submodel.type](submodel)
}
