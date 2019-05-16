import React, { Component } from 'react'
import { func, bool, string, object } from 'prop-types'
import { Dialog } from 'src/lib/components/Dialog'
import { TokenDialogInner } from 'src/tokens/components/TokenDialogInner'

export class TokenDialog extends Component {
  static propTypes = {
    token: object,
    title: string.isRequired,
    mount: bool.isRequired,
    open: bool.isRequired,
    onDone: func.isRequired,
    onClose: func.isRequired,
    onExited: func.isRequired,
  }

  static defaultProps = {
    token: null,
  }

  render() {
    const { mount, token, open, onClose, onDone, title, onExited } = this.props
    if (!mount) return null
    return (
      <Dialog open={open} onClose={onClose} title={title} onExited={onExited} maxWidth="md">
        <TokenDialogInner token={token} onDone={onDone} onClose={onClose} />
      </Dialog>
    )
  }
}
