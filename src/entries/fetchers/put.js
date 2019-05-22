import { fetch } from 'src/lib/services/Fetcher'

export function putFetcher(projectId, entry) {
  return fetch({ method: 'PUT', url: `projects/${projectId}/entries/${entry.id}`, body: entry })
}
