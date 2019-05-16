import { fetch } from 'src/lib/services/Fetcher'

export function postFetcher(projectId, entry) {
  return fetch({ method: 'POST', url: `projects/${projectId}/entries`, body: entry })
}
