import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { Loader } from 'src/global/components/Loader'
import { TextField } from 'src/lib/components/fields/TextField'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { validate } from 'src/lib/services/Validator'
import { MessageBlock } from 'src/lib/components/MessageBlock'
import { onDone } from 'src/registration/actions/onDone'
import { routes } from 'src/lib/services/Routes'
import { Link } from 'react-router-dom'
import { PageContainer } from 'src/lib/components/PageContainer'

import { cn } from './Registration.style'

class ARegistration extends Component {
  static propTypes = {
    onDone: func.isRequired,
    loading: bool.isRequired,
    showMessage: bool.isRequired,
  }

  state = {
    login: '',
    loginError: '',
    password: '',
    passwordError: '',
    passwordAgain: '',
    passwordAgainError: '',
  }

  onChange(field, value) {
    const { state } = this
    state[field] = value
    state[`${field}Error`] = ''
    this.setState(state)
  }

  onBlur(field) {
    this.validate([field])
  }

  validateMatch() {
    const { state } = this
    const valid = state.password === state.passwordAgain
    if (!valid) {
      state.passwordAgainError = "Don't match"
    }
    this.setState(state)
    return valid
  }

  validate(fields) {
    const { state } = this
    const MAP = {
      login: 1,
      password: 6,
      passwordAgain: 0,
    }
    const valid = fields
      .map(item => {
        const { valid, errors } = validate(state[item], { type: 'string', minLength: MAP[item] })
        if (!valid) {
          state[`${item}Error`] = errors[0].message
        }
        return valid
      })
      .every(item => item)
    this.setState(state)
    return valid
  }

  onDone() {
    const { onDone } = this.props
    const { login, password } = this.state
    const valid = this.validate(['login', 'password', 'passwordAgain'])
    const validMatch = this.validateMatch()
    if (valid && validMatch) {
      onDone({ login, password })
    }
  }

  render() {
    const { loading, showMessage } = this.props
    const { login, loginError, password, passwordError, passwordAgain, passwordAgainError } = this.state
    return (
      <PageContainer>
        <RedirectContainer />
        <ErrorContainer />
        <Loader />
        <div className="p-xxl text-center">
          <MessageBlock>
            {showMessage ? (
              <span>
                We sent you an email to verify your email address (check your spam folder if you did not
                receive this email). After verification you will be able to{' '}
                <Link to={routes.login()}>sign in</Link>.
              </span>
            ) : (
              // 'Please click on the link in this email to activate your
              // Philips account and to verify your email address. '
              <div>
                <Typography type="md" className="pb-sm">
                  Sign up
                </Typography>
                <div className="pb-sm">
                  <TextField
                    label="E-mail"
                    onChange={value => this.onChange('login', value)}
                    onBlur={() => this.onBlur('login')}
                    value={login}
                    error={!!loginError}
                    helperText={loginError || ''}
                  />
                  <TextField
                    label="Password"
                    onChange={value => this.onChange('password', value)}
                    onBlur={() => this.onBlur('password')}
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError || ''}
                    type={'password'}
                  />
                  <TextField
                    label="Confirm password"
                    onChange={value => this.onChange('passwordAgain', value)}
                    onBlur={() => this.onBlur('passwordAgain')}
                    value={passwordAgain}
                    error={!!passwordAgainError}
                    helperText={passwordAgainError || ''}
                    type={'password'}
                  />
                </div>
                <Button onClick={() => this.onDone()} color="primary" filled disabled={loading}>
                  Submit
                </Button>
                <div className={`pt-lg ${cn.link}`}>
                  <div>
                    <span>Have an account?</span> <Link to={routes.login()}>Sign in</Link>
                  </div>
                  <div>
                    <Link to={routes.recoverPass()}>Forgot your password?</Link>
                  </div>
                </div>
              </div>
            )}
          </MessageBlock>
        </div>
      </PageContainer>
    )
  }
}

export const Registration = connect(
  state => ({
    loading: state.registration.loading.post,
    showMessage: state.registration.showMessage,
  }),
  dispatch => ({
    onDone: (...props) => dispatch(onDone(...props)),
  })
)(ARegistration)
