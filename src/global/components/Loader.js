import React, { Component } from 'react'
import { cn } from 'src/global/components/Loader.style'
import { LinearProgress } from 'src/lib/components/LinearProgress'
import { connect } from 'react-redux'
import { arrayOf, bool } from 'prop-types'

export class ALoader extends Component {
  static propTypes = {
    loading: arrayOf(bool).isRequired,
  }

  render() {
    const { loading } = this.props
    return loading.some(bool => bool) ? (
      <div className={cn.loader}>
        <LinearProgress light />
      </div>
    ) : null
  }
}

export const Loader = connect(
  state => ({
    loading: state.global.loading,
  }),
  dispatch => ({})
)(ALoader)
