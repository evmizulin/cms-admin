import { getId } from 'src/mocks/getId'

export const getStringLine = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'string-line',
      title: `StringLine ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'string-line', value: '' },
    },
  }
  if (max) {
    mock.entry.value.value = 'lada'
    mock.model.description = 'StringLine max description'
    mock.model.default = 'bmw'
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
