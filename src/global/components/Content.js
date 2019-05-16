import React from 'react'
import { node } from 'prop-types'

import { cn } from './Content.style.js'

export class Content extends React.Component {
  static propTypes = {
    children: node.isRequired,
  }

  render() {
    const { children } = this.props
    return <div className={cn.content}>{children}</div>
  }
}
