import { errorSet } from 'src/global/reducer'
import { fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/entries/actions/post'
import { putAction } from 'src/entries/actions/put'
import { deleteAction } from 'src/entries/actions/delete'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.entries.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.entries.loading.post = false
}

export function postError(state, error) {
  fetchingEnd(state)
  state.entries.loading.post = false
  errorSet(state, { show: true, error })
}

export function putStart(state) {
  fetchingStart(state)
  state.entries.loading.put = true
}

export function putEnd(state) {
  fetchingEnd(state)
  state.entries.loading.put = false
}

export function putError(state, error) {
  fetchingEnd(state)
  state.entries.loading.put = false
  errorSet(state, { show: true, error })
}

export function deleteStart(state) {
  fetchingStart(state)
  state.entries.loading.delete = true
}

export function deleteEnd(state) {
  fetchingEnd(state)
  state.entries.loading.delete = false
}

export function deleteError(state, error) {
  fetchingEnd(state)
  state.entries.loading.delete = false
  errorSet(state, { show: true, error })
}

export function onDialogClose(state, payload) {
  const { dialogType } = payload
  state.entries.dialogs[dialogType].show = false
}

export function onDialogExited(state, payload) {
  const { dialogType } = payload
  state.entries.dialogs[dialogType] = { show: false }
}

export function onDeleteEntry(state, payload) {
  const { id } = payload
  state.entries.dialogs.confirm = { id, show: true }
}

export function onEditEntry(state, payload) {
  const { entry, model } = payload
  state.entries.dialogs.edit = { entry, model, show: true }
}

export function onAddEntry(state, payload) {
  const { model } = payload
  state.entries.dialogs.add = { model, show: true }
}

export function onConfirmDialogConfirm(state) {
  const { id } = state.entries.dialogs.confirm
  const entry = state.entries.data.find(item => item.id === id)
  state.entries.dialogs.confirm.show = false
  setTimeout(() => dispatch(deleteAction(entry)), 0)
}

export function onAddDialogDone(state, payload) {
  const { entry } = payload
  state.entries.dialogs.add.show = false
  setTimeout(() => dispatch(postAction(entry)), 0)
}

export function onEditDialogDone(state, payload) {
  const { entry: newEntry } = payload
  const oldEntry = state.entries.data.find(item => item.id === newEntry.id)
  state.entries.dialogs.edit.show = false
  setTimeout(() => dispatch(putAction(oldEntry, newEntry)), 0)
}

const modifiers = {
  postStart,
  postEnd,
  postError,
  putStart,
  putEnd,
  putError,
  deleteStart,
  deleteEnd,
  deleteError,
  onDialogClose,
  onDialogExited,
  onDeleteEntry,
  onEditEntry,
  onAddEntry,
  onConfirmDialogConfirm,
  onAddDialogDone,
  onEditDialogDone,
}

export function entriesReducer(state, action) {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
