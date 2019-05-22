import React, { Component } from 'react'
import { node } from 'prop-types'

import { cn } from './PageContainer.style'

export class PageContainer extends Component {
  static propTypes = {
    children: node.isRequired,
  }

  render() {
    const { children } = this.props
    return <div className={cn.container}>{children}</div>
  }
}
