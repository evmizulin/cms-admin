import React, { Component } from 'react'
import { bool } from 'prop-types'
import { LinearProgress as ALinearProgress } from 'material-ui/Progress'
import { cn } from './LinearProgress.style'

export class LinearProgress extends Component {
  static propTypes = {
    noHeight: bool,
    light: bool,
  }

  static defaultProps = {
    noHeight: false,
    light: false,
  }

  render() {
    const { noHeight, light, ...props } = this.props
    return (
      <ALinearProgress
        className={`${noHeight ? cn.progressNoHeight : ''}`}
        {...props}
        classes={{
          primaryColor: cn.progressBg,
          primaryColorBar: light ? cn.progressColorLight : cn.progressColor,
        }}
      />
    )
  }
}
