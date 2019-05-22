import { getId } from 'src/mocks/getId'

export const getNumber = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'number',
      title: `Number ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'number', value: 0 },
    },
  }
  if (max) {
    mock.entry.value.value = 2.8 // 1.4
    mock.model.description = 'Number max description'
    mock.model.default = 1.4
    mock.model.minimum = 0.1
    mock.model.maximum = 9.8
    mock.model.multipleOf = 1.4 // 0.2
    mock.model.exclusiveMinimum = true
    mock.model.exclusiveMaximum = true
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
