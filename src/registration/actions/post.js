import { postFetcher } from 'src/registration/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'registration',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'registration',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'registration',
          type: 'postError',
          payload: error,
        })
      })
  }
}
