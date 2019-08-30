import { postFetcher } from 'src/email-confirm/fetchers/post'

export function postAction(confirmationToken) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'emailConfirm',
      type: 'postStart',
    })
    postFetcher(confirmationToken)
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
