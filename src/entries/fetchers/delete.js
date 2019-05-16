import { fetch } from 'src/lib/services/Fetcher'

export function deleteFetcher(projectId, id) {
  return fetch({ method: 'DELETE', url: `projects/${projectId}/entries/${id}` })
}
