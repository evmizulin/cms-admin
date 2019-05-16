import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { EnumModelType } from 'src/lib/types/models/EnumModelType'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'
import { EnumControlSmart } from 'src/models/components/dialogs/enum-type/EnumControlSmart'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'

export class EnumModel extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(EnumModelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      step: 1,
      model: {
        type: 'enum',
        // validation fix - enum will init deeper
        enum: [],
      },
      errors: {
        apiId: '',
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
    onStepChange(1, 2)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: EnumModelType, field })
  }

  onNext() {
    const { onStepChange } = this.props
    const onDone = model => {
      this.setState({ step: 2 })
      onStepChange(2, 2)
    }
    dialogTypeOnDone.call(this, { Type: EnumModelType, fields: ['apiId', 'title', 'description'], onDone })
  }

  onBack() {
    const { onStepChange } = this.props
    this.setState({ step: 1 })
    onStepChange(1, 2)
  }

  onDone(enumState) {
    const { onDone } = this.props
    const { model } = this.state
    delete model.default
    delete model.enum
    model.enum = enumState.enum
    if (enumState.hasOwnProperty('default')) {
      model.default = enumState.default
    }
    onDone(model)
  }

  render() {
    const { model, errors, step } = this.state
    const { onClose, onFirstBack, initialModel } = this.props
    const enumControl = (
      <EnumControlSmart
        onClose={onClose}
        onBack={() => this.onBack()}
        onDone={enumState => this.onDone(enumState)}
        initialModel={initialModel}
      />
    )
    return step === 1 ? (
      <Steps
        onSelectChange={() => {}}
        onStringChange={(...props) => this.onStringChange(...props)}
        onNumberChange={() => {}}
        onBooleanChange={() => {}}
        onBlur={(...props) => this.onBlur(...props)}
        onClose={onClose}
        onBack={onFirstBack}
        onNext={(...props) => this.onNext(...props)}
        onDone={() => {}}
        step={1}
        steps={[
          [
            {
              type: 'string',
              name: 'apiId',
              label: 'API ID',
              required: true,
              value: model.apiId,
              error: errors.apiId,
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
          ],
        ]}
      />
    ) : (
      enumControl
    )
  }
}
