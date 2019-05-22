import React, { Component } from 'react'
import ASwitch from 'material-ui/Switch'
import { bool, func } from 'prop-types'

import { cn } from './Switch.style'

export class Switch extends Component {
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
      <ASwitch
        disabled={disabled}
        checked={checked}
        onChange={() => onChange(!checked)}
        value=""
        classes={{
          checked: cn.checked,
          disabled: cn.disabled,
          bar: cn.bar,
        }}
      />
    )
  }
}
