import React, { Component } from 'react'
import { Grid } from 'material-ui'
import { func, node } from 'prop-types'
import { Button } from 'src/lib/components/Button'
import { DialogActions as ADialogActions } from 'material-ui/Dialog'

import { cn } from './DialogActions.style'

export class DialogActions extends Component {
  static propTypes = {
    onClose: func.isRequired,
    children: node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { onClose, children } = this.props
    return (
      <div className={cn.dialogActions}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <ADialogActions className={cn.actionsLeft}>
              <Button onClick={onClose} color="secondary">
                Close
              </Button>
            </ADialogActions>
          </Grid>
          <Grid item xs={8}>
            <ADialogActions>{children}</ADialogActions>
          </Grid>
        </Grid>
      </div>
    )
  }
}
