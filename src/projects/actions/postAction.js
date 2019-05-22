import { postFetcher } from 'src/projects/fetchers/postFetcher'
import { getAction } from 'src/projects/actions/getAction'

export function postAction(project) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'projects',
      type: 'postStart',
    })
    postFetcher(project)
      .then(() => {
        dispatch({
          widget: 'projects',
          type: 'postEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'projects',
          type: 'postError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
