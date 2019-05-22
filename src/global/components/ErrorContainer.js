import React, { Component } from 'react'
import { func, string, shape, bool } from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { setErrorAction } from 'src/global/actions/errorSet'

import { cn } from './ErrorContainer.style.js'

class AErrorContainer extends Component {
  static propTypes = {
    errorSet: func.isRequired,
    error: shape({
      show: bool.isRequired,
      message: string.isRequired,
    }).isRequired,
  }

  render() {
    const { error, errorSet } = this.props
    return (
      <Snackbar
        className={cn.errorAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={error.show}
        onRequestClose={() => errorSet(false)}
        message={<span>{error.message}</span>}
      />
    )
  }
}

export const ErrorContainer = connect(
  state => ({
    error: state.global.error,
  }),
  dispatch => ({
    errorSet: (...props) => dispatch(setErrorAction(...props)),
  })
)(AErrorContainer)
