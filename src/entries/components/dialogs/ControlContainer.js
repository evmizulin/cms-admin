import React, { Component } from 'react'
import { string, node, arrayOf, bool, oneOf, func } from 'prop-types'
import { Typography } from 'src/lib/components/Typography'
import { CircledIcon } from 'src/lib/components/CircledIcon'
import { colors } from 'src/colors'
import { Icon } from 'src/lib/components/Icon'
import { Button } from 'src/lib/components/Button'

import { cn } from './ControlContainer.style'

export class ControlContainer extends Component {
  static propTypes = {
    type: string.isRequired,
    title: string.isRequired,
    description: string,
    error: string,
    labels: arrayOf(string).isRequired,
    children: node.isRequired,
    noBodyPedding: bool.isRequired,
    disabled: bool,
    propBtnStatus: oneOf(['active', 'inactive', 'disabled', 'hidden']),
    onPropBtnStatusChange: func,
    onItemDelete: func,
    onItemUp: func,
    onItemDown: func,
  }

  static defaultProps = {
    description: '',
    error: '',
    disabled: false,
    propBtnStatus: 'hidden',
    onPropBtnStatusChange: null,
    onItemDelete: null,
    onItemUp: null,
    onItemDown: null,
  }

  render() {
    const {
      children,
      title,
      type,
      description,
      labels,
      error,
      disabled,
      propBtnStatus,
      onPropBtnStatusChange,
      noBodyPedding,
      onItemDelete,
      onItemUp,
      onItemDown,
    } = this.props
    const MAP = {
      'string-line': 'entries-view-string-line',
      'string-html': 'entries-view-string-html',
      'string-markdown': 'entries-view-string-markdown',
      'string-multiline': 'entries-view-string-multiline',
      number: 'entries-view-number',
      boolean: 'entries-view-boolean',
      object: 'entries-view-object',
      array: 'entries-view-array',
      enum: 'entries-view-enum',
      reference: 'entries-view-reference',
      asset: 'entries-view-asset',
    }
    return (
      <div className={`${cn.container} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <div className={`${cn.head}`}>
          <div className={`${cn.left}`}>
            <CircledIcon color={disabled ? colors.black.t4 : colors.secondary.main} size={40}>
              <Icon type={MAP[type]} size={20} />
            </CircledIcon>
          </div>
          <div className={cn.right}>
            <Typography type="md" disabled={disabled}>
              {title}
            </Typography>
            {!description ? null : (
              <Typography type="xs" className={`pt-xs`} disabled={disabled}>
                {description}
              </Typography>
            )}
            <div className="pt-xs">
              {labels.map((label, key) => (
                <Typography key={key} type="label" inline className={`mr-xs`} disabled={disabled}>
                  {label}
                </Typography>
              ))}
              <div className={cn.buttons}>
                {!onPropBtnStatusChange || propBtnStatus === 'hidden' ? null : (
                  <Button
                    color="secondary"
                    size="sm"
                    filled={propBtnStatus === 'active'}
                    outlined
                    disabled={propBtnStatus === 'disabled'}
                    onClick={() => onPropBtnStatusChange(propBtnStatus !== 'active')}
                  >
                    Active
                  </Button>
                )}
                {!onItemDelete ? null : (
                  <span className="mr-xs">
                    <Button
                      color="accent"
                      size="sm"
                      outlined={true}
                      onClick={onItemDelete}
                      disabled={disabled}
                    >
                      Delete
                    </Button>
                  </span>
                )}
                {!onItemUp ? null : (
                  <span className="mr-xs">
                    <Button
                      color="secondary"
                      size="sm"
                      outlined={true}
                      onClick={onItemUp}
                      disabled={disabled}
                    >
                      To up
                    </Button>
                  </span>
                )}
                {!onItemDown ? null : (
                  <Button
                    color="secondary"
                    size="sm"
                    outlined={true}
                    onClick={onItemDown}
                    disabled={disabled}
                  >
                    To down
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {!children ? null : (
          <div className={`${cn.body} ${noBodyPedding ? 'noBodyPedding' : ''}`}>
            <div>{children}</div>
            <Typography type="xs" className={`pt-xs ${cn.errorMsg}`}>
              {!error || disabled ? <span>&nbsp;</span> : error}
            </Typography>
          </div>
        )}
      </div>
    )
  }
}
