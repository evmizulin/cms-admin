import clone from 'clone'
import { state } from './state'
import { globalReducer } from 'src/global/reducer'
import { modelsReducer } from 'src/models/reducer'
import { entriesReducer } from 'src/entries/reducer'
import { projectsReducer } from 'src/projects/reducer'
import { loginReducer } from 'src/login/reducer'
import { registrationReducer } from 'src/registration/reducer'
import { emailConfirmReducer } from 'src/email-confirm/reducer'
import { recoverPassReducer } from 'src/recover-pass/reducer'
import { changePassReducer } from 'src/change-pass/reducer'
import { tokensReducer } from 'src/tokens/reducer'
import { contactsReducer } from 'src/contacts/reducer'

const initialState = state()

const MAP = {
  global: globalReducer,
  models: modelsReducer,
  entries: entriesReducer,
  projects: projectsReducer,
  login: loginReducer,
  registration: registrationReducer,
  emailConfirm: emailConfirmReducer,
  recoverPass: recoverPassReducer,
  changePass: changePassReducer,
  tokens: tokensReducer,
  contacts: contactsReducer,
}

export const reducer = (oldState = initialState, action) => {
  const state = clone(oldState)
  const widget = action.widget
  if (widget) {
    MAP[widget](state, action)
  }
  return state
}
