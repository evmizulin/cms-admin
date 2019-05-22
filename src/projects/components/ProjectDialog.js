import React, { Component } from 'react'
import { func, bool, string, object } from 'prop-types'
import { Dialog } from 'src/lib/components/Dialog'
import { ProjectDialogInner } from 'src/projects/components/ProjectDialogInner'

export class ProjectDialog extends Component {
  static propTypes = {
    project: object,
    title: string.isRequired,
    mount: bool.isRequired,
    open: bool.isRequired,
    onDone: func.isRequired,
    onClose: func.isRequired,
    onExited: func.isRequired,
  }

  static defaultProps = {
    project: null,
  }

  render() {
    const { mount, project, open, onClose, onDone, title, onExited } = this.props
    if (!mount) return null
    return (
      <Dialog open={open} onClose={onClose} title={title} onExited={onExited} maxWidth="md">
        <ProjectDialogInner project={project} onDone={onDone} onClose={onClose} />
      </Dialog>
    )
  }
}
