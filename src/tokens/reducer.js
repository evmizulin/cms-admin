import { errorSet } from 'src/global/reducer'
import { fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/tokens/actions/postAction'
import { putAction } from 'src/tokens/actions/putAction'
import { deleteAction } from 'src/tokens/actions/deleteAction'
import { dispatch } from 'src/store'

export function getStart(state) {
  fetchingStart(state)
  state.tokens.loading.get = true
}

export function getEnd(state, { tokens }) {
  fetchingEnd(state)
  state.tokens.loading.get = false
  state.tokens.loading.initialGet = false
  state.tokens.data = tokens
}

export function getError(state, error) {
  fetchingEnd(state)
  state.tokens.loading.get = false
  state.tokens.loading.initialGet = false
  errorSet(state, { show: true, error })
}

export function postStart(state) {
  fetchingStart(state)
  state.tokens.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.tokens.loading.post = false
}

export function postError(state, error) {
  fetchingEnd(state)
  state.tokens.loading.post = false
  errorSet(state, { show: true, error })
}

export function putStart(state) {
  fetchingStart(state)
  state.tokens.loading.put = true
}

export function putEnd(state) {
  fetchingEnd(state)
  state.tokens.loading.put = false
}

export function putError(state, error) {
  fetchingEnd(state)
  state.tokens.loading.put = false
  errorSet(state, { show: true, error })
}

export function deleteStart(state) {
  fetchingStart(state)
  state.tokens.loading.delete = true
}

export function deleteEnd(state) {
  fetchingEnd(state)
  state.tokens.loading.delete = false
}

export function deleteError(state, error) {
  fetchingEnd(state)
  state.tokens.loading.delete = false
  errorSet(state, { show: true, error })
}

export function onDialogClose(state, payload) {
  const { dialogType } = payload
  state.tokens.dialogs[dialogType].show = false
}

export function onDialogExited(state, payload) {
  const { dialogType } = payload
  state.tokens.dialogs[dialogType] = { show: false, mount: false }
}

export function onDelete(state, payload) {
  const { id } = payload
  state.tokens.dialogs.confirm = { id, show: true, mount: true }
}

export function onEdit(state, payload) {
  const { token } = payload
  state.tokens.dialogs.edit = { token, show: true, mount: true }
}

export function onAdd(state, payload) {
  state.tokens.dialogs.add = { show: true, mount: true }
}

export function onConfirmDialogConfirm(state) {
  const { id } = state.tokens.dialogs.confirm
  const token = state.tokens.data.find(item => item.id === id)
  state.tokens.dialogs.confirm.show = false
  setTimeout(() => dispatch(deleteAction(token)), 0)
}

export function onAddDialogDone(state, payload) {
  const { token } = payload
  state.tokens.dialogs.add.show = false
  setTimeout(() => dispatch(postAction(token)), 0)
}

export function onEditDialogDone(state, payload) {
  const { token: newToken } = payload
  state.tokens.dialogs.edit.show = false
  setTimeout(() => dispatch(putAction(newToken)), 0)
}

const modifiers = {
  getStart,
  getEnd,
  getError,
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
  onDelete,
  onEdit,
  onAdd,
  onConfirmDialogConfirm,
  onAddDialogDone,
  onEditDialogDone,
}

export function tokensReducer(state, action) {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
