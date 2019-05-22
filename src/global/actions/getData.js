import { getEntriesFetcher } from 'src/global/fetchers/getEntries'
import { getModelsFetcher } from 'src/global/fetchers/getModels'
import { getProjectsFetcher } from 'src/global/fetchers/getProjects'
import Promise from 'src/lib/services/Promise'
import { createEntry } from 'src/lib/helpers/createEntry'
import { createModel } from 'src/lib/helpers/createModel'

export const getDataAction = function(projectId) {
  return function(dispatch, getState) {
    const state = getState()
    const { projectId: stateProjectId } = state.global
    if (state.models.loading.get && state.entries.loading.get) return
    dispatch({
      widget: 'global',
      type: 'getStart',
    })
    Promise.all([
      getProjectsFetcher(),
      getEntriesFetcher(projectId || stateProjectId),
      getModelsFetcher(projectId || stateProjectId),
    ])
      .then(([projects, entries, models]) => {
        dispatch({
          widget: 'global',
          type: 'getEnd',
          payload: {
            projects: projects,
            models: models.map(model => createModel(model)),
            entries: entries.map(entry => createEntry(entry)),
          },
        })
      })
      .catch(error => {
        dispatch({
          widget: 'global',
          type: 'getError',
          payload: error,
        })
      })
  }
}
