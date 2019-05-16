import React, { Component } from 'react'
import { string } from 'prop-types'
import { Divider } from 'material-ui'
import { cn } from './SubcardDivider.style'

export class SubcardDivider extends Component {
  static propTypes = {
    className: string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props
    return <Divider className={`${cn.divider} ${className}`} />
  }
}
