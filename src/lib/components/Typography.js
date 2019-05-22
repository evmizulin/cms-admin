import React, { Component } from 'react'
import { string, node, bool } from 'prop-types'

import { cn } from './Typography.style'

export class Typography extends Component {
  static propTypes = {
    className: string,
    type: string.isRequired,
    children: node.isRequired,
    inline: bool,
    disabled: bool,
  }

  static defaultProps = {
    className: '',
    inline: false,
    disabled: false,
  }

  render() {
    const { type, children, className, inline, disabled } = this.props
    const MAP = {
      bigTransperent: cn.bigTransperent,
      light: cn.light,
      lg: cn.lg,
      md: cn.md,
      sm: cn.sm,
      xs: cn.xs,
      label: cn.label,
    }
    return (
      <div
        className={`${MAP[type]} ${className} ${disabled ? cn.disabled : ''}`}
        style={{ display: inline ? 'inline-block' : 'block' }}
      >
        {children}
      </div>
    )
  }
}
