import { getId } from 'src/mocks/getId'

export const getStringHtml = ({ max, sub } = {}) => {
  const id = getId()
  const mock = {
    model: {
      id: id,
      apiId: `api-id-${id}`,
      type: 'string-html',
      title: `StringHtml ${max ? 'max' : 'min'} ${sub ? 'subtype' : 'type'} title`,
    },
    entry: {
      id: getId(),
      modelId: id,
      identificator: getId(),
      value: { type: 'string-html', value: '' },
    },
  }
  if (max) {
    mock.entry.value.value = '<div>a</div>'
    mock.model.description = 'StringHtml max description'
    mock.model.default = '<span>b</span>'
    mock.model.minLength = 2
    mock.model.maxLength = 20
    // mock.model.pattern = '^([0-9]+)$'
  }
  if (sub) {
    delete mock.model.id
    delete mock.model.apiId
    mock.entry = mock.entry.value
  }
  return mock
}
