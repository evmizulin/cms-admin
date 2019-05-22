import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { onBooleanChange } from 'src/models/helpers/onBooleanChange'
import { BooleanModelType } from 'src/lib/types/models/BooleanModelType'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'

export class BooleanModel extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(BooleanModelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'boolean',
        default: true,
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
    onStepChange(1, 1)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBooleanChange(...props) {
    onBooleanChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: BooleanModelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, { Type: BooleanModelType, fields: ['apiId', 'title', 'description'], onDone })
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
            {
              type: 'switch',
              name: 'default',
              label: 'Default value',
              value: model.default,
            },
          ],
        ]}
      />
    )
  }
}
