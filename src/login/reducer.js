import { redirectSet, errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { routes } from 'src/lib/services/Routes'
import { auth } from 'src/lib/services/Auth'
import { postAction } from 'src/login/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.login.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.login.loading.post = false
  auth.set(true)
  redirectSet(state, routes.projects())
}

export function postError(state, error) {
  fetchingEnd(state)
  state.login.loading.post = false
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

export const loginReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
