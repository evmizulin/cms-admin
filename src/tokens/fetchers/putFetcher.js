import { fetch } from 'src/lib/services/Fetcher'

export const putFetcher = (projectId, token) => {
  return fetch({ method: 'PUT', url: `projects/${projectId}/tokens/${token.id}`, body: token })
}
