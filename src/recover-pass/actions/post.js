import { postFetcher } from 'src/recover-pass/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'recoverPass',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'recoverPass',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'recoverPass',
          type: 'postError',
          payload: error,
        })
      })
  }
}
