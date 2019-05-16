import { errorSet, fetchingStart, fetchingEnd } from 'src/global/reducer'
import { postAction } from 'src/contacts/actions/post'
import { dispatch } from 'src/store'

export function postStart(state) {
  fetchingStart(state)
  state.contacts.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.contacts.loading.post = false
  state.contacts.status = 'success'
}

export function postError(state, error) {
  fetchingEnd(state)
  state.contacts.loading.post = false
  errorSet(state, { show: true, error })
}

export function onDone(state, { contact }) {
  setTimeout(() => dispatch(postAction(contact)), 0)
}

const modifiers = {
  postStart,
  postEnd,
  postError,
  onDone,
}

export const contactsReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
