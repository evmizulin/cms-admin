import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/change-pass/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.changePass.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.changePass.loading.post = false
  state.changePass.showMessage = true
}

export function postError(state, error) {
  fetchingEnd(state)
  state.changePass.loading.post = false
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

export const changePassReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
