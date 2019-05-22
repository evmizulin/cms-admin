import { deleteFetcher } from 'src/models/fetchers/delete'
import { getDataAction } from 'src/global/actions/getData'

export function deleteAction(modelId, entries) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'models',
      type: 'deleteStart',
    })
    deleteFetcher(projectId, modelId)
      .then(() => {
        dispatch({
          widget: 'models',
          type: 'deleteEnd',
        })
        dispatch(getDataAction())
      })
      .catch(error => {
        dispatch({
          widget: 'models',
          type: 'deleteError',
          payload: error,
        })
        dispatch(getDataAction())
      })
  }
}
