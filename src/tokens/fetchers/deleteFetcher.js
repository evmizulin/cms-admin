import { fetch } from 'src/lib/services/Fetcher'

export const deleteFetcher = (projectId, tokenId) => {
  return fetch({ method: 'DELETE', url: `projects/${projectId}/tokens/${tokenId}` })
}
