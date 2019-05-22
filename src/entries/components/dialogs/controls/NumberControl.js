import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf, number } from 'prop-types'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { NumberModelType } from 'src/lib/types/models/NumberModelType'
import { NumberSubmodelType } from 'src/lib/types/models/NumberSubmodelType'
import { TextInput } from 'src/lib/components/controls/TextInput'
import { valueAsNumber } from 'src/lib/helpers/valueAsNumber'

export class NumberControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(NumberModelType), instanceOf(NumberSubmodelType)]).isRequired,
    value: oneOfType([string, number]).isRequired,
    error: string.isRequired,
    onNumberChange: func.isRequired,
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
      onNumberChange,
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
        <TextInput
          onChange={onNumberChange}
          onBlur={onBlur}
          value={valueAsNumber(value)}
          disabled={disabled}
        />
      </ControlContainer>
    )
  }
}
