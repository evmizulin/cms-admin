import { postFetcher } from 'src/models/fetchers/post'
import { getDataAction } from 'src/global/actions/getData'

export function postAction(model) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'models',
      type: 'postStart',
    })
    postFetcher(projectId, model)
      .then(() => {
        dispatch({
          widget: 'models',
          type: 'postEnd',
        })
        dispatch(getDataAction())
      })
      .catch(error => {
        dispatch({
          widget: 'models',
          type: 'postError',
          payload: error,
        })
        dispatch(getDataAction())
      })
  }
}
