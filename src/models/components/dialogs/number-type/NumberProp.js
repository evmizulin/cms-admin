import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { NumberSubmodelType } from 'src/lib/types/models/NumberSubmodelType'
import { onNumberChange } from 'src/models/helpers/onNumberChange'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { onBooleanChange } from 'src/models/helpers/onBooleanChange'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'

export class NumberProp extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(NumberSubmodelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      step: 1,
      model: {
        type: 'number',
        exclusiveMaximum: false,
        exclusiveMinimum: false,
        requiredProperty: false,
      },
      errors: {
        propertyName: '',
        title: '',
        description: '',
        default: '',
        minimum: '',
        maximum: '',
        multipleOf: '',
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
    onStepChange(1, 2)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onNumberChange(...props) {
    onNumberChange.call(this, ...props)
  }

  onBooleanChange(...props) {
    onBooleanChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: NumberSubmodelType, field })
  }

  onNext() {
    const { onStepChange } = this.props
    const { state } = this
    const onDone = () => {
      state.step = 2
      onStepChange(2, 2)
      this.setState(state)
    }
    dialogTypeOnDone.call(this, {
      Type: NumberSubmodelType,
      fields: ['title', 'description', 'default', 'propertyName'],
      onDone,
    })
  }

  onBack() {
    const { state } = this
    const { onStepChange } = this.props
    state.step = 1
    onStepChange(1, 2)
    this.setState(state)
  }

  onDone() {
    const { onDone } = this.props
    const handleDone = model => {
      if (typeof model.minimum !== 'number') {
        delete model.exclusiveMinimum
      }
      if (typeof model.maximum !== 'number') {
        delete model.exclusiveMaximum
      }
      onDone(model)
    }
    dialogTypeOnDone.call(this, {
      Type: NumberSubmodelType,
      fields: ['minimum', 'maximum', 'multipleOf'],
      onDone: handleDone,
    })
  }

  render() {
    const { step, model, errors } = this.state
    const { onClose, onFirstBack } = this.props
    return (
      <Steps
        onSelectChange={() => {}}
        onStringChange={(...props) => this.onStringChange(...props)}
        onNumberChange={(...props) => this.onNumberChange(...props)}
        onBooleanChange={(...props) => this.onBooleanChange(...props)}
        onBlur={(...props) => this.onBlur(...props)}
        onClose={onClose}
        onBack={step === 1 && onFirstBack ? onFirstBack : step === 2 ? () => this.onBack() : null}
        onNext={step === 1 ? () => this.onNext() : null}
        onDone={(...props) => this.onDone(...props)}
        step={step}
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
              type: 'number',
              name: 'default',
              label: 'Default value',
              required: false,
              value: model.default,
              error: errors.default,
            },
            {
              type: 'checkox',
              name: 'requiredProperty',
              label: 'Required property',
              value: model.requiredProperty,
            },
          ],
          [
            {
              type: 'number',
              name: 'minimum',
              label: 'Minimum',
              required: false,
              value: model.minimum,
              error: errors.minimum,
            },
            {
              type: 'number',
              name: 'maximum',
              label: 'Maximum',
              required: false,
              value: model.maximum,
              error: errors.maximum,
            },
            {
              type: 'checkox',
              name: 'exclusiveMinimum',
              label: 'Exclusive minimum',
              value: model.exclusiveMinimum,
            },
            {
              type: 'checkox',
              name: 'exclusiveMaximum',
              label: 'Exclusive maximum',
              value: model.exclusiveMaximum,
            },
            {
              type: 'number',
              name: 'multipleOf',
              label: 'Multiple of',
              required: false,
              value: model.multipleOf,
              error: errors.multipleOf,
            },
          ],
        ]}
      />
    )
  }
}
