import React, { Component } from 'react'
import { Grid, Typography } from 'material-ui'
import { func, string, node } from 'prop-types'
import { CircledIcon } from 'src/lib/components/CircledIcon'
import { colors } from 'src/colors'

import { cn } from './TypeBlock.style'

export class TypeBlock extends Component {
  static propTypes = {
    onClick: func.isRequired,
    icon: node.isRequired,
    title: string.isRequired,
    description: string.isRequired,
  }

  render() {
    const { onClick, icon, title, description } = this.props
    return (
      <Grid container alignItems="center" spacing={8} className={cn.typeBlock} onClick={() => onClick()}>
        <Grid item xs={6} className="avatar">
          <CircledIcon color={colors.primary.main} size={100}>
            {icon}
          </CircledIcon>
        </Grid>
        <Grid item xs={6}>
          <Typography type="title">{title}</Typography>
          <Typography type="subheading">{description}</Typography>
        </Grid>
      </Grid>
    )
  }
}
