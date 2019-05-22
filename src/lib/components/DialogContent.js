import React, { Component } from 'react'
import { node } from 'prop-types'
import { DialogContent as ADialogContent } from 'material-ui/Dialog'

import { cn } from './DialogContent.style'

export class DialogContent extends Component {
  static propTypes = {
    children: node.isRequired,
  }

  render() {
    const { children } = this.props
    return <ADialogContent className={cn.dialogContent}>{children}</ADialogContent>
  }
}
