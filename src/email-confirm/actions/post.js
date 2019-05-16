import { postFetcher } from 'src/email-confirm/fetchers/post'

export function postAction(activationToken) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'emailConfirm',
      type: 'postStart',
    })
    postFetcher(activationToken)
      .then(() => {
        dispatch({
          widget: 'emailConfirm',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'emailConfirm',
          type: 'postError',
          payload: error,
        })
      })
  }
}
