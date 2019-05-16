import React, { Component } from 'react'
import { func, instanceOf, bool, arrayOf, shape, oneOfType, string } from 'prop-types'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import { ObjectSubmodelType } from 'src/lib/types/models/ObjectSubmodelType'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { ControlFactory } from 'src/entries/components/dialogs/ControlFactory'

import { cn } from './ObjectControl.style'

export class ObjectControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(ObjectModelType), instanceOf(ObjectSubmodelType)]).isRequired,
    controls: arrayOf(
      shape({
        exist: bool.isRequired,
        isRequired: bool.isRequired,
      })
    ).isRequired,
    onBooleanChangeDeep: func.isRequired,
    onStringChangeDeep: func.isRequired,
    onNumberChangeDeep: func.isRequired,
    onSelectChangeDeep: func.isRequired,
    onFileChangeDeep: func.isRequired,
    onFileResetDeep: func.isRequired,
    onBlurDeep: func.isRequired,
    onPropBtnStatusChangeDeep: func.isRequired,
    onItemDeleteDeep: func.isRequired,
    onItemAddDeep: func.isRequired,
    onItemUpDeep: func.isRequired,
    onItemDownDeep: func.isRequired,
    disabled: bool,
    onPropBtnStatusChange: func,
    propBtnStatus: string,
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
      controls,
      onBooleanChangeDeep,
      onStringChangeDeep,
      onNumberChangeDeep,
      onSelectChangeDeep,
      onFileChangeDeep,
      onFileResetDeep,
      onBlurDeep,
      onPropBtnStatusChange,
      onPropBtnStatusChangeDeep,
      disabled,
      propBtnStatus,
      onItemDelete,
      onItemUp,
      onItemDown,
      onItemDeleteDeep,
      onItemAddDeep,
      onItemUpDeep,
      onItemDownDeep,
    } = this.props
    return (
      <ControlContainer
        title={model.title}
        description={model.description}
        labels={[model.type]}
        type={model.type}
        noBodyPedding={!controls.length ? true : false}
        disabled={disabled}
        propBtnStatus={propBtnStatus}
        onPropBtnStatusChange={onPropBtnStatusChange}
        onItemDelete={onItemDelete}
        onItemUp={onItemUp}
        onItemDown={onItemDown}
      >
        {controls.length ? null : (
          <div className={`text-italic ${disabled ? cn.disabled : ''}`}>Empty object</div>
        )}
        {controls.map((item, index) => (
          <div className={cn.controlContainer} key={index}>
            <ControlFactory
              /* common */
              model={item.model}
              error={item.error}
              /* primitive */
              value={item.value}
              options={item.options}
              onBooleanChange={value => onBooleanChangeDeep(['controls', index], value)}
              onStringChange={value => onStringChangeDeep(['controls', index], value)}
              onNumberChange={value => onNumberChangeDeep(['controls', index], value)}
              onSelectChange={value => onSelectChangeDeep(['controls', index], value)}
              onFileChange={value => onFileChangeDeep(['controls', index], value)}
              onFileReset={() => onFileResetDeep(['controls', index])}
              onBlur={() => onBlurDeep(['controls', index])}
              /* complex */
              controls={item.controls}
              onBooleanChangeDeep={(dist, value) => onBooleanChangeDeep(['controls', index, ...dist], value)}
              onStringChangeDeep={(dist, value) => onStringChangeDeep(['controls', index, ...dist], value)}
              onNumberChangeDeep={(dist, value) => onNumberChangeDeep(['controls', index, ...dist], value)}
              onSelectChangeDeep={(dist, value) => onSelectChangeDeep(['controls', index, ...dist], value)}
              onFileChangeDeep={(dist, value) => onFileChangeDeep(['controls', index, ...dist], value)}
              onFileResetDeep={dist => onFileResetDeep(['controls', index, ...dist])}
              onBlurDeep={dist => onBlurDeep(['controls', index, ...dist])}
              onPropBtnStatusChangeDeep={(dist, active) =>
                onPropBtnStatusChangeDeep(['controls', index, ...dist], active)
              }
              onItemDeleteDeep={dist => onItemDeleteDeep(['controls', index, ...dist])}
              onItemAddDeep={dist => onItemAddDeep(['controls', index, ...dist])}
              onItemUpDeep={dist => onItemUpDeep(['controls', index, ...dist])}
              onItemDownDeep={dist => onItemDownDeep(['controls', index, ...dist])}
              /* object prop */
              onPropBtnStatusChange={active => onPropBtnStatusChangeDeep(['controls', index], active)}
              disabled={disabled || !item.exist}
              propBtnStatus={
                item.isRequired ? 'hidden' : disabled ? 'disabled' : item.exist ? 'active' : 'inactive'
              }
              /* array */
              onItemAdd={() => onItemAddDeep(['controls', index])}
            />
          </div>
        ))}
      </ControlContainer>
    )
  }
}
