import React, { Component } from 'react'
import { func, string, arrayOf, bool, shape, oneOfType, number } from 'prop-types'
import SelectInner from 'src/lib/components/controls/SelectInner'

export class Select extends Component {
  static propTypes = {
    options: arrayOf(
      shape({
        label: string.isRequired,
        value: oneOfType([number, string, bool]).isRequired,
      })
    ).isRequired,
    onChange: func.isRequired,
    onMenuOpen: func,
    onMenuClose: func,
    onBlur: func.isRequired,
    value: shape({
      label: string.isRequired,
      value: oneOfType([number, string, bool]).isRequired,
    }),
    placeholder: string,
    isField: bool,
    disabled: bool,
    isError: bool,
  }

  static defaultProps = {
    value: null,
    placeholder: '',
    isField: false,
    disabled: false,
    isError: false,
    onMenuOpen: () => {},
    onMenuClose: () => {},
  }

  render() {
    const { ...props } = this.props
    return <SelectInner {...props} />
  }
}
