import { getId } from 'src/mocks/getId'

export const getBoolean = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'boolean',
      title: `Boolean ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
      default: !!max,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'boolean', value: false },
    },
  }
  if (max) {
    mock.entry.value.value = true
    mock.model.description = 'Boolean max description'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
