import React, { Component } from 'react'
import { string, bool, shape, oneOfType, number } from 'prop-types'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import { Select as ASelect } from 'src/lib/components/controls/Select'

import { cn } from './TextField.style'

export class Select extends Component {
  static propTypes = {
    label: string.isRequired,
    required: bool,
    error: bool.isRequired,
    helperText: string.isRequired,
    disabled: bool,
    value: shape({
      label: string.isRequired,
      value: oneOfType([number, string, bool]).isRequired,
    }),
  }

  state = {
    open: false,
  }

  onMenuOpen() {
    this.setState({ open: true })
  }

  onMenuClose() {
    this.setState({ open: false })
  }

  static defaultProps = {
    required: false,
    disabled: false,
    value: null,
  }

  render() {
    const { disabled, label, error, helperText, required, value, ...props } = this.props
    const { open } = this.state
    return (
      <FormControl fullWidth error={disabled ? false : error} disabled={disabled}>
        <InputLabel
          shrink={!!value || open}
          required={required}
          FormControlClasses={{ focused: cn.label, error: cn.labelError }}
        >
          {label}
        </InputLabel>
        <ASelect
          {...props}
          disabled={disabled}
          isField
          isError={error}
          value={value}
          onMenuOpen={() => this.onMenuOpen()}
          onMenuClose={() => this.onMenuClose()}
        />
        <FormHelperText classes={{ error: cn.textError }}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}
