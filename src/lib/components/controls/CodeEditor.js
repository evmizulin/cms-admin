import React, { Component } from 'react'
import { func, string, oneOf, bool } from 'prop-types'
import { cn } from './CodeEditor.style'
const monaco = window.monaco

class CodeEditorInner extends Component {
  static propTypes = {
    language: oneOf(['html', 'markdown']).isRequired,
    initialValue: string.isRequired,
    onChange: func.isRequired,
    onBlur: func.isRequired,
  }

  id = `editor-container-${Math.round(Math.random() * 1e9)}`

  componentDidMount() {
    const { initialValue, onChange, language } = this.props
    const { id } = this
    const editor = monaco.editor.create(document.getElementById(id), {
      value: initialValue,
      language: language,
    })
    editor.onDidChangeModelContent(event => {
      const value = editor.getValue()
      onChange(value)
    })
  }

  render() {
    const { onBlur } = this.props
    const { id } = this
    return <div className={cn.container} onBlur={onBlur} id={id} />
  }
}

export class CodeEditor extends Component {
  static propTypes = {
    disabled: bool,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const { disabled, ...props } = this.props
    return disabled ? <div className={cn.container} /> : <CodeEditorInner {...props} />
  }
}
