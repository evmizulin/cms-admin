import React, { Component } from 'react'
import { node, string } from 'prop-types'

import { cn } from './PageContainer.style'

export class PageContainer extends Component {
  static propTypes = {
    children: node.isRequired,
    dataTestAtr: string,
  }

  static defaultProps = {
    dataTestAtr: null,
  }

  render() {
    const { children, dataTestAtr } = this.props
    return (
      <div className={cn.container} data-test={dataTestAtr}>
        {children}
      </div>
    )
  }
}
