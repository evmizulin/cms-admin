import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf } from 'prop-types'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { StringModelType } from 'src/lib/types/models/StringModelType'
import { StringSubmodelType } from 'src/lib/types/models/StringSubmodelType'
import { TextInput } from 'src/lib/components/controls/TextInput'

export class StringLineControl extends Component {
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
        <TextInput onChange={onStringChange} onBlur={onBlur} value={value} disabled={disabled} />
      </ControlContainer>
    )
  }
}
