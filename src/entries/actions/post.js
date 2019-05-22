import { postFetcher } from 'src/entries/fetchers/post'
import { getDataAction } from 'src/global/actions/getData'
import { getAssetControlsWithFile } from 'src/lib/helpers/getAssetControlsWithFile'
import { postFileFetcher } from 'src/entries/fetchers/postFileFetcher'

export function postAction(entry) {
  return function(dispatch, getState) {
    const { projectId } = getState().global
    const errorHandler = error => {
      dispatch({
        widget: 'entries',
        type: 'postError',
        payload: error,
      })
      dispatch(getDataAction())
    }
    dispatch({
      widget: 'entries',
      type: 'postStart',
    })
    Promise.all(
      getAssetControlsWithFile(entry).map(assetControl => {
        return postFileFetcher(projectId, assetControl.value).then(fileUrl => {
          assetControl.value = fileUrl
        })
      })
    )
      .then(() => {
        postFetcher(projectId, entry)
          .then(() => {
            dispatch({
              widget: 'entries',
              type: 'postEnd',
            })
            dispatch(getDataAction())
          })
          .catch(errorHandler)
      })
      .catch(errorHandler)
  }
}
