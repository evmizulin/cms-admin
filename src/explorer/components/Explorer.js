import React, { Component } from 'react'
// import { arrayOf, func, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import SwaggerUI from 'swagger-ui'
// import { exampleConfig } from './exampleConfig'
import { config } from './config'

class AExplorer extends Component {
  static propTypes = {}

  id = `swagger-id-${Math.round(Math.random() * 1e9)}`

  componentDidMount() {
    const { id } = this
    SwaggerUI({
      dom_id: `#${id}`,
      spec: config,
    })
  }

  render() {
    const { id } = this
    return (
      <div className="pl-lg pb-lg pr-lg">
        <div id={id} />
      </div>
    )
  }
}

export const Explorer = connect(
  state => ({}),
  dispatch => ({})
)(AExplorer)
