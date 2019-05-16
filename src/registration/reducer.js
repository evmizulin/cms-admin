import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/registration/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.registration.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.registration.loading.post = false
  state.registration.showMessage = true
}

export function postError(state, error) {
  fetchingEnd(state)
  state.registration.loading.post = false
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

export const registrationReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
