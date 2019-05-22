import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/recover-pass/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.recoverPass.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.recoverPass.loading.post = false
  state.recoverPass.showMessage = true
}

export function postError(state, error) {
  fetchingEnd(state)
  state.recoverPass.loading.post = false
  errorSet(state, { show: true, error })
}

export function onDone(state, { creds }) {
  setTimeout(() => dispatch(postAction(creds)), 0)
}

const modifiers = {
  postStart,
  postEnd,
  postError,
  onDone,
}

export const recoverPassReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
