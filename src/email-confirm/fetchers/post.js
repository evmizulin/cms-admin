import { fetch } from 'src/lib/services/Fetcher'

export function postFetcher(activationToken) {
  return fetch({ method: 'POST', url: `email-confirm`, body: { activationToken } })
}
