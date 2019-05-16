import React, { Component } from 'react'
import { func, instanceOf, string, oneOf, oneOfType, bool } from 'prop-types'
import { ObjectCard } from 'src/models/components/cards/ObjectCard'
import { ModelType } from 'src/lib/types/models/ModelType'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { BasicTypeCard } from 'src/models/components/cards/BasicTypeCard'
import { ArrayCard } from 'src/models/components/cards/ArrayCard'

export class CardFactory extends Component {
  static propTypes = {
    conflict: bool,
    mod: oneOf(['model', 'prop']),
    model: oneOfType([instanceOf(ModelType), instanceOf(SubmodelType)]).isRequired,
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
    conflict: false,
    name: null,
    mod: 'model',
  }

  render() {
    const {
      conflict,
      model,
      onDeleteProp,
      onDelete,
      onAddProp,
      onEdit,
      onEditProp,
      name,
      mod,
      onDeleteItem,
      onAddItem,
      onEditItem,
    } = this.props
    const MAP = {
      'string-line': BasicTypeCard,
      'string-multiline': BasicTypeCard,
      'string-markdown': BasicTypeCard,
      'string-html': BasicTypeCard,
      number: BasicTypeCard,
      boolean: BasicTypeCard,
      object: ObjectCard,
      array: ArrayCard,
      enum: BasicTypeCard,
      reference: BasicTypeCard,
      asset: BasicTypeCard,
    }
    const Component = MAP[model.type] || (() => <div>unknown type</div>)
    return (
      <Component
        conflict={conflict}
        mod={mod}
        model={model}
        onDelete={onDelete}
        onDeleteProp={onDeleteProp}
        onDeleteItem={onDeleteItem}
        onAddProp={onAddProp}
        onAddItem={onAddItem}
        onEdit={onEdit}
        onEditProp={onEditProp}
        onEditItem={onEditItem}
        name={name}
      />
    )
  }
}
