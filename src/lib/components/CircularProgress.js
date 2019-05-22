import React, { Component } from 'react'
import { number } from 'prop-types'
import { CircularProgress as ACircularProgress } from 'material-ui/Progress'

import { cn } from './CircularProgress.style'

export class CircularProgress extends Component {
  static propTypes = {
    size: number,
  }

  static defaultProps = {
    size: 100,
  }

  render() {
    const { size } = this.props
    return <ACircularProgress size={size} classes={{ root: cn.container }} />
  }
}
