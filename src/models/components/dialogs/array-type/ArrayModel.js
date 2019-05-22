import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { onNumberChange } from 'src/models/helpers/onNumberChange'
import { Steps } from 'src/models/components/dialogs/Steps'

export class ArrayModel extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(ArrayModelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'array',
        uniqueItems: false,
      },
      errors: {
        apiId: '',
        title: '',
        description: '',
        minItems: '',
        maxItems: '',
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

  onNumberChange(...props) {
    onNumberChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: ArrayModelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, {
      Type: ArrayModelType,
      fields: ['apiId', 'title', 'description', 'minItems', 'maxItems'],
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
        onNumberChange={(...props) => this.onNumberChange(...props)}
        onBooleanChange={() => {}}
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
              type: 'number',
              name: 'minItems',
              label: 'Minimum items',
              required: false,
              value: model.minItems,
              error: errors.minItems,
            },
            {
              type: 'number',
              name: 'maxItems',
              label: 'Maximum items',
              required: false,
              value: model.maxItems,
              error: errors.maxItems,
            },
          ],
        ]}
      />
    )
  }
}
