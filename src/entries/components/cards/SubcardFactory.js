import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { ObjectSubcard } from 'src/entries/components/cards/ObjectSubcard'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { BasicTypeSubcard } from 'src/entries/components/cards/BasicTypeSubcard'
import { ArraySubcard } from 'src/entries/components/cards/ArraySubcard'

export class SubcardFactory extends Component {
  static propTypes = {
    model: instanceOf(SubmodelType).isRequired,
  }

  render() {
    const { model, ...props } = this.props
    const MAP = {
      'string-line': BasicTypeSubcard,
      'string-multiline': BasicTypeSubcard,
      'string-markdown': BasicTypeSubcard,
      'string-html': BasicTypeSubcard,
      number: BasicTypeSubcard,
      boolean: BasicTypeSubcard,
      object: ObjectSubcard,
      array: ArraySubcard,
      enum: BasicTypeSubcard,
      reference: BasicTypeSubcard,
      asset: BasicTypeSubcard,
    }
    const Component = MAP[model.type] || (() => <div>unknown subtype</div>)
    return <Component model={model} {...props} />
  }
}
