import React, { Component } from 'react'
import { func, oneOf, bool } from 'prop-types'
import { ConfirmDialog as AConfirmDialog } from 'src/lib/components/ConfirmDialog'

export class ConfirmDialog extends Component {
  static propTypes = {
    mod: oneOf(['model', 'prop', 'item']),
    open: bool.isRequired,
    onConfirmItem: func.isRequired,
    onConfirmModel: func.isRequired,
    onConfirmProp: func.isRequired,
    onClose: func.isRequired,
    onExited: func.isRequired,
  }

  static defaultProps = {
    mod: null,
  }

  render() {
    const { mod, open, onConfirmItem, onConfirmModel, onConfirmProp, onClose, onExited } = this.props
    if (!mod) return null
    const MAP_TITLE = {
      model: 'Delete model?',
      prop: 'Delete property?',
      item: 'Delete item?',
    }
    const MAP_TEXT = {
      model: 'Are you sure you want to delete model? All entries related to this model will be lost.',
      prop:
        'Are you sure you want to delete property? All data of entries related to this property will be lost.',
      item: 'Are you sure you want to delete item? All data of entries related to this item will be lost.',
    }
    const MAP_ACTIONS = {
      model: onConfirmModel,
      prop: onConfirmProp,
      item: onConfirmItem,
    }
    return (
      <AConfirmDialog
        title={MAP_TITLE[mod]}
        text={MAP_TEXT[mod]}
        onDone={MAP_ACTIONS[mod]}
        open={open}
        onClose={onClose}
        onExited={onExited}
      />
    )
  }
}
