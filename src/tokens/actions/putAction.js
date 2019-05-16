import { putFetcher } from 'src/tokens/fetchers/putFetcher'
import { getAction } from 'src/tokens/actions/getAction'

export function putAction(token) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'tokens',
      type: 'putStart',
    })
    putFetcher(projectId, token)
      .then(() => {
        dispatch({
          widget: 'tokens',
          type: 'putEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'tokens',
          type: 'putError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
