import React, { Component } from 'react'
import { func, string, shape } from 'prop-types'
import { DialogActions } from 'src/lib/components/DialogActions'
import { DialogContent } from 'src/lib/components/DialogContent'
import { Button } from 'src/lib/components/Button'
import { validate } from 'src/lib/services/Validator'
import { TextField } from 'src/lib/components/fields/TextField'

export class ProjectDialogInner extends Component {
  static propTypes = {
    project: shape({
      name: string.isRequired,
    }),
    onDone: func.isRequired,
    onClose: func.isRequired,
  }

  static defaultProps = {
    project: null,
  }

  constructor(props) {
    super(props)
    const { project } = props
    this.state = {
      name: project ? project.name : '',
      error: '',
    }
  }

  onBlur() {
    this.validate()
  }

  validate() {
    const { name } = this.state
    const { valid, errors } = validate(name, { type: 'string', minLength: 1 })
    if (!valid) {
      this.setState({ error: errors[0].message })
    }
    return valid
  }

  onDone() {
    const { onDone, project } = this.props
    const { name } = this.state
    const valid = this.validate()
    if (valid) {
      onDone(
        project
          ? {
              id: project.id,
              name,
            }
          : { name }
      )
    }
  }

  render() {
    const { onClose } = this.props
    const { name, error } = this.state
    return (
      <div>
        <DialogContent>
          <TextField
            label="Project name"
            onChange={value => this.setState({ name: value, error: '' })}
            onBlur={() => this.onBlur()}
            value={name}
            error={!!error}
            helperText={error || ''}
          />
        </DialogContent>
        <DialogActions onClose={onClose}>
          <Button color="secondary" onClick={() => this.onDone()}>
            Done
          </Button>
        </DialogActions>
      </div>
    )
  }
}
