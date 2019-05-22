import React, { Component } from 'react'
import { func, bool, instanceOf, arrayOf } from 'prop-types'
import { Icon } from 'src/lib/components/Icon'
import { Card } from 'src/lib/components/Card'
import { colors } from 'src/colors'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { ModelType } from 'src/lib/types/models/ModelType'
import { EntryStringValue } from 'src/entries/components/basic/EntryStringValue'
import { config } from 'src/config'

export class BasicTypeCard extends Component {
  static propTypes = {
    model: instanceOf(ModelType).isRequired,
    entry: instanceOf(EntryType).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    conflict: bool.isRequired,
    onEdit: func.isRequired,
    onDelete: func.isRequired,
  }

  render() {
    const { entry, onEdit, onDelete, conflict, model, entries } = this.props
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
      <Card
        title={model.title}
        description={model.description}
        backgroundColor={colors.secondary.main}
        icon={<Icon type={MAP[model.type]} color={colors.secondary.main} size={30} />}
        labels={[entry.identificator ? `#${entry.identificator}` : null, model.type].filter(item => !!item)}
        error={conflict ? 'Entry does not satisfy the model. Update entry to make it valid.' : ''}
        onEdit={onEdit}
        onDelete={onDelete}
      >
        {conflict ? (
          <div className={`text-italic text-error`}>Unvalid {model.type}</div>
        ) : (
          <div>
            {model.type !== 'number' ? null : `${entry.value.value}`}
            {model.type !== 'boolean' ? null : `${entry.value.value}`}
            {model.type !== 'reference' ? null : (
              <div>
                Reference to{' '}
                {entries.find(item => item.id === entry.value.value).identificator ||
                  'entry without identificator'}
              </div>
            )}
            {model.type !== 'asset' ? null : (
              <a href={`${config.apiUrl}${entry.value.value}`} download target="_blank">
                {entry.value.value.split('/').pop()}
              </a>
            )}
            {model.type !== 'enum' ? null : model.enum.find(item => item.value === entry.value.value).label}
            {model.type.indexOf('string-') === -1 ? null : <EntryStringValue value={entry.value.value} />}
          </div>
        )}
      </Card>
    )
  }
}
