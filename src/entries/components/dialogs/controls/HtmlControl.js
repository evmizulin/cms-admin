import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf } from 'prop-types'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { StringModelType } from 'src/lib/types/models/StringModelType'
import { StringSubmodelType } from 'src/lib/types/models/StringSubmodelType'
import { CodeEditor } from 'src/lib/components/controls/CodeEditor'

export class HtmlControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(StringModelType), instanceOf(StringSubmodelType)]).isRequired,
    value: string.isRequired,
    error: string.isRequired,
    onStringChange: func.isRequired,
    onBlur: func.isRequired,
    disabled: bool,
    propBtnStatus: string,
    onPropBtnStatusChange: func,
    onItemDelete: func,
    onItemUp: func,
    onItemDown: func,
  }

  static defaultProps = {
    /* if it is object prop */
    disabled: false,
    onPropBtnStatusChange: null,
    propBtnStatus: null,
    /* if it is array item */
    onItemDelete: null,
    onItemUp: null,
    onItemDown: null,
  }

  render() {
    const {
      model,
      value,
      error,
      onStringChange,
      onBlur,
      disabled,
      propBtnStatus,
      onPropBtnStatusChange,
      onItemDelete,
      onItemUp,
      onItemDown,
    } = this.props
    return (
      <ControlContainer
        title={model.title}
        description={model.description}
        error={error}
        labels={[model.type]}
        type={model.type}
        noBodyPedding={true}
        disabled={disabled}
        propBtnStatus={propBtnStatus}
        onPropBtnStatusChange={onPropBtnStatusChange}
        onItemDelete={onItemDelete}
        onItemUp={onItemUp}
        onItemDown={onItemDown}
      >
        <CodeEditor
          onChange={onStringChange}
          onBlur={onBlur}
          language="html"
          initialValue={value}
          disabled={disabled}
        />
      </ControlContainer>
    )
  }
}
