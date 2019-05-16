import React, { Component } from 'react'
import { instanceOf, arrayOf } from 'prop-types'
import { Subcard } from 'src/lib/components/Subcard'
import { Icon } from 'src/lib/components/Icon'
import { SubmodelType } from 'src/lib/types/models/SubmodelType'
import { colors } from 'src/colors'
import { EntryStringValue } from 'src/entries/components/basic/EntryStringValue'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { SubentryType } from 'src/lib/types/entries/SubentryType'
import { config } from 'src/config'

export class BasicTypeSubcard extends Component {
  static propTypes = {
    model: instanceOf(SubmodelType).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    value: instanceOf(SubentryType).isRequired,
  }

  render() {
    const { model, value, entries } = this.props
    const MAP = {
      'string-line': 'entries-view-string-line',
      'string-multiline': 'entries-view-string-multiline',
      'string-markdown': 'entries-view-string-markdown',
      'string-html': 'entries-view-string-html',
      number: 'entries-view-number',
      boolean: 'entries-view-boolean',
      enum: 'entries-view-enum',
      reference: 'entries-view-reference',
      asset: 'entries-view-asset',
    }
    return (
      <Subcard
        title={model.title}
        description={model.description}
        backgroundColor={colors.secondary.main}
        icon={<Icon type={MAP[model.type]} size={20} />}
        labels={[model.type]}
        noDivider
      >
        {model.type !== 'number' ? null : `${value.value}`}
        {model.type !== 'boolean' ? null : `${value.value}`}
        {model.type.indexOf('string') === -1 ? null : <EntryStringValue value={value.value} />}
        {model.type !== 'reference' ? null : (
          <div>
            Reference to{' '}
            {entries.find(item => item.id === value.value).identificator || 'entry without identificator'}
          </div>
        )}
        {model.type !== 'asset' ? null : (
          <a href={`${config.apiUrl}${value.value}`} download target="_blank">
            {value.value.split('/').pop()}
          </a>
        )}
        {model.type !== 'enum' ? null : model.enum.find(item => item.value === value.value).label}
      </Subcard>
    )
  }
}
