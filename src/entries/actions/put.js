import { putFetcher } from 'src/entries/fetchers/put'
import { getDataAction } from 'src/global/actions/getData'
import { getAssetControlsWithFile } from 'src/lib/helpers/getAssetControlsWithFile'
import { postFileFetcher } from 'src/entries/fetchers/postFileFetcher'

export function putAction(oldEntry, newEntry) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    const errorHandler = error => {
      dispatch({
        widget: 'entries',
        type: 'putError',
        payload: error,
      })
      dispatch(getDataAction())
    }
    dispatch({
      widget: 'entries',
      type: 'putStart',
    })
    Promise.all(
      getAssetControlsWithFile(newEntry).map(assetControl => {
        return postFileFetcher(projectId, assetControl.value).then(fileUrl => {
          assetControl.value = fileUrl
        })
      })
    )
      .then(() => {
        putFetcher(projectId, newEntry)
          .then(() => {
            dispatch({
              widget: 'entries',
              type: 'putEnd',
            })
            dispatch(getDataAction())
          })
          .catch(errorHandler)
      })
      .catch(errorHandler)
  }
}
