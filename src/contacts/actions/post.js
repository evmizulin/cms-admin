import { postFetcher } from 'src/contacts/fetchers/post'

export function postAction(contact) {
  return function(dispatch, getState) {
    dispatch({
      widget: 'contacts',
      type: 'postStart',
    })
    postFetcher(contact)
      .then(() => {
        dispatch({
          widget: 'contacts',
          type: 'postEnd',
        })
      })
      .catch(error => {
        dispatch({
          widget: 'contacts',
          type: 'postError',
          payload: error,
        })
      })
  }
}
