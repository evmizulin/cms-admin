import { getId } from 'src/mocks/getId'

export const getAsset = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'asset',
      title: `Asset ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: {
        type: 'asset',
        value: `http://localhost:3000/1.jpg`,
      },
    },
  }
  if (max) {
    mock.model.description = 'Asset max description'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
