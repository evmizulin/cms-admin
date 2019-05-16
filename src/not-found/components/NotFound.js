import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Typography } from 'src/lib/components/Typography'
import { Button } from 'src/lib/components/Button'
import { redirectSetAction } from 'src/global/actions/redirectSet'
import { routes } from 'src/lib/services/Routes'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { PageContainer } from 'src/lib/components/PageContainer'

class ANotFound extends Component {
  static propTypes = {
    redirectSet: func.isRequired,
  }

  render() {
    const { redirectSet } = this.props
    return (
      <PageContainer>
        <div className="p-xxl">
          <RedirectContainer />
          <ErrorContainer />
          <Typography className="text-center" type="bigTransperent">
            Look like this page doesn't exist
            <div>
              <Button color="primary" onClick={() => redirectSet(routes.home())}>
                Go to home page
              </Button>
            </div>
          </Typography>
        </div>
      </PageContainer>
    )
  }
}

export const NotFound = connect(
  state => ({}),
  dispatch => ({
    redirectSet: (...props) => dispatch(redirectSetAction(...props)),
  })
)(ANotFound)
