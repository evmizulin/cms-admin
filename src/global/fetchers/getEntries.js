import { fetch } from 'src/lib/services/Fetcher'

export const getEntriesFetcher = projectId => {
  return fetch({ method: 'GET', url: `projects/${projectId}/entries` })
}
