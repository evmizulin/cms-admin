import { getId } from 'src/mocks/getId'

export const getReference = ({ max, sub, model, entry } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'reference',
      title: `Reference ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
      reference: model.id,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'reference', value: entry.id },
    },
  }
  if (max) {
    mock.model.description = 'Reference max description'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
