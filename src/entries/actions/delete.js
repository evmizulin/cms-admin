import { deleteFetcher } from 'src/entries/fetchers/delete'
import { getDataAction } from 'src/global/actions/getData'

export function deleteAction(entry) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'entries',
      type: 'deleteStart',
    })
    deleteFetcher(projectId, entry.id)
      .then(() => {
        dispatch({
          widget: 'entries',
          type: 'deleteEnd',
        })
        dispatch(getDataAction())
      })
      .catch(error => {
        dispatch({
          widget: 'entries',
          type: 'deleteError',
          payload: error,
        })
        dispatch(getDataAction())
      })
  }
}
