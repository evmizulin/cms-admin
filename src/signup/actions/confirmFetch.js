import { confirmFetcher } from 'src/signup/fetchers/confirm'

export function confirmFetch(confirmationToken) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'signup',
      type: 'confirmFetchStart',
    })
    confirmFetcher(confirmationToken)
      .then(() => {
        dispatch({
          widget: 'signup',
          type: 'confirmFetchEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'signup',
          type: 'confirmFetchError',
          payload: error,
        })
      })
  }
}
