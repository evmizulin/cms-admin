import { fetch } from 'src/lib/services/Fetcher'

export const postFetcher = project => {
  return fetch({ method: 'POST', url: `projects`, body: project })
}
