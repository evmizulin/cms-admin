import { validate } from 'src/lib/services/Validator'
import { isEntryRefConflict } from 'src/lib/helpers/isEntryRefConflict'
import { isModelRefConflict } from 'src/lib/helpers/isModelRefConflict'
import { isEntryConsistencyConflict } from 'src/lib/helpers/isEntryConsistencyConflict'

export function redirectSet(state, url) {
  state.global.redirect = url
}

export function projectIdSet(state, { projectId }) {
  state.global.projectId = projectId
}

export function errorSet(state, { show, error }) {
  const globalState = state.global
  globalState.error.show = show
  if (show) {
    console.error(error) // eslint-disable-line no-console
    globalState.error.message = error.message
  }
}

export function getStart(state) {
  fetchingStart(state)
  state.models.loading.get = true
  state.entries.loading.get = true
  state.projects.loading.get = true
}

export function getEnd(state, { projects, entries, models }) {
  fetchingEnd(state)
  state.models.loading.get = false
  state.entries.loading.get = false
  state.projects.loading.get = false
  state.models.loading.initialGet = false
  state.entries.loading.initialGet = false
  state.projects.loading.initialGet = false
  state.models.data = models
  state.entries.data = entries
  state.projects.data = projects
  state.entries.conflicts = entries.map(entry => ({
    id: entry.id,
    conflict:
      isEntryConsistencyConflict(entry, models.find(model => model.id === entry.modelId)) ||
      !validate(entry.toValue(), models.find(model => model.id === entry.modelId).toSchema()).valid ||
      isEntryRefConflict(models.find(model => model.id === entry.modelId), entry, entries),
  }))
  state.models.conflicts = models.map(model => ({
    id: model.id,
    conflict: isModelRefConflict(model, models),
  }))
}

export function getError(state, error) {
  fetchingEnd(state)
  state.models.loading.get = false
  state.entries.loading.get = false
  state.projects.loading.get = false
  state.models.loading.initialGet = false
  state.entries.loading.initialGet = false
  state.projects.loading.initialGet = false
  errorSet(state, { show: true, error })
}

export function fetchingStart(state) {
  state.global.loading.push(true)
}

export function fetchingEnd(state) {
  state.global.loading.pop()
}

const modifiers = {
  redirectSet,
  projectIdSet,
  errorSet,
  getStart,
  getEnd,
  getError,
  fetchingStart,
  fetchingEnd,
}

export const globalReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
