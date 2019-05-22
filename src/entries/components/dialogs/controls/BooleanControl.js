import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf } from 'prop-types'
import { Switch } from 'src/lib/components/controls/Switch'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { BooleanModelType } from 'src/lib/types/models/BooleanModelType'
import { BooleanSubmodelType } from 'src/lib/types/models/BooleanSubmodelType'

export class BooleanControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(BooleanModelType), instanceOf(BooleanSubmodelType)]).isRequired,
    value: bool.isRequired,
    onBooleanChange: func.isRequired,
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
      onBooleanChange,
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
        <Switch checked={value} onChange={onBooleanChange} disabled={disabled} />
      </ControlContainer>
    )
  }
}
