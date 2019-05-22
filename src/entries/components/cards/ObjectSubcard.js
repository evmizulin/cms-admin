import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { instanceOf, arrayOf } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { colors } from 'src/colors'
import { ObjectSubmodelType } from 'src/lib/types/models/ObjectSubmodelType'
import { SubcardFactory } from 'src/entries/components/cards/SubcardFactory'
import { SubcardDivider } from 'src/lib/components/SubcardDivider'
import { cn } from './ObjectSubcard.style'
import { isEmptyObject } from 'src/entries/helpers/isEmptyObject'
import { sortKeys } from 'src/lib/helpers/sortKeys'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { ObjectSubentryType } from 'src/lib/types/entries/ObjectSubentryType'

export class ObjectSubcard extends Component {
  static propTypes = {
    model: instanceOf(ObjectSubmodelType).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    value: instanceOf(ObjectSubentryType).isRequired,
  }

  render() {
    const { model, value, entries } = this.props
    return (
      <Subcard
        title={model.title}
        description={model.description}
        backgroundColor={colors.secondary.main}
        icon={<Icon type="entries-view-object" size={20} />}
        labels={[model.type]}
        noDivider={isEmptyObject(model, value.value)}
      >
        {!isEmptyObject(model, value.value) ? null : <div className="text-italic">Empty object</div>}
        {sortKeys(model.properties).map(
          (key, i, keys) =>
            !value.value.hasOwnProperty(key) ? null : (
              <div className={cn.dividerContainer} key={key}>
                <SubcardFactory model={model.properties[key]} value={value.value[key]} entries={entries} />
                <SubcardDivider className={cn.divider} />
              </div>
            )
        )}
      </Subcard>
    )
  }
}
