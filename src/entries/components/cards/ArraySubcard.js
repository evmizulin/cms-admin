import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { instanceOf, arrayOf } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { colors } from 'src/colors'
import { ArraySubmodelType } from 'src/lib/types/models/ArraySubmodelType'
import { SubcardFactory } from 'src/entries/components/cards/SubcardFactory'
import { SubcardDivider } from 'src/lib/components/SubcardDivider'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { ArraySubentryType } from 'src/lib/types/entries/ArraySubentryType'

import { cn } from './ArraySubcard.style'

export class ArraySubcard extends Component {
  static propTypes = {
    model: instanceOf(ArraySubmodelType).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    value: instanceOf(ArraySubentryType).isRequired,
  }

  render() {
    const { model, value, entries } = this.props
    return (
      <Subcard
        title={model.title}
        description={model.description}
        backgroundColor={colors.secondary.main}
        icon={<Icon type="entries-view-array" size={20} />}
        labels={[model.type]}
        noDivider={!value.value.length}
      >
        {value.value.length ? null : <div className="text-italic">Empty array</div>}
        {value.value.map((item, index) => (
          <div className={cn.dividerContainer} key={index}>
            <SubcardFactory model={model.items} value={item} entries={entries} />
            <SubcardDivider className={cn.divider} />
          </div>
        ))}
      </Subcard>
    )
  }
}
