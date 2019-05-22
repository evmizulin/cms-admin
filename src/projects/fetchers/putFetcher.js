import { fetch } from 'src/lib/services/Fetcher'

export const putFetcher = project => {
  return fetch({ method: 'PUT', url: `projects/${project.id}`, body: project })
}
