import { fetch } from 'src/lib/services/Fetcher'

export function postFetcher(contact) {
  return fetch({ method: 'POST', url: `tmp/contacts`, body: contact })
}
