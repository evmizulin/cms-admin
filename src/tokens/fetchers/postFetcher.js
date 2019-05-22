import { fetch } from 'src/lib/services/Fetcher'

export const postFetcher = (projectId, token) => {
  return fetch({ method: 'POST', url: `projects/${projectId}/tokens`, body: token })
}
