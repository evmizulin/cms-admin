import { postFetcher } from 'src/tokens/fetchers/postFetcher'
import { getAction } from 'src/tokens/actions/getAction'

export function postAction(token) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'tokens',
      type: 'postStart',
    })
    postFetcher(projectId, token)
      .then(() => {
        dispatch({
          widget: 'tokens',
          type: 'postEnd',
        })
        dispatch(getAction())
      })
      .catch(error => {
        dispatch({
          widget: 'tokens',
          type: 'postError',
          payload: error,
        })
        dispatch(getAction())
      })
  }
}
