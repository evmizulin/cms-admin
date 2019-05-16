import { getFetcher } from 'src/tokens/fetchers/getFetcher'

export function getAction() {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    dispatch({
      widget: 'tokens',
      type: 'getStart',
    })
    getFetcher(projectId)
      .then(tokens => {
        dispatch({
          widget: 'tokens',
          type: 'getEnd',
          payload: { tokens },
        })
      })
      .catch(error => {
        dispatch({
          widget: 'tokens',
          type: 'getError',
          payload: error,
        })
      })
  }
}
