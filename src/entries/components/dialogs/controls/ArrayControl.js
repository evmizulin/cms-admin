import React, { Component } from 'react'
import { func, instanceOf, bool, array, oneOfType, string } from 'prop-types'
import { ArrayModelType } from 'src/lib/types/models/ArrayModelType'
import { ArraySubmodelType } from 'src/lib/types/models/ArraySubmodelType'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { ControlFactory } from 'src/entries/components/dialogs/ControlFactory'
import { Button } from 'src/lib/components/Button'

import { cn } from './ArrayControl.style'

export class ArrayControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(ArrayModelType), instanceOf(ArraySubmodelType)]).isRequired,
    controls: array,
    error: string.isRequired,
    onItemAdd: func.isRequired,
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
    controls: null,
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
      error,
      onItemAdd,
      onBooleanChangeDeep,
      onStringChangeDeep,
      onNumberChangeDeep,
      onSelectChangeDeep,
      onFileChangeDeep,
      onFileResetDeep,
      onBlurDeep,
      onPropBtnStatusChangeDeep,
      onItemDeleteDeep,
      onItemAddDeep,
      onItemUpDeep,
      onItemDownDeep,
      disabled,
      onPropBtnStatusChange,
      propBtnStatus,
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
        noBodyPedding={controls ? false : true}
        disabled={disabled}
        propBtnStatus={propBtnStatus}
        onPropBtnStatusChange={onPropBtnStatusChange}
        onItemDelete={onItemDelete}
        onItemUp={onItemUp}
        onItemDown={onItemDown}
      >
        {!controls || !controls.length ? (
          <div className={`text-italic ${disabled ? cn.disabled : ''}`}>Empty array</div>
        ) : (
          <div>
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
                  onBooleanChangeDeep={(dist, value) =>
                    onBooleanChangeDeep(['controls', index, ...dist], value)
                  }
                  onStringChangeDeep={(dist, value) =>
                    onStringChangeDeep(['controls', index, ...dist], value)
                  }
                  onNumberChangeDeep={(dist, value) =>
                    onNumberChangeDeep(['controls', index, ...dist], value)
                  }
                  onSelectChangeDeep={(dist, value) =>
                    onSelectChangeDeep(['controls', index, ...dist], value)
                  }
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
                  /* object */
                  disabled={disabled}
                  /* array */
                  onItemAdd={() => onItemAddDeep(['controls', index])}
                  /* array item */
                  onItemDelete={() => onItemDeleteDeep(['controls', index])}
                  onItemUp={index === 0 ? null : () => onItemUpDeep(['controls', index])}
                  onItemDown={
                    index === controls.length - 1 ? null : () => onItemDownDeep(['controls', index])
                  }
                />
              </div>
            ))}
          </div>
        )}
        {controls && (model.hasOwnProperty('maxItems') ? model.maxItems : Infinity) > controls.length ? (
          <div className={`${cn.addBtnContainer} ${disabled ? 'disabled' : ''}`}>
            <Button color="primary" onClick={onItemAdd} disabled={disabled}>
              Add item
            </Button>
          </div>
        ) : null}
      </ControlContainer>
    )
  }
}
