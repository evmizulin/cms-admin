import React, { Component } from 'react'
import { func, string, shape } from 'prop-types'
import { DialogActions } from 'src/lib/components/DialogActions'
import { DialogContent } from 'src/lib/components/DialogContent'
import { Button } from 'src/lib/components/Button'
import { validate } from 'src/lib/services/Validator'
import { TextField } from 'src/lib/components/fields/TextField'

export class TokenDialogInner extends Component {
  static propTypes = {
    token: shape({
      name: string.isRequired,
    }),
    onDone: func.isRequired,
    onClose: func.isRequired,
  }

  static defaultProps = {
    token: null,
  }

  constructor(props) {
    super(props)
    const { token } = props
    this.state = {
      name: token ? token.name : '',
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
    const { onDone, token } = this.props
    const { name } = this.state
    const valid = this.validate()
    if (valid) {
      onDone(
        token
          ? {
              id: token.id,
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
            label="Api key name"
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
