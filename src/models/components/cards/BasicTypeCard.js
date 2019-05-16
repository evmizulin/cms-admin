import React, { Component } from 'react'
import { string, func, instanceOf, oneOfType, oneOf, bool } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { Card as ACard } from 'src/lib/components/Card'
import { Icon } from 'src/lib/components/Icon'
import { ModelType } from 'src/lib/types/models/ModelType'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { colors } from 'src/colors'

export class BasicTypeCard extends Component {
  static propTypes = {
    conflict: bool.isRequired,
    mod: oneOf(['model', 'prop']).isRequired,
    model: oneOfType([instanceOf(ModelType), instanceOf(SubmodelType)]).isRequired,
    onDelete: func.isRequired,
    onEdit: func.isRequired,
    name: string,
  }

  static defaultProps = {
    name: null,
  }

  render() {
    const { conflict, model, onDelete, onEdit, name, mod } = this.props
    const Component = mod === 'model' ? ACard : Subcard
    const MAP = {
      'string-line': 'models-view-string-line',
      'string-multiline': 'models-view-string-multiline',
      'string-markdown': 'models-view-string-markdown',
      'string-html': 'models-view-string-html',
      number: 'models-view-number',
      boolean: 'models-view-boolean',
      enum: 'models-view-enum',
      reference: 'models-view-reference',
      asset: 'models-view-asset',
    }
    return (
      <Component
        error={conflict ? 'Model has broken reference' : null}
        backgroundColor={colors.primary.main}
        icon={
          <Icon
            type={MAP[model.type]}
            color={mod === 'prop' ? null : colors.primary.main}
            size={mod === 'prop' ? 20 : 30}
          />
        }
        title={model.title}
        description={model.description}
        onEdit={onEdit}
        onDelete={onDelete}
        labels={[
          model.apiId ? `#${model.apiId}` : null,
          name ? `${name}${model.requiredProperty ? '*' : ''}` : null,
          model.type,
        ].filter(item => !!item)}
      />
    )
  }
}
