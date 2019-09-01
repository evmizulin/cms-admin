import { fetch } from 'src/lib/services/Fetcher'

export function confirmFetcher(confirmationToken) {
  return fetch({ method: 'POST', url: `signup/confirmation`, body: { confirmationToken } })
}
