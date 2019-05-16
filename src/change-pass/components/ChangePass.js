import React, { Component } from 'react'
import { func, bool, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { Loader } from 'src/global/components/Loader'
import { TextField } from 'src/lib/components/fields/TextField'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { validate } from 'src/lib/services/Validator'
import { MessageBlock } from 'src/lib/components/MessageBlock'
import { onDone } from 'src/change-pass/actions/onDone'
import { PageContainer } from 'src/lib/components/PageContainer'
import { routes } from 'src/lib/services/Routes'
import { Link } from 'react-router-dom'

class AChangePass extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        recoveryToken: string.isRequired,
      }).isRequired,
    }).isRequired,
    onDone: func.isRequired,
    loading: bool.isRequired,
    showMessage: bool.isRequired,
  }

  state = {
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
    const { onDone, match } = this.props
    const { password } = this.state
    const valid = this.validate(['password', 'passwordAgain'])
    const validMatch = this.validateMatch()
    if (valid && validMatch) {
      onDone({ password, recoveryToken: match.params.recoveryToken })
    }
  }

  render() {
    const { loading, showMessage } = this.props
    const { password, passwordError, passwordAgain, passwordAgainError } = this.state
    return (
      <PageContainer>
        <RedirectContainer />
        <ErrorContainer />
        <Loader />
        <div className="p-xxl text-center">
          <MessageBlock>
            {showMessage ? (
              <span>
                Your password has been successfully updated. Now you are able to{' '}
                <Link to={routes.login()}>sign in</Link>.
              </span>
            ) : (
              <div>
                <Typography type="md" className="pb-sm">
                  New password
                </Typography>
                <div className="pb-sm">
                  <TextField
                    label="New password"
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
                <div className={`pt-lg text-smaller-xs`}>
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

export const ChangePass = connect(
  state => ({
    loading: state.changePass.loading.post,
    showMessage: state.changePass.showMessage,
  }),
  dispatch => ({
    onDone: (...props) => dispatch(onDone(...props)),
  })
)(AChangePass)
