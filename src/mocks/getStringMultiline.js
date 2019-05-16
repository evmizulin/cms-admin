import { getId } from 'src/mocks/getId'

export const getStringMultiline = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'string-multiline',
      title: `StringMultiline ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'string-multiline', value: '' },
    },
  }
  if (max) {
    mock.entry.value.value = 'aaabbb'
    mock.model.description = 'StringMultiline max description'
    mock.model.default = 'aaa'
    mock.model.minLength = 2
    mock.model.maxLength = 20
    mock.model.pattern = '^([a-z]+)$'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
