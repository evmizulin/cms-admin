import { getProjectsFetcher } from 'src/global/fetchers/getProjects'

export function getAction() {
  return function(dispatch, getState) {
    dispatch({
      widget: 'projects',
      type: 'getStart',
    })
    getProjectsFetcher()
      .then(projects => {
        dispatch({
          widget: 'projects',
          type: 'getEnd',
          payload: { projects },
        })
      })
      .catch(error => {
        dispatch({
          widget: 'projects',
          type: 'getError',
          payload: error,
        })
      })
  }
}
