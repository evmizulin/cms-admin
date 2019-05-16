import React, { Component } from 'react'
import { string, node, number } from 'prop-types'
import { Avatar } from 'material-ui'

export class CircledIcon extends Component {
  static propTypes = {
    children: node.isRequired,
    size: number,
    color: string,
    className: string,
  }

  static defaultProps = {
    size: 50,
    color: '#fff',
    className: '',
  }

  render() {
    const { children, size, color, className } = this.props
    return (
      <Avatar className={className} style={{ width: `${size}px`, height: `${size}px`, background: color }}>
        {children}
      </Avatar>
    )
  }
}
