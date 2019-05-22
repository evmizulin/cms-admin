import { errorSet } from 'src/global/reducer'
import { fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/projects/actions/postAction'
import { putAction } from 'src/projects/actions/putAction'
import { deleteAction } from 'src/projects/actions/deleteAction'
import { dispatch } from 'src/store'
import { logout } from 'src/lib/helpers/logout'

export function getStart(state) {
  fetchingStart(state)
  state.projects.loading.get = true
}

export function getEnd(state, { projects }) {
  fetchingEnd(state)
  state.projects.loading.get = false
  state.projects.loading.initialGet = false
  state.projects.data = projects
}

export function getError(state, error) {
  fetchingEnd(state)
  state.projects.loading.get = false
  state.projects.loading.initialGet = false
  errorSet(state, { show: true, error })
}

export function postStart(state) {
  fetchingStart(state)
  state.projects.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.projects.loading.post = false
}

export function postError(state, error) {
  fetchingEnd(state)
  state.projects.loading.post = false
  errorSet(state, { show: true, error })
}

export function putStart(state) {
  fetchingStart(state)
  state.projects.loading.put = true
}

export function putEnd(state) {
  fetchingEnd(state)
  state.projects.loading.put = false
}

export function putError(state, error) {
  fetchingEnd(state)
  state.projects.loading.put = false
  errorSet(state, { show: true, error })
}

export function deleteStart(state) {
  fetchingStart(state)
  state.projects.loading.delete = true
}

export function deleteEnd(state) {
  fetchingEnd(state)
  state.projects.loading.delete = false
}

export function deleteError(state, error) {
  fetchingEnd(state)
  state.projects.loading.delete = false
  errorSet(state, { show: true, error })
}

export function onDialogClose(state, payload) {
  const { dialogType } = payload
  state.projects.dialogs[dialogType].show = false
}

export function onDialogExited(state, payload) {
  const { dialogType } = payload
  state.projects.dialogs[dialogType] = { show: false, mount: false }
}

export function onDeleteProject(state, payload) {
  const { id } = payload
  state.projects.dialogs.confirm = { id, show: true, mount: true }
}

export function onEditProject(state, payload) {
  const { project } = payload
  state.projects.dialogs.edit = { project, show: true, mount: true }
}

export function onAddProject(state, payload) {
  state.projects.dialogs.add = { show: true, mount: true }
}

export function onConfirmDialogConfirm(state) {
  const { id } = state.projects.dialogs.confirm
  const project = state.projects.data.find(item => item.id === id)
  state.projects.dialogs.confirm.show = false
  setTimeout(() => dispatch(deleteAction(project)), 0)
}

export function onAddDialogDone(state, payload) {
  const { project } = payload
  state.projects.dialogs.add.show = false
  setTimeout(() => dispatch(postAction(project)), 0)
}

export function onEditDialogDone(state, payload) {
  const { project: newProject } = payload
  const oldProject = state.projects.data.find(item => item.id === newProject.id)
  state.projects.dialogs.edit.show = false
  setTimeout(() => dispatch(putAction(oldProject, newProject)), 0)
}

export function onLogoutClick(state, payload) {
  logout()
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
  onDeleteProject,
  onEditProject,
  onAddProject,
  onConfirmDialogConfirm,
  onAddDialogDone,
  onEditDialogDone,
  onLogoutClick,
}

export function projectsReducer(state, action) {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
