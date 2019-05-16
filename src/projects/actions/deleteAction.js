import { deleteFetcher } from 'src/projects/fetchers/deleteFetcher'
import { getAction } from 'src/projects/actions/getAction'

export function deleteAction(project) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'projects',
      type: 'deleteStart',
    })
    deleteFetcher(project.id)
      .then(() => {
        dispatch({
          widget: 'projects',
          type: 'deleteEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'projects',
          type: 'deleteError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
