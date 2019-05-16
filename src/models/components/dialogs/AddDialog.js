import React, { Component } from 'react'
import { func, bool, oneOf, arrayOf, instanceOf } from 'prop-types'
import { Dialog } from 'src/lib/components/Dialog'
import { SelectType } from 'src/models/components/dialogs/SelectType'
import { StringModel } from 'src/models/components/dialogs/string-type/StringModel'
import { StringProp } from 'src/models/components/dialogs/string-type/StringProp'
import { ObjectProp } from 'src/models/components/dialogs/object-type/ObjectProp'
import { ObjectModel } from 'src/models/components/dialogs/object-type/ObjectModel'
import { NumberModel } from 'src/models/components/dialogs/number-type/NumberModel'
import { NumberProp } from 'src/models/components/dialogs/number-type/NumberProp'
import { BooleanModel } from 'src/models/components/dialogs/boolean-type/BooleanModel'
import { BooleanProp } from 'src/models/components/dialogs/boolean-type/BooleanProp'
import { ArrayModel } from 'src/models/components/dialogs/array-type/ArrayModel'
import { ArrayProp } from 'src/models/components/dialogs/array-type/ArrayProp'
import { ArrayItem } from 'src/models/components/dialogs/array-type/ArrayItem'
import { BooleanItem } from 'src/models/components/dialogs/boolean-type/BooleanItem'
import { NumberItem } from 'src/models/components/dialogs/number-type/NumberItem'
import { ObjectItem } from 'src/models/components/dialogs/object-type/ObjectItem'
import { StringItem } from 'src/models/components/dialogs/string-type/StringItem'
import { EnumItem } from 'src/models/components/dialogs/enum-type/EnumItem'
import { EnumModel } from 'src/models/components/dialogs/enum-type/EnumModel'
import { EnumProp } from 'src/models/components/dialogs/enum-type/EnumProp'
import { ModelType } from 'src/lib/types/models/ModelType'
import { ReferenceModel } from 'src/models/components/dialogs/reference-type/ReferenceModel'
import { ReferenceProp } from 'src/models/components/dialogs/reference-type/ReferenceProp'
import { ReferenceItem } from 'src/models/components/dialogs/reference-type/ReferenceItem'
import { AssetItem } from 'src/models/components/dialogs/asset-type/AssetItem'
import { AssetModel } from 'src/models/components/dialogs/asset-type/AssetModel'
import { AssetProp } from 'src/models/components/dialogs/asset-type/AssetProp'

export class AddDialog extends Component {
  static propTypes = {
    mod: oneOf(['model', 'prop', 'item']),
    open: bool.isRequired,
    onDoneItem: func.isRequired,
    onDoneModel: func.isRequired,
    onDoneProp: func.isRequired,
    onClose: func.isRequired,
    onExited: func.isRequired,
    models: arrayOf(instanceOf(ModelType)).isRequired,
  }

  static defaultProps = {
    mod: null,
  }

  state = this.initState()

  initState() {
    return {
      progress: 0,
      baseType: null,
    }
  }

  onReset() {
    this.setState(this.initState())
  }

  onStepChange(step, all) {
    this.setState({ progress: (100 / all) * step })
  }

  render() {
    const { mod, open, onClose, onDoneItem, onDoneModel, onDoneProp, onExited, models } = this.props
    const { baseType, progress } = this.state
    if (!mod) return null
    const MAP_COMPONENTS = {
      model: {
        string: StringModel,
        number: NumberModel,
        boolean: BooleanModel,
        object: ObjectModel,
        array: ArrayModel,
        enum: EnumModel,
        reference: ReferenceModel,
        asset: AssetModel,
      },
      prop: {
        string: StringProp,
        number: NumberProp,
        boolean: BooleanProp,
        object: ObjectProp,
        array: ArrayProp,
        enum: EnumProp,
        reference: ReferenceProp,
        asset: AssetProp,
      },
      item: {
        string: StringItem,
        number: NumberItem,
        boolean: BooleanItem,
        object: ObjectItem,
        array: ArrayItem,
        enum: EnumItem,
        reference: ReferenceItem,
        asset: AssetItem,
      },
    }
    const MAP_TITLE = {
      model: 'Creating new content model',
      prop: 'Creating new object property',
      item: 'Creating new array item',
    }
    const MAP_ACTIONS = {
      model: onDoneModel,
      prop: onDoneProp,
      item: onDoneItem,
    }
    const Component = baseType ? MAP_COMPONENTS[mod][baseType] : null
    return (
      <Dialog
        open={open}
        onClose={onClose}
        onExited={() => {
          this.onReset()
          onExited()
        }}
        progress={progress}
        title={MAP_TITLE[mod]}
      >
        {!Component ? (
          <SelectType onChange={type => this.setState({ baseType: type })} onClose={onClose} />
        ) : (
          <Component
            models={models}
            onClose={onClose}
            onDone={MAP_ACTIONS[mod]}
            onFirstBack={() => this.onReset()}
            onStepChange={(...props) => this.onStepChange(...props)}
          />
        )}
      </Dialog>
    )
  }
}
