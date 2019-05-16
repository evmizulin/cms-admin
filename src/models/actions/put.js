import { putFetcher } from 'src/models/fetchers/put'
import { getDataAction } from 'src/global/actions/getData'

export function putAction(model) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'models',
      type: 'putStart',
    })
    putFetcher(projectId, model)
      .then(() => {
        dispatch({
          widget: 'models',
          type: 'putEnd',
        })
        dispatch(getDataAction())
      })
      .catch(error => {
        dispatch({
          widget: 'models',
          type: 'putError',
          payload: error,
        })
        dispatch(getDataAction())
      })
  }
}
