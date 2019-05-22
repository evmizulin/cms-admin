import { fetch } from 'src/lib/services/Fetcher'

export const deleteFetcher = projectId => {
  return fetch({ method: 'DELETE', url: `projects/${projectId}` })
}
