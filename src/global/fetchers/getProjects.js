import { fetch } from 'src/lib/services/Fetcher'

export const getProjectsFetcher = () => {
  return fetch({ method: 'GET', url: `projects` })
}
