import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import ACheckbox from 'material-ui/Checkbox'

import { cn } from './Checkbox.style'

export class Checkbox extends Component {
  static propTypes = {
    checked: bool.isRequired,
    onChange: func.isRequired,
    disabled: bool,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const { checked, onChange, disabled } = this.props
    return (
      <ACheckbox
        disabled={disabled}
        checked={checked}
        onChange={() => onChange(!checked)}
        value=""
        classes={{ checked: cn.checked }}
      />
    )
  }
}
