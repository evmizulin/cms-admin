import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { func, instanceOf, string, oneOfType, oneOf, bool } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { CardFactory } from 'src/models/components/cards/CardFactory'
import { Card } from 'src/lib/components/Card'
import { colors } from 'src/colors'
import { SubcardDivider } from 'src/lib/components/SubcardDivider'
import { Button } from 'src/lib/components/Button'
import { cn } from './ObjectCard.style'
import { ObjectSubmodelType } from 'src/lib/types/models/ObjectSubmodelType'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import clone from 'clone'
import { sortKeys } from 'src/lib/helpers/sortKeys'
import deepFreeze from 'deep-freeze'

export class ObjectCard extends Component {
  static propTypes = {
    conflict: bool.isRequired,
    mod: oneOf(['model', 'prop']).isRequired,
    model: oneOfType([instanceOf(ObjectSubmodelType), instanceOf(ObjectModelType)]).isRequired,
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

  normalizeProp(propName, prop) {
    const { model } = this.props
    const newProp = clone(prop)
    newProp.requiredProperty = model.required.some(item => item === propName)
    newProp.propertyName = propName
    deepFreeze(newProp)
    return newProp
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
            type="models-view-object"
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
        {sortKeys(model.properties).map((key, i, items) => (
          <div key={key}>
            <CardFactory
              mod="prop"
              model={this.normalizeProp(key, model.properties[key])}
              onDelete={() => onDeleteProp(['properties', key])}
              onDeleteProp={dist => onDeleteProp(['properties', key, ...dist])}
              onDeleteItem={dist => onDeleteItem(['properties', key, ...dist])}
              onAddProp={dist => onAddProp(['properties', key, ...dist])}
              onAddItem={dist => onAddItem(['properties', key, ...dist])}
              onEdit={() => onEditProp(['properties', key], this.normalizeProp(key, model.properties[key]))}
              onEditProp={(dist, property) => onEditProp(['properties', key, ...dist], property)}
              onEditItem={(dist, item) => onEditItem(['properties', key, ...dist], item)}
              name={key}
            />
            <SubcardDivider />
          </div>
        ))}
        <div className={`${cn.add}`}>
          <Button
            size={mod === 'prop' ? 'md' : 'lg'}
            color="primary"
            onClick={() => onAddProp(['properties'])}
          >
            Add property
          </Button>
        </div>
      </Component>
    )
  }
}
