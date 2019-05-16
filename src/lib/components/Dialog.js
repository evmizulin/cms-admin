import React, { Component } from 'react'
import ADialog from 'material-ui/Dialog'
import { Divider } from 'material-ui'
import { DialogTitle } from 'material-ui/Dialog'
import { func, node, bool, number, string } from 'prop-types'
import { LinearProgress } from 'src/lib/components/LinearProgress'

import { cn } from './Dialog.style'

export class Dialog extends Component {
  static propTypes = {
    open: bool.isRequired,
    onClose: func.isRequired,
    onExited: func,
    onEnter: func,
    children: node.isRequired,
    progress: number,
    title: string.isRequired,
    maxWidth: string,
  }

  static defaultProps = {
    progress: null,
    onEnter: () => {},
    onExited: () => {},
    maxWidth: 'md',
  }

  render() {
    const { onEnter, open, onClose, children, onExited, progress, title, maxWidth } = this.props
    return (
      <ADialog
        // fullScreen={true}
        open={open}
        onRequestClose={onClose}
        maxWidth={maxWidth}
        fullWidth
        onExited={onExited}
        onEnter={onEnter}
        ignoreBackdropClick
        classes={{
          root: cn.dialog,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        {progress === null ? (
          <Divider />
        ) : (
          <div>
            <LinearProgress mode="determinate" value={progress} />
          </div>
        )}
        {children}
      </ADialog>
    )
  }
}
