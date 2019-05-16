import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { onBooleanChange } from 'src/models/helpers/onBooleanChange'
import { AssetSubmodelType } from 'src/lib/types/models/AssetSubmodelType'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'

export class AssetProp extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(AssetSubmodelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'asset',
        requiredProperty: false,
      },
      errors: {
        propertyName: '',
        title: '',
        description: '',
      },
    }
  }

  constructor(props) {
    super(props)
    const { initialModel } = props
    dialogConstructor.call(this, props, initialModel)
  }

  componentDidMount() {
    const { onStepChange } = this.props
    onStepChange(1, 1)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBooleanChange(...props) {
    onBooleanChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: AssetSubmodelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, {
      Type: AssetSubmodelType,
      fields: ['title', 'description', 'propertyName'],
      onDone,
    })
  }

  render() {
    const { model, errors } = this.state
    const { onClose, onFirstBack } = this.props
    return (
      <Steps
        onSelectChange={() => {}}
        onStringChange={(...props) => this.onStringChange(...props)}
        onNumberChange={() => {}}
        onBooleanChange={(...props) => this.onBooleanChange(...props)}
        onBlur={(...props) => this.onBlur(...props)}
        onClose={onClose}
        onBack={onFirstBack}
        onDone={(...props) => this.onDone(...props)}
        step={1}
        steps={[
          [
            {
              type: 'string',
              name: 'propertyName',
              label: 'Property name',
              required: true,
              value: model.propertyName,
              error: errors.propertyName,
            },
            {
              type: 'string',
              name: 'title',
              label: 'Title',
              required: true,
              value: model.title,
              error: errors.title,
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
              required: false,
              value: model.description,
              error: errors.description,
            },
            {
              type: 'checkox',
              name: 'requiredProperty',
              label: 'Required property',
              value: model.requiredProperty,
            },
          ],
        ]}
      />
    )
  }
}
