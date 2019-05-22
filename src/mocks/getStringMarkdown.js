import { stringMarkdownValue } from 'src/mocks/stringMarkdownValue'
import { getId } from 'src/mocks/getId'

export const getStringMarkdown = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'string-markdown',
      title: `StringMarkdown ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'string-markdown', value: '' },
    },
  }
  if (max) {
    mock.entry.value.value = stringMarkdownValue
    mock.model.description = 'StringMarkdown max description'
    mock.model.default = '## StringMarkdown'
    mock.model.minLength = 2
    mock.model.maxLength = 100
    // mock.model.pattern = '^([a-z]+)$'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
