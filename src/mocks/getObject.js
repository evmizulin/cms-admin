import { getId } from 'src/mocks/getId'

export const getObject = ({ max, sub, props }) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'object',
      title: `Object ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
      required: max ? Object.keys(props) : [],
      additionalProperties: false,
      properties: Object.keys(props).reduce((res, key) => {
        res[key] = props[key].model
        return res
      }, {}),
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'object', value: {} },
    },
  }
  if (max) {
    mock.model.description = 'Object max description'
    mock.entry.value.value = Object.keys(props).reduce((res, key) => {
      res[key] = props[key].entry
      return res
    }, {})
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
