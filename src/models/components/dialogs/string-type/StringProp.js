import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { StringSubmodelType } from 'src/lib/types/models/StringSubmodelType'
import { onNumberChange } from 'src/models/helpers/onNumberChange'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { onBooleanChange } from 'src/models/helpers/onBooleanChange'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Subtype } from 'src/models/components/dialogs/string-type/Subtype'
import { Steps } from 'src/models/components/dialogs/Steps'

export class StringProp extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(StringSubmodelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      step: 1,
      model: {
        requiredProperty: false,
      },
      errors: {
        propertyName: '',
        title: '',
        description: '',
        default: '',
        minLength: '',
        maxLength: '',
        pattern: '',
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
    onStepChange(1, 3)
  }

  onTypeChange(value) {
    const { state } = this
    const { onStepChange } = this.props
    state.model.type = value
    state.step = 2
    onStepChange(2, 3)
    this.setState(state)
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
    dialogTypeOnBlur.call(this, { Type: StringSubmodelType, field })
  }

  onNext() {
    const { state } = this
    const { onStepChange } = this.props
    const onDone = () => {
      state.step = 3
      onStepChange(3, 3)
      this.setState(state)
    }
    dialogTypeOnDone.call(this, {
      Type: StringSubmodelType,
      fields: ['title', 'description', 'default', 'propertyName'],
      onDone,
    })
  }

  onBack() {
    const { state } = this
    const { step } = state
    const { onStepChange } = this.props
    state.step = step - 1
    onStepChange(step - 1, 3)
    this.setState(state)
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, {
      Type: StringSubmodelType,
      fields: ['minLength', 'maxLength', 'pattern'],
      onDone,
    })
  }

  render() {
    const { step, model, errors } = this.state
    const { onClose, onFirstBack } = this.props
    return (
      <div>
        {step !== 1 ? null : (
          <Subtype
            onTypeChange={(...props) => this.onTypeChange(...props)}
            onClose={onClose}
            onFirstBack={onFirstBack}
          />
        )}
        {step === 1 ? null : (
          <Steps
            onSelectChange={() => {}}
            onStringChange={(...props) => this.onStringChange(...props)}
            onNumberChange={(...props) => this.onNumberChange(...props)}
            onBooleanChange={(...props) => this.onBooleanChange(...props)}
            onBlur={(...props) => this.onBlur(...props)}
            onClose={onClose}
            onBack={() => this.onBack()}
            onNext={step === 2 ? (...props) => this.onNext(...props) : null}
            onDone={(...props) => this.onDone(...props)}
            step={step - 1}
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
                  type: 'string',
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
                  name: 'minLength',
                  label: 'Minimum length',
                  required: false,
                  value: model.minLength,
                  error: errors.minLength,
                },
                {
                  type: 'number',
                  name: 'maxLength',
                  label: 'Maximum length',
                  required: false,
                  value: model.maxLength,
                  error: errors.maxLength,
                },
                {
                  type: 'string',
                  name: 'pattern',
                  label: 'Pattern',
                  required: false,
                  value: model.pattern,
                  error: errors.pattern,
                  shrink: true,
                  placeholder: 'Enter a regexp, e.g. ^([0-9]+)$',
                },
              ],
            ]}
          />
        )}
      </div>
    )
  }
}
