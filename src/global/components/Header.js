import React, { Component } from 'react'
import { node } from 'prop-types'
import { cn } from './Header.style'

export class Header extends Component {
  static propTypes = {
    children: node.isRequired,
  }

  render() {
    const { children } = this.props
    return <div className={cn.header}>{children}</div>
  }
}
