import React, { Component } from 'react'
import { shape, arrayOf, string, func, object, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'material-ui'
import { Typography } from 'src/lib/components/Typography'
import Avatar from 'material-ui/Avatar'
import { Button } from 'src/lib/components/Button'
import { Icon } from 'src/lib/components/Icon'
import { colors } from 'src/colors'
import { deleteAction } from 'src/projects/actions/deleteAction'
import { getAction } from 'src/projects/actions/getAction'
import { onAddDialogDone } from 'src/projects/actions/onAddDialogDone'
import { onAddProject } from 'src/projects/actions/onAddProject'
import { onConfirmDialogConfirm } from 'src/projects/actions/onConfirmDialogConfirm'
import { onDeleteProject } from 'src/projects/actions/onDeleteProject'
import { onDialogClose } from 'src/projects/actions/onDialogClose'
import { onDialogExited } from 'src/projects/actions/onDialogExited'
import { onEditDialogDone } from 'src/projects/actions/onEditDialogDone'
import { onEditProject } from 'src/projects/actions/onEditProject'
import { postAction } from 'src/projects/actions/postAction'
import { putAction } from 'src/projects/actions/putAction'
import { CircularProgress } from 'src/lib/components/CircularProgress'
import { Loader } from 'src/global/components/Loader'
import { ConfirmDialog } from 'src/projects/components/ConfirmDialog'
import { ProjectDialog } from 'src/projects/components/ProjectDialog'
import { redirectSetAction } from 'src/global/actions/redirectSet'
import { routes } from 'src/lib/services/Routes'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { onLogoutClick } from 'src/projects/actions/onLogoutClick'
import { PageContainer } from 'src/lib/components/PageContainer'

import { cn } from './Projects.style'

class AProjects extends Component {
  static propTypes = {
    projects: arrayOf(
      shape({
        id: string.isRequired,
        name: string.isRequired,
        image: string.isRequired,
      })
    ).isRequired,
    dialogs: shape({
      confirm: object.isRequired,
      add: object.isRequired,
      edit: object.isRequired,
    }).isRequired,
    loading: shape({
      initialGet: bool.isRequired,
    }).isRequired,
    getAction: func.isRequired,
    onAddDialogDone: func.isRequired,
    onAddProject: func.isRequired,
    onConfirmDialogConfirm: func.isRequired,
    onDeleteProject: func.isRequired,
    onDialogClose: func.isRequired,
    onDialogExited: func.isRequired,
    onEditDialogDone: func.isRequired,
    onEditProject: func.isRequired,
    redirectSet: func.isRequired,
    onLogoutClick: func.isRequired,
  }

  componentDidMount() {
    const { getAction } = this.props
    getAction()
  }

  render() {
    const {
      loading,
      projects,
      dialogs,
      onConfirmDialogConfirm,
      onDialogClose,
      onDialogExited,
      onDeleteProject,
      onAddDialogDone,
      onAddProject,
      onEditDialogDone,
      onEditProject,
      redirectSet,
      onLogoutClick,
    } = this.props
    if (loading.initialGet) {
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
        <Loader />
        <div className="pt-sm pr-xxl pb-xxl pl-xxl">
          <div className="text-right pb-md">
            <Button onClick={onLogoutClick} color="primary" filled>
              Logout
            </Button>
          </div>
          <ConfirmDialog
            title="Delete project?"
            text="Are you sure you want to delete model? All data related to this project will be lost."
            open={dialogs.confirm.show}
            mount={dialogs.confirm.mount}
            onDone={() => onConfirmDialogConfirm()}
            onClose={() => onDialogClose('confirm')}
            onExited={() => onDialogExited('confirm')}
          />
          <ProjectDialog
            title="Create new project"
            mount={dialogs.add.mount}
            open={dialogs.add.show}
            onDone={onAddDialogDone}
            onClose={() => onDialogClose('add')}
            onExited={() => onDialogExited('add')}
          />
          <ProjectDialog
            project={dialogs.edit.project}
            title="Edit project"
            mount={dialogs.edit.mount}
            open={dialogs.edit.show}
            onDone={onEditDialogDone}
            onClose={() => onDialogClose('edit')}
            onExited={() => onDialogExited('edit')}
          />
          <Grid container spacing={16}>
            {projects.map(project => (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <div className={cn.card}>
                  <div className={cn.cardBody} onClick={() => redirectSet(routes.index(project.id))}>
                    <Avatar src={project.image} alt="Project avatar" className={cn.avatar} />
                    <div className="mt-md pt-sm">
                      <Typography type="lg" className="text-one-line">
                        {project.name}
                      </Typography>
                    </div>
                  </div>
                  <div className={cn.cardFooter}>
                    <Grid container spacing={8}>
                      <Grid item xs={12} sm={6}>
                        <div className="text-center">
                          <Button size="md" onClick={() => onEditProject(project)}>
                            Edit
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="text-center">
                          <Button size="md" onClick={() => onDeleteProject(project.id)} color="accent">
                            Delete
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={3}>
              <div className={cn.newProjectCard} onClick={() => onAddProject()}>
                <div className={cn.newProjectCardInner}>
                  <Icon type="projects-add" color={colors.black.t3} size={100} />
                  <div className="pt-md">
                    <div className={cn.newProjectText}>Create new project</div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </PageContainer>
    )
  }
}

export const Projects = connect(
  state => ({
    projects: state.projects.data,
    loading: state.projects.loading,
    dialogs: state.projects.dialogs,
  }),
  dispatch => ({
    deleteAction: (...props) => dispatch(deleteAction(...props)),
    getAction: (...props) => dispatch(getAction(...props)),
    onAddDialogDone: (...props) => dispatch(onAddDialogDone(...props)),
    onAddProject: (...props) => dispatch(onAddProject(...props)),
    onConfirmDialogConfirm: (...props) => dispatch(onConfirmDialogConfirm(...props)),
    onDeleteProject: (...props) => dispatch(onDeleteProject(...props)),
    onDialogClose: (...props) => dispatch(onDialogClose(...props)),
    onDialogExited: (...props) => dispatch(onDialogExited(...props)),
    onEditDialogDone: (...props) => dispatch(onEditDialogDone(...props)),
    onEditProject: (...props) => dispatch(onEditProject(...props)),
    postAction: (...props) => dispatch(postAction(...props)),
    putAction: (...props) => dispatch(putAction(...props)),
    redirectSet: (...props) => dispatch(redirectSetAction(...props)),
    onLogoutClick: (...props) => dispatch(onLogoutClick(...props)),
  })
)(AProjects)
