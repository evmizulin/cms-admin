import React, { Component } from 'react'
import { string } from 'prop-types'

export class EntryStringValue extends Component {
  static propTypes = {
    value: string,
  }

  static defaultProps = {
    value: '',
  }

  render() {
    const { value } = this.props
    return !value ? (
      <div className="text-italic">Empty string</div>
    ) : (
      <div>{`${value.slice(0, 350)}${value.length > 350 ? '...' : ''}`}</div>
    )
  }
}
