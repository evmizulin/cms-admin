import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/email-confirm/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.emailConfirm.status = 'loading'
}

export function postEnd(state) {
  fetchingEnd(state)
  state.emailConfirm.status = 'success'
}

export function postError(state, error) {
  fetchingEnd(state)
  state.emailConfirm.status = 'fail'
  errorSet(state, { show: true, error })
}

export function onConfirm(state, { activationToken }) {
  setTimeout(() => dispatch(postAction(activationToken)), 0)
}

const modifiers = {
  postStart,
  postEnd,
  postError,
  onConfirm,
}

export const emailConfirmReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
