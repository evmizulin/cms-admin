import React from 'react'
import { BrowserRouter, MemoryRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import { Redirect } from 'src/global/components/Redirect'

import { Container } from 'src/global/components/Container'
import { Index } from 'src/index/components/Index'
import { NotFound } from 'src/not-found/components/NotFound'
import { Models } from 'src/models/components/Models'
import { Entries } from 'src/entries/components/Entries'
import { Projects } from 'src/projects/components/Projects'
import { Signin } from 'src/signin/components/Signin'
import { Signup } from 'src/signup/components/Signup'
import { SignupConfirm } from 'src/signup/components/SignupConfirm'
import { RecoverPass } from 'src/recover-pass/components/RecoverPass'
import { ChangePass } from 'src/change-pass/components/ChangePass'
import { Tokens } from 'src/tokens/components/Tokens'
import { Explorer } from 'src/explorer/components/Explorer'
import { Landing } from 'src/landing/components/Landing'
import { Contacts } from 'src/contacts/components/Contacts'
import { auth } from 'src/lib/services/Auth'
import { config } from 'src/config'

import './App.css'
import './App.style'

// eslint-disable-next-line react/prop-types
const Router = ({ url, children, ...props }) => {
  if (config.useMemoryRouter)
    return (
      <MemoryRouter initialEntries={[url]} initialIndex={0} {...props}>
        {children}
      </MemoryRouter>
    )

  return <BrowserRouter {...props}>{children}</BrowserRouter>
}

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (auth.isSet() ? <Component {...props} /> : <Redirect to="/signin" />)} />
)

// eslint-disable-next-line react/prop-types
const UnauthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!auth.isSet() ? <Component {...props} /> : <Redirect to="/projects" />)}
  />
)

// eslint-disable-next-line react/prop-types
export const App = ({ url }) => (
  <Provider store={store}>
    <Router url={url}>
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
        <UnauthRoute exact path="/signin" component={Signin} />
        <UnauthRoute exact path="/signup" component={Signup} />
        <UnauthRoute exact path="/signup/confirmation/:confirmationToken" component={SignupConfirm} />
        <UnauthRoute exact path="/recover-pass" component={RecoverPass} />
        <UnauthRoute exact path="/change-pass/:recoveryToken" component={ChangePass} />
        <UnauthRoute exact path="/contacts" component={Contacts} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)
