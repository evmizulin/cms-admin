import React, { Component } from 'react'
import { string, func, node, arrayOf, bool } from 'prop-types'
import { CircledIcon } from 'src/lib/components/CircledIcon'
import { Divider } from 'material-ui'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { colors } from 'src/colors'
import { Icon } from 'src/lib/components/Icon'
import { Tooltip } from 'material-ui'

import { cn } from './Card.style'

export class Card extends Component {
  static propTypes = {
    backgroundColor: string.isRequired,
    icon: node.isRequired,
    title: string,
    description: string,
    onEdit: func.isRequired,
    onDelete: func.isRequired,
    error: string,
    labels: arrayOf(string),
    children: node,
    noDivider: bool,
  }

  static defaultProps = {
    title: '',
    description: '',
    error: '',
    labels: [],
    children: null,
    noDivider: false,
  }

  render() {
    const {
      children,
      icon,
      title,
      description,
      onEdit,
      onDelete,
      labels,
      error,
      backgroundColor,
      noDivider,
    } = this.props
    return (
      <div className={cn.container}>
        <div className={cn.left} style={{ background: backgroundColor }}>
          <CircledIcon>{icon}</CircledIcon>
        </div>
        <div className={cn.right}>
          <div className={cn.head}>
            <div>
              {!title ? null : (
                <div>
                  <Typography type="md">{title}</Typography>
                </div>
              )}
              {!description ? null : (
                <div className={`pt-xs`}>
                  <Typography type="xs">{description}</Typography>
                </div>
              )}
              <div className={`pt-xs`}>
                {!error ? null : (
                  <Tooltip title={error} placement="top">
                    <div className={`${cn.exclamationIcon} pr-xs`}>
                      <CircledIcon color={colors.error.main} size={24}>
                        <Icon type="menu-item-content-exclamation" color="#fff" size={15} />
                      </CircledIcon>
                    </div>
                  </Tooltip>
                )}
                {labels.map((label, key) => (
                  <Typography key={key} type="label" inline className="mr-xs">
                    {label}
                  </Typography>
                ))}
                <div className={cn.cardButtons}>
                  <span className="mr-xs">
                    <Button size="sm" color="primary" onClick={onEdit}>
                      Edit
                    </Button>
                  </span>
                  <Button size="sm" color="accent" onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {!children ? null : (
            <div>
              {noDivider ? null : <Divider />}
              <div className={cn.body}>{children}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
