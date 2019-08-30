import { postFetcher } from 'src/signup/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'signup',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'signup',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'signup',
          type: 'postError',
          payload: error,
        })
      })
  }
}
