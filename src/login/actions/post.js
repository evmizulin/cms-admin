import { postFetcher } from 'src/login/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'login',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'login',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'login',
          type: 'postError',
          payload: error,
        })
      })
  }
}
