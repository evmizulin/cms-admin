import { fetch } from 'src/lib/services/Fetcher'

export function postFetcher(creds) {
  return fetch({ method: 'POST', url: `register`, body: creds })
}
