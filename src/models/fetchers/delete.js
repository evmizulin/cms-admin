import { fetch } from 'src/lib/services/Fetcher'

export const deleteFetcher = (projectId, id) => {
  return fetch({ method: 'DELETE', url: `projects/${projectId}/models/${id}` })
}
