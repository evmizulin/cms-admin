import React, { Component } from 'react'
import { func, bool, string } from 'prop-types'
import { Dialog } from 'src/lib/components/Dialog'
import { DialogActions } from 'src/lib/components/DialogActions'
import { DialogContent } from 'src/lib/components/DialogContent'
import { Typography } from 'src/lib/components/Typography'
import { Button } from 'src/lib/components/Button'

export class ConfirmDialog extends Component {
  static propTypes = {
    title: string.isRequired,
    text: string.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    onDone: func.isRequired,
    onExited: func,
  }

  static defaultProps = {
    onExited: () => {},
  }

  render() {
    const { title, text, onClose, onDone, onExited, open } = this.props
    return (
      <Dialog title={title} open={open} onClose={onClose} onExited={onExited}>
        <DialogContent>
          <Typography type="sm">{text}</Typography>
        </DialogContent>
        <DialogActions onClose={onClose}>
          <Button color="accent" onClick={onDone}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
