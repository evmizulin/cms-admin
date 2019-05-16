import React, { Component } from 'react'
import { Switch as ASwitch } from 'src/lib/components/controls/Switch'
import { bool, func, string } from 'prop-types'
import { FormControlLabel, FormHelperText, FormControl } from 'material-ui/Form'

import { cn } from './Switch.style'

export class Switch extends Component {
  static propTypes = {
    checked: bool.isRequired,
    onChange: func.isRequired,
    label: string.isRequired,
    helperText: string,
    disabled: bool,
    dirtyAlign: bool,
  }

  static defaultProps = {
    helperText: ' ',
    disabled: false,
    dirtyAlign: false,
  }

  render() {
    const { checked, onChange, label, helperText, disabled, dirtyAlign } = this.props
    return (
      <FormControl fullWidth disabled={disabled}>
        <FormControlLabel
          classes={{
            label: cn.label,
            disabled: cn.disabled,
            root: dirtyAlign ? cn.dirtyAlign : '',
          }}
          control={<ASwitch disabled={disabled} checked={checked} onChange={onChange} />}
          label={label}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}
