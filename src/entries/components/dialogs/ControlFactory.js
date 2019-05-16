import React, { Component } from 'react'
import { instanceOf, oneOfType } from 'prop-types'
import { ModelType } from 'src/lib/types/models/ModelType'
import { StringLineControl } from 'src/entries/components/dialogs/controls/StringLineControl'
import { BooleanControl } from 'src/entries/components/dialogs/controls/BooleanControl'
import { NumberControl } from 'src/entries/components/dialogs/controls/NumberControl'
import { StringMultilineControl } from 'src/entries/components/dialogs/controls/StringMultilineControl'
import { HtmlControl } from 'src/entries/components/dialogs/controls/HtmlControl'
import { MarkdownControl } from 'src/entries/components/dialogs/controls/MarkdownControl'
import { ObjectControl } from 'src/entries/components/dialogs/controls/ObjectControl'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { ArrayControl } from 'src/entries/components/dialogs/controls/ArrayControl'
import { EnumControl } from 'src/entries/components/dialogs/controls/EnumControl'
import { ReferenceControl } from 'src/entries/components/dialogs/controls/ReferenceControl'
import { AssetControl } from 'src/entries/components/dialogs/controls/AssetControl'

export class ControlFactory extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(ModelType), instanceOf(SubmodelType)]).isRequired,
  }

  render() {
    const { model, ...props } = this.props
    const MAP = {
      'string-line': StringLineControl,
      'string-multiline': StringMultilineControl,
      'string-html': HtmlControl,
      'string-markdown': MarkdownControl,
      boolean: BooleanControl,
      number: NumberControl,
      object: ObjectControl,
      array: ArrayControl,
      enum: EnumControl,
      reference: ReferenceControl,
      asset: AssetControl,
    }
    const Component = MAP[model.type]
    return <Component model={model} {...props} />
  }
}
