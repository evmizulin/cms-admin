import { getId } from 'src/mocks/getId'

export const getEnum = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'enum',
      title: `Enum ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
      enum: [
        {
          label: 'True',
          value: true,
        },
      ],
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'enum', value: true },
    },
  }
  if (max) {
    mock.model.enum.push({ label: 'first', value: 'first' })
    mock.entry.value.value = 'first'
    mock.model.description = 'Enum max description'
    mock.model.default = true
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
