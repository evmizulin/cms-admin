import { fetch } from 'src/lib/services/Fetcher'

export function signupFetcher(creds) {
  return fetch({ method: 'POST', url: `signup`, body: creds })
}
