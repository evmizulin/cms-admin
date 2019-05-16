import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { ObjectCard } from 'src/entries/components/cards/ObjectCard'
import { ModelType } from 'src/lib/types/models/ModelType'
import { BasicTypeCard } from 'src/entries/components/cards/BasicTypeCard'
import { ArrayCard } from 'src/entries/components/cards/ArrayCard'

export class CardFactory extends Component {
  static propTypes = {
    model: instanceOf(ModelType).isRequired,
  }

  render() {
    const { model, ...props } = this.props
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
    return <Component model={model} {...props} />
  }
}
