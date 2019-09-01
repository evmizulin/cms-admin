import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { signupFetch } from 'src/signup/actions/signupFetch'
import { confirmFetch } from 'src/signup/actions/confirmFetch'
import { dispatch } from 'src/store'

export function signupFetchStart(state) {
  fetchingStart(state)
  state.signup.loading.signup = true
}

export function signupFetchEnd(state) {
  fetchingEnd(state)
  state.signup.loading.signup = false
  state.signup.showCheckEmailMessage = true
}

export function signupFetchError(state, error) {
  fetchingEnd(state)
  state.signup.loading.signup = false
  errorSet(state, { show: true, error })
}

export function onSignupClick(state, { creds }) {
  setTimeout(() => dispatch(signupFetch(creds)), 0)
}

export function confirmFetchStart(state) {
  fetchingStart(state)
  state.signup.confirmStatus = 'loading'
}

export function confirmFetchEnd(state) {
  fetchingEnd(state)
  state.signup.confirmStatus = 'success'
}

export function confirmFetchError(state, error) {
  fetchingEnd(state)
  state.signup.confirmStatus = 'fail'
  errorSet(state, { show: true, error })
}

export function onConfirm(state, { confirmationToken }) {
  setTimeout(() => dispatch(confirmFetch(confirmationToken)), 0)
}

const modifiers = {
  signupFetchStart,
  signupFetchEnd,
  signupFetchError,
  onSignupClick,
  confirmFetchStart,
  confirmFetchEnd,
  confirmFetchError,
  onConfirm,
}

export const signupReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
