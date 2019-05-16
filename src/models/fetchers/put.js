import { fetch } from 'src/lib/services/Fetcher'

export const putFetcher = (projectId, model) => {
  return fetch({ method: 'PUT', url: `projects/${projectId}/models/${model.id}`, body: model })
}
