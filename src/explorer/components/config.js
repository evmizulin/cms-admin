import { config as appConfig } from 'src/config'

const Entry = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    modelId: { type: 'string' },
    identificator: { type: 'string' },
    value: {},
  },
}

export const config = {
  swagger: '2.0',
  info: {
    description:
      'Any client requesting content from the API needs to provide an API Key. ' +
      'To supply the API Key each request should contain _ApiKey_ header with valid token.\n\n' +
      'For example: \n`ApiKey: 20e3202417fb684dc9a61be4d77dbcb27c596078`\n\n' +
      'You can create an API Key in the appropriate section of this site. \n\n' +
      'To explore the API press "Authorize" button and paste valid API Key.',
    version: '1.0.0',
    title: 'Public API',
    contact: { email: 'evgeny.mizulin@gmail.com' },
  },
  host: appConfig.apiHost,
  tags: [
    {
      name: 'entries',
      description: 'Fetch your content',
    },
    {
      name: 'files',
      description: 'Fetch your files',
    },
  ],
  schemes: appConfig.apiProtocol,
  paths: {
    '/entries': {
      get: {
        tags: ['entries'],
        summary: 'Get entries of project',
        produces: ['application/json'],
        parameters: [
          {
            name: 'apiId',
            in: 'query',
            description: 'You define this parameter while creating a Model',
            required: false,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'array', items: Entry },
          },
          '401': { description: 'Unauthorized' },
        },
        security: [{ api_key: [] }],
      },
    },
    '/entries/{entryId}': {
      get: {
        tags: ['entries'],
        summary: 'Get exact entry',
        produces: ['application/json'],
        parameters: [
          {
            name: 'entryId',
            in: 'path',
            description: 'Id of entry',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: Entry,
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
        security: [{ api_key: [] }],
      },
    },
    '/files/{fileId}/{fileName}': {
      get: {
        tags: ['files'],
        summary: 'Get exact file',
        // produces: ['application/json'],
        parameters: [
          {
            name: 'fileId',
            in: 'path',
            description: 'Id of file',
            required: true,
            type: 'string',
          },
          {
            name: 'fileName',
            in: 'path',
            description: 'Name of file',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'string', format: 'binary' },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
        security: [{ api_key: [] }],
      },
    },
  },
  securityDefinitions: {
    api_key: { type: 'apiKey', name: 'ApiKey', in: 'header' },
  },
}
