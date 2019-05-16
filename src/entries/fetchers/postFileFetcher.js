import { fetch } from 'src/lib/services/Fetcher'

export function postFileFetcher(projectId, file) {
  return fetch({ method: 'POST', url: `projects/${projectId}/files`, file }).then(({ name, id }) => {
    return `/files/${id}/${name}`
  })
}
