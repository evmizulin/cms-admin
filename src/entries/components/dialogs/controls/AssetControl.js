import React, { Component } from 'react'
import { func, string, bool, oneOfType, instanceOf, shape } from 'prop-types'
import { ControlContainer } from 'src/entries/components/dialogs/ControlContainer'
import { AssetModelType } from 'src/lib/types/models/AssetModelType'
import { AssetSubmodelType } from 'src/lib/types/models/AssetSubmodelType'
import { FileInput } from 'src/lib/components/controls/FileInput'
import { config } from 'src/config'

export class AssetControl extends Component {
  static propTypes = {
    model: oneOfType([instanceOf(AssetModelType), instanceOf(AssetSubmodelType)]).isRequired,
    value: oneOfType([
      string,
      shape({
        name: string.isRequired,
      }),
    ]),
    error: string.isRequired,
    onFileChange: func.isRequired,
    onFileReset: func.isRequired,
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
      onFileChange,
      onFileReset,
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
        <FileInput
          onChange={onFileChange}
          onReset={onFileReset}
          value={value && value.name ? value.name : value ? value.split('/').pop() : null}
          disabled={disabled}
          downloadLink={!!value && !value.name ? `${config.apiUrl}${value}` : null}
        />
      </ControlContainer>
    )
  }
}
