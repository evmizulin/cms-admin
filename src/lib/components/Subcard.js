import React, { Component } from 'react'
import { string, func, node, arrayOf, bool } from 'prop-types'
import { CircledIcon } from 'src/lib/components/CircledIcon'
import { Divider } from 'material-ui'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { colors } from 'src/colors'
import { Icon } from 'src/lib/components/Icon'
import { Tooltip } from 'material-ui'

import { cn, cnHoverTrick } from './Subcard.style'

export class Subcard extends Component {
  static propTypes = {
    backgroundColor: string.isRequired,
    icon: node.isRequired,
    title: string,
    description: string,
    onEdit: func,
    onDelete: func,
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
    onEdit: null,
    onDelete: null,
    noDivider: false,
  }

  cnHoverTrick = cnHoverTrick()

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
    const { cnHoverTrick } = this
    return (
      <div className={cn.container}>
        <div className={cn.left} style={{ borderLeftColor: backgroundColor }}>
          <CircledIcon color={backgroundColor} size={40}>
            {icon}
          </CircledIcon>
        </div>
        <div className={cn.right}>
          <div className={`${cn.head} ${cnHoverTrick.hoverContainer}`}>
            <div>
              {!title ? null : (
                <div>
                  <Typography type="sm">{title}</Typography>
                </div>
              )}
              {!description ? null : (
                <div className={`pt-xs`}>
                  <Typography type="xs">{description}</Typography>
                </div>
              )}
              <div className={`pt-xxs`}>
                {!error ? null : (
                  <Tooltip title={error} placement="top">
                    <div className={`${cn.exclamationIcon} pr-xs`}>
                      <CircledIcon color={colors.error.main} size={20}>
                        <Icon type="menu-item-content-exclamation" color="#fff" size={11} />
                      </CircledIcon>
                    </div>
                  </Tooltip>
                )}
                {labels.map((label, key) => (
                  <Typography key={key} type="label" inline className={`mr-xs ${cn.label}`}>
                    {label}
                  </Typography>
                ))}
                <div className={cnHoverTrick.cardButtons}>
                  {!onEdit ? null : (
                    <span className="mr-xs">
                      <Button size="xs" color="primary" onClick={onEdit}>
                        Edit
                      </Button>
                    </span>
                  )}
                  {!onDelete ? null : (
                    <Button size="xs" color="accent" onClick={onDelete}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!children ? null : (
            <div>
              {noDivider ? null : <Divider className="mt-sm" />}
              <div className={cn.body}>{children}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
