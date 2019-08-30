import { fetch } from 'src/lib/services/Fetcher'

export function postFetcher(confirmationToken) {
  return fetch({ method: 'POST', url: `signup/confirmation`, body: { confirmationToken } })
}
