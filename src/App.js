import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import { Redirect } from 'src/global/components/Redirect'

import { Container } from 'src/global/components/Container'
import { Index } from 'src/index/components/Index'
import { NotFound } from 'src/not-found/components/NotFound'
import { Models } from 'src/models/components/Models'
import { Entries } from 'src/entries/components/Entries'
import { Projects } from 'src/projects/components/Projects'
import { Login } from 'src/login/components/Login'
import { Signup } from 'src/signup/components/Signup'
import { SignupConfirm } from 'src/signup/components/SignupConfirm'
import { RecoverPass } from 'src/recover-pass/components/RecoverPass'
import { ChangePass } from 'src/change-pass/components/ChangePass'
import { Tokens } from 'src/tokens/components/Tokens'
import { Explorer } from 'src/explorer/components/Explorer'
import { Landing } from 'src/landing/components/Landing'
import { Contacts } from 'src/contacts/components/Contacts'
import { auth } from 'src/lib/services/Auth'

import './App.css'
import './App.style'

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (auth.isSet() ? <Component {...props} /> : <Redirect to="/login" />)} />
)

// eslint-disable-next-line react/prop-types
const UnauthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!auth.isSet() ? <Component {...props} /> : <Redirect to="/projects" />)}
  />
)

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/projects" component={Projects} />
        <AuthRoute
          path="/projects/:projectId"
          component={props => (
            // eslint-disable-next-line react/prop-types
            <Container projectId={props.match.params.projectId}>
              <Switch>
                <Route exact path="/projects/:projectId" component={Index} />
                <Route exact path="/projects/:projectId/models" component={Models} />
                <Route exact path="/projects/:projectId/models/:modelId/entries" component={Entries} />
                <Route exact path="/projects/:projectId/keys" component={Tokens} />
                <Route exact path="/projects/:projectId/explorer" component={Explorer} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Container>
          )}
        />
        <UnauthRoute exact path="/" component={Landing} />
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/signup" component={Signup} />
        <UnauthRoute exact path="/signup/confirmation/:confirmationToken" component={SignupConfirm} />
        <UnauthRoute exact path="/recover-pass" component={RecoverPass} />
        <UnauthRoute exact path="/change-pass/:recoveryToken" component={ChangePass} />
        <UnauthRoute exact path="/contacts" component={Contacts} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
)
