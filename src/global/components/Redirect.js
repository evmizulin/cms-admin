import React, { Component } from 'react'
import { func } from 'prop-types'
import { Redirect as ReactRedirect } from 'react-router'
import { connect } from 'react-redux'
import { redirectSetAction } from 'src/global/actions/redirectSet'

class ARedirect extends Component {
  static propTypes = {
    redirectSet: func.isRequired,
  }

  componentDidMount() {
    const { redirectSet } = this.props
    redirectSet('')
  }

  render() {
    const { redirectSet, ...props } = this.props
    return <ReactRedirect {...props} />
  }
}

export const Redirect = connect(
  state => ({}),
  dispatch => ({
    redirectSet: (...props) => dispatch(redirectSetAction(...props)),
  })
)(ARedirect)
