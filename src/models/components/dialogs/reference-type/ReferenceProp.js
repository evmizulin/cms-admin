import React, { Component } from 'react'
import { func, instanceOf, arrayOf } from 'prop-types'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { onBooleanChange } from 'src/models/helpers/onBooleanChange'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'
import { ModelType } from 'src/lib/types/models/ModelType'
import { ReferenceSubmodelType } from 'src/lib/types/models/ReferenceSubmodelType'

import { cn } from './ReferenceProp.style'

export class ReferenceProp extends Component {
  static propTypes = {
    models: arrayOf(instanceOf(ModelType)).isRequired,
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(ReferenceSubmodelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'reference',
        requiredProperty: false,
      },
      errors: {
        propertyName: '',
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

  onBooleanChange(...props) {
    onBooleanChange.call(this, ...props)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: ReferenceSubmodelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, {
      Type: ReferenceSubmodelType,
      fields: ['title', 'description', 'reference', 'propertyName'],
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
        onBooleanChange={(...props) => this.onBooleanChange(...props)}
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
