import React, { Component } from 'react'
import { func, string, bool, oneOf } from 'prop-types'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import { TextInput } from 'src/lib/components/controls/TextInput'

import { cn } from './TextField.style'

export class TextField extends Component {
  static propTypes = {
    label: string.isRequired,
    required: bool,
    shrink: bool,
    onChange: func.isRequired,
    onBlur: func.isRequired,
    value: string.isRequired,
    error: bool.isRequired,
    helperText: string.isRequired,
    placeholder: string,
    multiline: bool,
    disabled: bool,
    type: oneOf(['text', 'password']),
  }

  static defaultProps = {
    required: false,
    shrink: undefined,
    placeholder: '',
    multiline: false,
    disabled: false,
    type: 'text',
  }

  render() {
    const {
      disabled,
      label,
      value,
      error,
      onChange,
      onBlur,
      helperText,
      required,
      shrink,
      placeholder,
      multiline,
      type,
    } = this.props
    return (
      <FormControl fullWidth error={disabled ? false : error} disabled={disabled}>
        <InputLabel
          shrink={shrink}
          required={required}
          FormControlClasses={{ focused: cn.label, error: cn.labelError }}
        >
          {label}
        </InputLabel>
        <TextInput
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          multiline={multiline}
          disabled={disabled}
        />
        <FormHelperText classes={{ error: cn.textError }}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}
