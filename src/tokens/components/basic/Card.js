import React, { Component } from 'react'
import { string, func, arrayOf } from 'prop-types'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'

import { cn } from './Card.style'

export class Card extends Component {
  static propTypes = {
    title: string.isRequired,
    onEdit: func.isRequired,
    onDelete: func.isRequired,
    labels: arrayOf(string).isRequired,
  }

  render() {
    const { title, onEdit, onDelete, labels } = this.props
    return (
      <div className={`${cn.container} p-sm`}>
        <div>
          <Typography type="md">{title}</Typography>
        </div>
        <div className={`pt-xs`}>
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
    )
  }
}
