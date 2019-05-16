import { fetch } from 'src/lib/services/Fetcher'

export const getFetcher = projectId => {
  return fetch({ method: 'GET', url: `projects/${projectId}/tokens` })
}
