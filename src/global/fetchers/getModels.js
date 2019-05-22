import { fetch } from 'src/lib/services/Fetcher'

export const getModelsFetcher = projectId => {
  return fetch({ method: 'GET', url: `projects/${projectId}/models` })
}
