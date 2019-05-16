import { postFetcher } from 'src/change-pass/fetchers/post'

export function postAction(creds) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'changePass',
      type: 'postStart',
    })
    postFetcher(creds)
      .then(() => {
        dispatch({
          widget: 'changePass',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'changePass',
          type: 'postError',
          payload: error,
        })
      })
  }
}
