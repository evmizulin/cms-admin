import React, { Component } from 'react'
import { string } from 'prop-types'
import { Redirect } from 'src/global/components/Redirect'
import { connect } from 'react-redux'

class ARedirectContainer extends Component {
  static propTypes = {
    redirect: string.isRequired,
  }

  render() {
    const { redirect } = this.props
    return !redirect ? null : <Redirect to={redirect} />
  }
}

export const RedirectContainer = connect(
  state => ({
    redirect: state.global.redirect,
  }),
  dispatch => ({})
)(ARedirectContainer)
