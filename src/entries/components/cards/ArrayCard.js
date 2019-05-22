import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { func, bool, instanceOf, arrayOf } from 'prop-types'
import { Card } from 'src/lib/components/Card'
import { colors } from 'src/colors'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'
import { ArrayEntryType } from 'src/lib/types/entries/ArrayEntryType'
import { SubcardDivider } from 'src/lib/components/SubcardDivider'
import { cn } from './ArrayCard.style'
import { SubcardFactory } from 'src/entries/components/cards/SubcardFactory'
import { EntryType } from 'src/lib/types/entries/EntryType'

export class ArrayCard extends Component {
  static propTypes = {
    model: instanceOf(ArrayModelType).isRequired,
    entry: instanceOf(ArrayEntryType).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    conflict: bool.isRequired,
    onEdit: func.isRequired,
    onDelete: func.isRequired,
  }

  render() {
    const { model, entry, onEdit, onDelete, conflict, entries } = this.props
    return (
      <Card
        title={model.title}
        description={model.description}
        backgroundColor={colors.secondary.main}
        icon={<Icon type="entries-view-array" color={colors.secondary.main} size={30} />}
        labels={[entry.identificator ? `#${entry.identificator}` : null, model.type].filter(item => !!item)}
        error={conflict ? 'Entry does not satisfy the model. Update entry to make it valid.' : ''}
        onEdit={onEdit}
        onDelete={onDelete}
      >
        {conflict ? (
          <div className={`text-italic ${cn.error}`}>Unvalid array</div>
        ) : (
          <div>
            {entry.value.value.length ? null : <div className="text-italic">Empty array</div>}
            {entry.value.value.map((item, index) => (
              <div className={cn.dividerContainer} key={index}>
                <SubcardFactory model={model.items} value={item} entries={entries} />
                <SubcardDivider className={cn.divider} />
              </div>
            ))}
          </div>
        )}
      </Card>
    )
  }
}
