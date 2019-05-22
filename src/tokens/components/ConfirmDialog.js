import React, { Component } from 'react'
import { bool } from 'prop-types'
import { ConfirmDialog as AConfirmDialog } from 'src/lib/components/ConfirmDialog'

export class ConfirmDialog extends Component {
  static propTypes = {
    mount: bool.isRequired,
  }

  render() {
    const { mount, ...props } = this.props
    return !mount ? null : <AConfirmDialog {...props} />
  }
}
