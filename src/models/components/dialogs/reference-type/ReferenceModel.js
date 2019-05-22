import React, { Component } from 'react'
import { func, instanceOf, arrayOf } from 'prop-types'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'
import { ModelType } from 'src/lib/types/models/ModelType'
import { ReferenceModelType } from 'src/lib/types/models/ReferenceModelType'

import { cn } from './ReferenceModel.style'

export class ReferenceModel extends Component {
  static propTypes = {
    models: arrayOf(instanceOf(ModelType)).isRequired,
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(ReferenceModelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'reference',
      },
      errors: {
        apiId: '',
        title: '',
        description: '',
        reference: '',
      },
    }
  }

  constructor(props) {
    super(props)
    const { initialModel, models } = props
    dialogConstructor.call(this, props, initialModel)
    const { model } = this.state
    if (!models.some(item => item.id === model.reference)) {
      delete model.reference
    }
  }

  componentDidMount() {
    const { onStepChange } = this.props
    onStepChange(1, 1)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: ReferenceModelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, {
      Type: ReferenceModelType,
      fields: ['apiId', 'title', 'description', 'reference'],
      onDone,
    })
  }

  render() {
    const { model, errors } = this.state
    const { onClose, onFirstBack, models } = this.props
    return (
      <Steps
        classes={{
          contentContainer: cn.contentContainer,
        }}
        onStringChange={(...props) => this.onStringChange(...props)}
        onNumberChange={() => {}}
        onBooleanChange={() => {}}
        onSelectChange={(field, value) => this.onStringChange(field, value ? value.value : '')}
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
              type: 'select',
              name: 'reference',
              label: 'Reference',
              required: true,
              value: models
                .map(item => ({ value: item.id, label: item.title }))
                .find(item => item.value === model.reference),
              options: models.map(item => ({ value: item.id, label: item.title })),
              error: errors.reference,
            },
          ],
        ]}
      />
    )
  }
}
