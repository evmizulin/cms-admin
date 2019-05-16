import React, { Component } from 'react'
import { func, bool, string, instanceOf, arrayOf } from 'prop-types'
import { ModelType } from 'src/lib/types/models/ModelType'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { Dialog } from 'src/lib/components/Dialog'
import { EntryDialogInner } from 'src/entries/components/dialogs/EntryDialogInner'

export class EntryDialog extends Component {
  static propTypes = {
    open: bool.isRequired,
    onDone: func.isRequired,
    onClose: func.isRequired,
    model: instanceOf(ModelType),
    entry: instanceOf(EntryType),
    title: string.isRequired,
    onExited: func.isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
  }

  static defaultProps = {
    model: null,
    entry: null,
  }

  render() {
    const { open, onClose, onDone, model, entry, title, onExited, entries } = this.props
    if (!model) return null
    return (
      <Dialog open={open} onClose={onClose} title={title} onExited={onExited} maxWidth="lg">
        <EntryDialogInner onDone={onDone} onClose={onClose} model={model} entry={entry} entries={entries} />
      </Dialog>
    )
  }
}
