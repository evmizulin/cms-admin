import React, { Component } from 'react'
import { func, string, bool, oneOf } from 'prop-types'
import Input from 'material-ui/Input'

import { cn } from './TextInput.style'

export class TextInput extends Component {
  static propTypes = {
    onChange: func.isRequired,
    onBlur: func.isRequired,
    value: string.isRequired,
    type: oneOf(['text', 'password']),
    placeholder: string,
    multiline: bool,
    disabled: bool,
  }

  static defaultProps = {
    type: 'text',
    placeholder: '',
    multiline: false,
    disabled: false,
  }

  render() {
    const { type, disabled, value, onChange, onBlur, placeholder, multiline } = this.props
    return (
      <Input
        type={type}
        fullWidth
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? 5 : undefined}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        onBlur={onBlur}
        value={disabled ? '' : value}
        classes={{ inkbar: cn.inkbar, error: cn.inkbarError }}
      />
    )
  }
}
