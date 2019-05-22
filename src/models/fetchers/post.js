import { fetch } from 'src/lib/services/Fetcher'

export const postFetcher = (projectId, model) => {
  return fetch({ method: 'POST', url: `projects/${projectId}/models`, body: model })
}
