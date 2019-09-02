import { postFetcher } from 'src/signin/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'signin',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'signin',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'signin',
          type: 'postError',
          payload: error,
        })
      })
  }
}
