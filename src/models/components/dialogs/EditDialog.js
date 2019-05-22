import React, { Component } from 'react'
import { func, bool, instanceOf, oneOf, oneOfType, arrayOf } from 'prop-types'
import { Dialog } from 'src/lib/components/Dialog'
import { ModelType } from 'src/lib/types/models/ModelType'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
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
import { ReferenceModel } from 'src/models/components/dialogs/reference-type/ReferenceModel'
import { ReferenceProp } from 'src/models/components/dialogs/reference-type/ReferenceProp'
import { ReferenceItem } from 'src/models/components/dialogs/reference-type/ReferenceItem'
import { AssetItem } from 'src/models/components/dialogs/asset-type/AssetItem'
import { AssetModel } from 'src/models/components/dialogs/asset-type/AssetModel'
import { AssetProp } from 'src/models/components/dialogs/asset-type/AssetProp'

export class EditDialog extends Component {
  static propTypes = {
    mod: oneOf(['model', 'prop', 'item']),
    initialModel: oneOfType([instanceOf(ModelType), instanceOf(SubmodelType)]),
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
    initialModel: null,
  }

  constructor(props) {
    super(props)
    this.state = this.initState()
  }

  initState() {
    return { progress: 0 }
  }

  onReset() {
    this.setState(this.initState())
  }

  onStepChange(step, all) {
    if (all === 1) {
      this.setState({ progress: 100 })
    } else {
      this.setState({ progress: (100 / (all - 1)) * (step - 1) })
    }
  }

  render() {
    const {
      mod,
      open,
      onDoneItem,
      onDoneModel,
      onDoneProp,
      onClose,
      initialModel,
      onExited,
      models,
    } = this.props
    const { progress } = this.state
    if (!initialModel || !mod) return null
    const MAP_COMPONENTS = {
      model: {
        'string-line': StringModel,
        'string-html': StringModel,
        'string-markdown': StringModel,
        'string-multiline': StringModel,
        number: NumberModel,
        boolean: BooleanModel,
        object: ObjectModel,
        array: ArrayModel,
        enum: EnumModel,
        reference: ReferenceModel,
        asset: AssetModel,
      },
      prop: {
        'string-line': StringProp,
        'string-html': StringProp,
        'string-markdown': StringProp,
        'string-multiline': StringProp,
        number: NumberProp,
        boolean: BooleanProp,
        object: ObjectProp,
        array: ArrayProp,
        enum: EnumProp,
        reference: ReferenceProp,
        asset: AssetProp,
      },
      item: {
        'string-line': StringItem,
        'string-html': StringItem,
        'string-markdown': StringItem,
        'string-multiline': StringItem,
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
      model: 'Edit model',
      prop: 'Edit object property',
      item: 'Edit array item',
    }
    const MAP_ACTIONS = {
      model: onDoneModel,
      prop: onDoneProp,
      item: onDoneItem,
    }
    const Component = MAP_COMPONENTS[mod][initialModel.type]
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
        <Component
          models={models}
          onClose={onClose}
          onStepChange={(...props) => this.onStepChange(...props)}
          onDone={MAP_ACTIONS[mod]}
          initialModel={initialModel}
        />
      </Dialog>
    )
  }
}
