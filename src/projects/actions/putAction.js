import { putFetcher } from 'src/projects/fetchers/putFetcher'
import { getAction } from 'src/projects/actions/getAction'

export function putAction(oldProject, newProject) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'projects',
      type: 'putStart',
    })
    putFetcher(newProject)
      .then(() => {
        dispatch({
          widget: 'projects',
          type: 'putEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'projects',
          type: 'putError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
