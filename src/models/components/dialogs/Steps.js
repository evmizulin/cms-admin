import React, { Component } from 'react'
import { number, array, arrayOf } from 'prop-types'
import { Step } from 'src/models/components/dialogs/Step'

export class Steps extends Component {
  static propTypes = {
    step: number.isRequired,
    steps: arrayOf(array).isRequired,
  }

  render() {
    const { step, steps, ...props } = this.props
    return <Step fields={steps[step - 1]} {...props} />
  }
}
