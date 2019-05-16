import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf, any } from 'prop-types'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { Select } from 'src/lib/components/controls/Select'
import { ReferenceModelType } from 'src/lib/types/models/ReferenceModelType'
import { ReferenceSubmodelType } from 'src/lib/types/models/ReferenceSubmodelType'

export class ReferenceControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(ReferenceModelType), instanceOf(ReferenceSubmodelType)]).isRequired,
    value: any,
    error: string.isRequired,
    options: any.isRequired,
    onSelectChange: func.isRequired,
    onBlur: func.isRequired,
    disabled: bool,
    propBtnStatus: string,
    onPropBtnStatusChange: func,
    onItemDelete: func,
    onItemUp: func,
    onItemDown: func,
  }

  static defaultProps = {
    value: null,
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
      options,
      onSelectChange,
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
        <Select
          options={options}
          onChange={onSelectChange}
          onBlur={onBlur}
          value={value}
          placeholder="Select a value"
          disabled={disabled}
        />
      </ControlContainer>
    )
  }
}
