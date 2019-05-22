import React, { Component } from 'react'
import { node, func, string, bool, array } from 'prop-types'
import { Menu } from 'src/global/components/Menu'
import { Redirect } from 'src/global/components/Redirect'
import { connect } from 'react-redux'
import { redirectSetAction } from 'src/global/actions/redirectSet'
import { getDataAction } from 'src/global/actions/getData'
import { CircularProgress } from 'src/lib/components/CircularProgress'
import { projectIdSet } from 'src/global/actions/projectIdSet'
import { routes } from 'src/lib/services/Routes'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'

class AContainer extends Component {
  static propTypes = {
    projectId: string.isRequired,
    children: node.isRequired,
    projectIdSet: func.isRequired,
    redirectSet: func.isRequired,
    get: func.isRequired,
    models: array.isRequired,
    entries: array.isRequired,
    projects: array.isRequired,
    conflicts: array.isRequired,
    modelsInitLoading: bool.isRequired,
    entriesInitLoading: bool.isRequired,
    projectsInitLoading: bool.isRequired,
  }

  componentDidMount() {
    const { get, projectIdSet, projectId } = this.props
    projectIdSet(projectId)
    get(projectId)
  }

  render() {
    const {
      children,
      redirectSet,
      modelsInitLoading,
      entriesInitLoading,
      projectsInitLoading,
      models,
      entries,
      conflicts,
      projectId,
      projects,
    } = this.props
    if (modelsInitLoading || entriesInitLoading || projectsInitLoading) {
      return (
        <div className="loader-page-container">
          <CircularProgress size={100} />
        </div>
      )
    }
    const project = projects.find(project => project.id === projectId)
    if (!project) return <Redirect to={routes.notFound()} />
    return (
      <Menu
        redirectSet={redirectSet}
        models={models}
        entries={entries}
        conflicts={conflicts}
        projectId={projectId}
        project={project}
      >
        {children}
        <ErrorContainer />
        <RedirectContainer />
      </Menu>
    )
  }
}

export const Container = connect(
  (state, ownProps) => ({
    models: state.models.data,
    modelsInitLoading: state.models.loading.initialGet,
    entries: state.entries.data,
    entriesInitLoading: state.entries.loading.initialGet,
    projectsInitLoading: state.projects.loading.initialGet,
    conflicts: state.entries.conflicts,
    projects: state.projects.data,
    projectId: ownProps.projectId,
  }),
  dispatch => ({
    projectIdSet: (...props) => dispatch(projectIdSet(...props)),
    redirectSet: (...props) => dispatch(redirectSetAction(...props)),
    get: (...props) => dispatch(getDataAction(...props)),
  })
)(AContainer)
