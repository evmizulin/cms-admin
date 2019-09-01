import { signupFetcher } from 'src/signup/fetchers/signup'

export function signupFetch(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'signup',
      type: 'signupFetchStart',
    })
    signupFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'signup',
          type: 'signupFetchEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'signup',
          type: 'signupFetchError',
          payload: error,
        })
      })
  }
}
