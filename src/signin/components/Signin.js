import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { Loader } from 'src/global/components/Loader'
import { TextField } from 'src/lib/components/fields/TextField'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { validate } from 'src/lib/services/Validator'
import { onDone } from 'src/signin/actions/onDone'
import { MessageBlock } from 'src/lib/components/MessageBlock'
import { routes } from 'src/lib/services/Routes'
import { PageContainer } from 'src/lib/components/PageContainer'

import { cn } from 'src/signin/components/Signin.style'

class ASignin extends Component {
  static propTypes = {
    onDone: func.isRequired,
    loading: bool.isRequired,
  }

  state = {
    login: '',
    loginError: '',
    password: '',
    passwordError: '',
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

  validate(fields) {
    const { state } = this
    const valid = fields
      .map(item => {
        const { valid, errors } = validate(state[item], { type: 'string', minLength: 1 })
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
    const valid = this.validate(['login', 'password'])
    if (valid) {
      onDone({ login, password })
    }
  }

  render() {
    const { login, loginError, password, passwordError } = this.state
    const { loading } = this.props
    return (
      <PageContainer dataTestAtr="page-signin">
        <RedirectContainer />
        <ErrorContainer />
        <Loader />
        <div className="text-center p-xxl">
          <MessageBlock>
            <Typography type="md" className="pb-sm">
              Sign in
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
            </div>
            <Button onClick={() => this.onDone()} color="primary" filled disabled={loading}>
              Submit
            </Button>
            <div className={`pt-lg ${cn.link}`}>
              <div>
                <Link to={routes.signup()}>Create an account</Link>
              </div>
              <div>
                <Link to={routes.recoverPass()}>Forgot your password?</Link>
              </div>
            </div>
          </MessageBlock>
        </div>
      </PageContainer>
    )
  }
}

export const Signin = connect(
  state => ({
    loading: state.signin.loading.post,
  }),
  dispatch => ({
    onDone: (...props) => dispatch(onDone(...props)),
  })
)(ASignin)
