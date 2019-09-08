import { config as globalConfig } from 'config'

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_TEST = process.env.NODE_ENV === 'test'

export const config = {
  isDemo: globalConfig.isDemo,
  useMemoryRouter: IS_TEST,
  apiUrl: IS_DEV
    ? `${globalConfig.devApiProtocol}://${globalConfig.devApiHost}`
    : `${globalConfig.prodApiProtocol}://${globalConfig.prodApiHost}`,
  apiHost: IS_DEV ? globalConfig.devApiHost : globalConfig.prodApiHost,
  apiProtocol: IS_DEV ? globalConfig.devApiProtocol : globalConfig.prodApiProtocol,
}
