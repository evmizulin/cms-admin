import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { func, instanceOf, string, oneOfType, oneOf, bool } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { CardFactory } from 'src/models/components/cards/CardFactory'
import { Card } from 'src/lib/components/Card'
import { colors } from 'src/colors'
import { Button } from 'src/lib/components/Button'
import { cn } from './ObjectCard.style'
import { ArraySubmodelType } from 'src/lib/types/models/ArraySubmodelType'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'

export class ArrayCard extends Component {
  static propTypes = {
    conflict: bool.isRequired,
    mod: oneOf(['model', 'prop']).isRequired,
    model: oneOfType([instanceOf(ArrayModelType), instanceOf(ArraySubmodelType)]).isRequired,
    onDelete: func.isRequired,
    onDeleteProp: func.isRequired,
    onDeleteItem: func.isRequired,
    onAddProp: func.isRequired,
    onAddItem: func.isRequired,
    onEdit: func.isRequired,
    onEditProp: func.isRequired,
    onEditItem: func.isRequired,
    name: string,
  }

  static defaultProps = {
    name: null,
  }

  render() {
    const {
      conflict,
      model,
      onDelete,
      name,
      onEdit,
      onDeleteProp,
      onAddProp,
      onEditProp,
      mod,
      onDeleteItem,
      onEditItem,
      onAddItem,
    } = this.props
    const Component = mod === 'model' ? Card : Subcard
    return (
      <Component
        error={conflict ? 'Model has broken reference' : null}
        backgroundColor={colors.primary.main}
        icon={
          <Icon
            type="models-view-array"
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
      >
        {!model.items ? null : (
          <CardFactory
            mod="prop"
            model={model.items}
            onDelete={() => onDeleteItem(['items'])}
            onDeleteProp={dist => onDeleteProp(['items', ...dist])}
            onDeleteItem={dist => onDeleteItem(['items', ...dist])}
            onAddProp={dist => onAddProp(['items', ...dist])}
            onAddItem={dist => onAddItem(['items', ...dist])}
            onEdit={() => onEditItem(['items'], model.items)}
            onEditProp={(dist, property) => onEditProp(['items', ...dist], property)}
            onEditItem={(dist, item) => onEditItem(['items', ...dist], item)}
          />
        )}
        {model.items ? null : (
          <div className={`${cn.add}`}>
            <Button size={mod === 'prop' ? 'md' : 'lg'} color="primary" onClick={() => onAddItem(['items'])}>
              Add item
            </Button>
          </div>
        )}
      </Component>
    )
  }
}
