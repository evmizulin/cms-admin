import React, { Component } from 'react'
import { node, number } from 'prop-types'

import { cn } from './MessageBlock.style'

export class MessageBlock extends Component {
  static propTypes = {
    children: node.isRequired,
    minWidth: number,
    maxWidth: number,
  }

  static defaultProps = {
    minWidth: 300,
    maxWidth: 300,
  }

  render() {
    const { children, minWidth, maxWidth } = this.props
    return (
      <div className={cn.card} style={{ minWidth, maxWidth }}>
        {children}
      </div>
    )
  }
}
