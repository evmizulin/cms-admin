import { deleteFetcher } from 'src/tokens/fetchers/deleteFetcher'
import { getAction } from 'src/tokens/actions/getAction'

export function deleteAction(token) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'tokens',
      type: 'deleteStart',
    })
    deleteFetcher(projectId, token.id)
      .then(() => {
        dispatch({
          widget: 'tokens',
          type: 'deleteEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'tokens',
          type: 'deleteError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
