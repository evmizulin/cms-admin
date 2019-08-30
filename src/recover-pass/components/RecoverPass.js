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
import { onDone } from 'src/recover-pass/actions/onDone'
import { PageContainer } from 'src/lib/components/PageContainer'
import { routes } from 'src/lib/services/Routes'
import { Link } from 'react-router-dom'

class ARecoverPass extends Component {
  static propTypes = {
    onDone: func.isRequired,
    loading: bool.isRequired,
    showMessage: bool.isRequired,
  }

  state = {
    login: '',
    loginError: '',
  }

  onChange(value) {
    const { state } = this
    state.login = value
    state.loginError = ''
    this.setState(state)
  }

  onBlur() {
    this.validate()
  }

  validate() {
    const { state } = this
    const { valid, errors } = validate(state.login, { type: 'string', minLength: 1 })
    if (!valid) {
      state.loginError = errors[0].message
    }
    this.setState(state)
    return valid
  }

  onDone() {
    const { onDone } = this.props
    const { login } = this.state
    const valid = this.validate()
    if (valid) {
      onDone({ login })
    }
  }

  render() {
    const { loading, showMessage } = this.props
    const { login, loginError } = this.state
    return (
      <PageContainer>
        <RedirectContainer />
        <ErrorContainer />
        <Loader />
        <div className="p-xxl text-center">
          <MessageBlock>
            {showMessage ? (
              <span>
                We sent password recovery link to your email (check spam folder if you did not receive this
                email).
              </span>
            ) : (
              // 'Please click on the link in this email to activate your
              // Philips account and to verify your email address. '
              <div>
                <Typography type="md" className="pb-sm">
                  Password recovery
                </Typography>
                <div className="pb-sm">
                  <TextField
                    label="E-mail"
                    onChange={value => this.onChange(value)}
                    onBlur={() => this.onBlur()}
                    value={login}
                    error={!!loginError}
                    helperText={loginError || ''}
                  />
                </div>
                <Button onClick={() => this.onDone()} color="primary" filled disabled={loading}>
                  Submit
                </Button>
                <div className={`pt-lg text-smaller-xs`}>
                  <div>
                    <Link to={routes.signup()}>Create an account</Link>
                  </div>
                  <div>
                    <span>Have an account?</span> <Link to={routes.login()}>Sign in</Link>
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

export const RecoverPass = connect(
  state => ({
    loading: state.recoverPass.loading.post,
    showMessage: state.recoverPass.showMessage,
  }),
  dispatch => ({
    onDone: (...props) => dispatch(onDone(...props)),
  })
)(ARecoverPass)
