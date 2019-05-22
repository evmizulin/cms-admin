import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { func, bool, instanceOf, arrayOf } from 'prop-types'
import { Card } from 'src/lib/components/Card'
import { colors } from 'src/colors'
import { ObjectEntryType } from 'src/lib/types/entries/ObjectEntryType'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import { SubcardDivider } from 'src/lib/components/SubcardDivider'
import { cn } from './ObjectCard.style'
import { isEmptyObject } from 'src/entries/helpers/isEmptyObject'
import { SubcardFactory } from 'src/entries/components/cards/SubcardFactory'
import { sortKeys } from 'src/lib/helpers/sortKeys'
import { EntryType } from 'src/lib/types/entries/EntryType'

export class ObjectCard extends Component {
  static propTypes = {
    model: instanceOf(ObjectModelType).isRequired,
    entry: instanceOf(ObjectEntryType).isRequired,
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
        icon={<Icon type="entries-view-object" color={colors.secondary.main} size={30} />}
        labels={[entry.identificator ? `#${entry.identificator}` : null, model.type].filter(item => !!item)}
        error={conflict ? 'Entry does not satisfy the model. Update entry to make it valid.' : ''}
        onEdit={onEdit}
        onDelete={onDelete}
      >
        {conflict ? (
          <div className={`text-italic ${cn.error}`}>Unvalid object</div>
        ) : (
          <div>
            {!isEmptyObject(model, entry.value.value) ? null : (
              <div className="text-italic">Empty object</div>
            )}
            {sortKeys(model.properties).map(
              (key, i, keys) =>
                !entry.value.value.hasOwnProperty(key) ? null : (
                  <div className={cn.dividerContainer} key={key}>
                    <SubcardFactory
                      model={model.properties[key]}
                      value={entry.value.value[key]}
                      entries={entries}
                    />
                    <SubcardDivider className={cn.divider} />
                  </div>
                )
            )}
          </div>
        )}
      </Card>
    )
  }
}
