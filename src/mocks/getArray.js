import { getId } from 'src/mocks/getId'

export const getArray = ({ max, sub, item }) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'array',
      title: `Array ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
      uniqueItems: false,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'array', value: max ? [item.entry] : [] },
    },
  }
  if (max) {
    mock.model.description = 'Array max description'
    mock.model.minItems = 1
    mock.model.maxItems = 3
    mock.model.items = item.model
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
