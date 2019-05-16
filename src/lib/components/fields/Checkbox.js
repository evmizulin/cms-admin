import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import { FormControlLabel } from 'material-ui/Form'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { Checkbox as ACheckbox } from 'src/lib/components/controls/Checkbox'

import { cn } from './Checkbox.style'

export class Checkbox extends Component {
  static propTypes = {
    checked: bool.isRequired,
    onChange: func.isRequired,
    label: string.isRequired,
    disabled: bool,
    helperText: string,
    dirtyAlign: bool,
  }

  static defaultProps = {
    disabled: false,
    dirtyAlign: false,
    helperText: '',
  }

  render() {
    const { checked, onChange, label, disabled, helperText, dirtyAlign } = this.props
    return (
      <FormControl fullWidth>
        <FormControlLabel
          classes={{
            label: cn.label,
            disabled: cn.disabled,
            root: dirtyAlign ? cn.dirtyAlign : '',
          }}
          control={<ACheckbox checked={checked} disabled={disabled} onChange={onChange} />}
          label={label}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}
