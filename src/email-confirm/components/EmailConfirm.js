import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { func, shape, oneOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { onConfirm } from 'src/email-confirm/actions/onConfirm'
import { MessageBlock } from 'src/lib/components/MessageBlock'
import { routes } from 'src/lib/services/Routes'
import { CircularProgress } from 'src/lib/components/CircularProgress'
import { PageContainer } from 'src/lib/components/PageContainer'

class AEmailConfirm extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        confirmationToken: string.isRequired,
      }).isRequired,
    }).isRequired,
    onConfirm: func.isRequired,
    status: oneOf(['loading', 'success', 'fail']).isRequired,
  }

  componentDidMount() {
    const { match, onConfirm } = this.props
    onConfirm(match.params.confirmationToken)
  }

  render() {
    const { status } = this.props
    if (status === 'loading') {
      return (
        <div className="loader-page-container">
          <CircularProgress size={100} />
        </div>
      )
    }
    return (
      <PageContainer>
        <RedirectContainer />
        <ErrorContainer />
        <div className="p-xxl text-center">
          <MessageBlock>
            {status === 'success' ? (
              <span>
                Email address verified. Now you are able to <Link to={routes.login()}>sign in</Link>.
              </span>
            ) : (
              <span>
                Something went wrong. Try to reload page or try to <Link to={routes.signup()}>sign up</Link>{' '}
                once again.
              </span>
            )}
          </MessageBlock>
        </div>
      </PageContainer>
    )
  }
}

export const EmailConfirm = connect(
  state => ({
    status: state.emailConfirm.status,
  }),
  dispatch => ({
    onConfirm: (...props) => dispatch(onConfirm(...props)),
  })
)(AEmailConfirm)
