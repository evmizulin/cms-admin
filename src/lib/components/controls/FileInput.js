import React, { Component } from 'react'
import { func, string, bool } from 'prop-types'
import { Button } from 'src/lib/components/Button'

export class FileInput extends Component {
  static propTypes = {
    onChange: func.isRequired,
    onReset: func.isRequired,
    value: string,
    disabled: bool,
    downloadLink: string,
  }

  id = `file-input-id-${Math.round(Math.random() * 1e9)}`

  static defaultProps = {
    value: '',
    disabled: false,
    downloadLink: null,
  }

  onClick(event) {
    const { id } = this
    document.getElementById(id).click()
  }

  onChange(event) {
    const { onChange } = this.props
    onChange(event.target.files && event.target.files.length ? event.target.files[0] : null)
  }

  onReset() {
    const { onReset } = this.props
    const { id } = this
    document.getElementById(id).value = ''
    onReset()
  }

  render() {
    const { value, disabled, downloadLink } = this.props
    const { id } = this
    return (
      <div>
        {disabled ? (
          <div className={`pb-sm text-disabled`}>File: {value || 'no file'}</div>
        ) : downloadLink && value ? (
          <div className={`pb-sm`}>
            File:{' '}
            <a href={downloadLink} download target="_blank">
              {value}
            </a>
          </div>
        ) : (
          <div className={`pb-sm`}>File: {value || 'no file'}</div>
        )}
        <div>
          <input style={{ display: 'none' }} type="file" id={id} onChange={event => this.onChange(event)} />
          <span className="pr-xs">
            <Button
              onClick={event => this.onClick(event)}
              disabled={disabled}
              color="primary"
              filled
              size="md"
            >
              Select file
            </Button>
          </span>
          <Button onClick={() => this.onReset()} disabled={disabled} size="md" outlined>
            Reset
          </Button>
        </div>
      </div>
    )
  }
}
