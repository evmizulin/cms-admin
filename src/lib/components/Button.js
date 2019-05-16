import React, { Component } from 'react'
import { node, bool, oneOf, func } from 'prop-types'
import { Button as AButton } from 'material-ui'

import { cn } from './Button.style'

export class Button extends Component {
  static propTypes = {
    onClick: func.isRequired,
    children: node.isRequired,
    color: oneOf(['primary', 'secondary', 'accent']),
    size: oneOf(['lg', 'md', 'sm', 'xs']),
    filled: bool,
    outlined: bool,
    disabled: bool,
  }

  static defaultProps = {
    color: 'primary',
    size: 'lg',
    filled: false,
    outlined: false,
    disabled: false,
  }

  render() {
    const { onClick, children, size, color, filled, outlined, disabled } = this.props
    const MAP_COLORS = {
      primary: cn.primary,
      secondary: cn.secondary,
      accent: cn.accent,
    }
    const MAP_SIZE = {
      lg: cn.lg,
      md: cn.md,
      sm: cn.sm,
      xs: cn.xs,
    }
    const colorClasses = disabled ? cn.disabled : `${MAP_COLORS[color]} ${filled ? 'filled' : ''}`
    const sizeClasses = MAP_SIZE[size]
    const outlineClasses = outlined ? 'outlined' : ''
    return (
      <AButton
        onClick={onClick}
        className={`${colorClasses} ${sizeClasses} ${outlineClasses}`}
        disabled={disabled}
        raised={filled}
        dense={size === 'md' || size === 'sm'}
      >
        {children}
      </AButton>
    )
  }
}
