import validator from 'tvalidator'

const v = validator()

export const validate = (...props) => {
  const { valid, errors } = v(...props)
  return {
    valid,
    errors: errors.map(error => {
      return {
        field: error.dataPath[0] || error.params.key,
        message: error.message,
      }
    }),
    originalErrors: errors,
  }
}

/*
validator(
  // value
  { name: '12345678901' },
  // schema
  {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        maxLength: 10,
        minLength: 1,
      },
    },
  },
  // errors
  {
    properties: {
      name: {
        maxLength: 'Name too long',
      },
    },
  }
)

{
  valid: false,
  errors: [
    {
      params: {
        length: 11,
        maximum: 10,
      },
      code: 'STRING_LENGTH_LONG',
      dataPath: ['name'],
      schemaPath: ['properties', 'name', 'maxLength'],
      message: 'Name too long',
    },
  ],
}
*/
