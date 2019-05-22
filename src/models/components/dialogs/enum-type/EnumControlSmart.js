import React, { Component } from 'react'
import { func, instanceOf, oneOfType } from 'prop-types'
import { EnumModelType } from 'src/lib/types/models/EnumModelType'
import { EnumSubmodelType } from 'src/lib/types/models/EnumSubmodelType'
import clone from 'clone'
import { isNumber } from 'src/lib/helpers/isNumber'
import { validate } from 'src/lib/services/Validator'
import { EnumControl } from 'src/models/components/dialogs/enum-type/EnumControl'

export class EnumControlSmart extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onBack: func,
    onDone: func.isRequired,
    initialModel: oneOfType([instanceOf(EnumModelType), instanceOf(EnumSubmodelType)]),
  }

  static defaultProps = {
    initialModel: null,
    onBack: null,
  }

  initEnum(enumEntity) {
    return {
      type: typeof enumEntity.value,
      value: enumEntity.value,
      valueError: '',
      label: enumEntity.label,
      labelError: '',
    }
  }

  init(initialModel) {
    return initialModel
      ? (() => {
          const state = { enumError: '' }
          const model = clone(initialModel)
          state.enum = model.enum.map(item => this.initEnum(item))
          if (model.hasOwnProperty('default')) {
            state.default = model.enum.reduce((res, item, index) => {
              if (res !== null) return res
              return item.value === model.default ? index : null
            }, null)
          }
          return state
        })()
      : {
          enum: [
            {
              type: 'string',
              value: '',
              valueError: '',
              label: '',
              labelError: '',
            },
          ],
          enumError: '',
        }
  }

  normalize(state) {
    const model = {}
    model.enum = state.enum.map(item => ({
      value: item.value,
      label: item.label,
    }))
    if (state.hasOwnProperty('default')) {
      model.default = model.enum[state.default].value
    }
    return model
  }

  constructor(props) {
    super(props)
    const { initialModel } = props
    this.state = this.init(initialModel)
  }

  onAnyBooleanChange(dist, value) {
    const { state } = this
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 1 === index
      if (isLast) {
        res[key] = value
      }
      return res[key]
    }, state)
    this.setState(state)
  }

  onAnyStringChange(dist, value) {
    const { state } = this
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 1 === index
      if (isLast) {
        res[key] = value
      }
      return res[key]
    }, state)
    this.setState(state)
  }

  onAnyNumberChange(dist, value) {
    const { state } = this
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 1 === index
      if (isLast) {
        res[key] = isNumber(value) ? +value : value
      }
      return res[key]
    }, state)
    this.setState(state)
  }

  onEnumTypeChange(index, option) {
    const { state } = this
    const MAP = {
      boolean: true,
      string: '',
      number: '',
    }
    if (!option) return
    state.enum[index].type = option.value
    state.enum[index].value = MAP[option.value]
    state.enum[index].valueError = ''
    this.setState(state)
  }

  onEnumAdd() {
    const { state } = this
    state.enumError = ''
    state.enum.push({
      type: 'string',
      value: '',
      valueError: '',
      label: '',
      labelError: '',
    })
    this.setState(state)
  }

  onEnumDelete(index) {
    const { state } = this
    state.enumError = ''
    if (index === state.default) {
      delete state.default
    }
    state.enum.splice(index, 1)
    this.setState(state)
  }

  onDefaultChange(index, value) {
    const { state } = this
    if (value === false) {
      delete state.default
    } else {
      state.default = index
    }
    this.setState(state)
  }

  validateLabel(index) {
    const { state } = this
    const schema = EnumModelType.prototype.getBasicSchema()
    const { originalErrors } = validate(
      state.enum[index].label,
      schema.properties.enum.items.properties.label
    )
    state.enum[index].labelError = originalErrors[0] ? originalErrors[0].message : ''
    this.setState(state)
    return !originalErrors.length
  }

  validateValue(index) {
    const { state } = this
    const { originalErrors } = validate(state.enum[index].value, { type: state.enum[index].type })
    state.enum[index].valueError = originalErrors[0] ? originalErrors[0].message : ''
    this.setState(state)
    return !originalErrors.length
  }

  validateEnum() {
    const { state } = this
    const model = this.normalize(state)
    const { errors: vErrors } = EnumModelType.prototype.validateUniqueness(model)
    state.enumError = vErrors[0] ? vErrors[0].message : ''
    this.setState(state)
    return !vErrors.length
  }

  onEnumLabelBlur(index) {
    this.validateLabel(index)
  }

  onEnumValueBlur(index) {
    this.validateValue(index)
  }

  onDone() {
    const { onDone } = this.props
    const model = this.normalize(this.state)
    const fieldsValid = model.enum.reduce((res, item, index) => {
      const validLabel = this.validateLabel(index)
      const validValue = this.validateValue(index)
      return res && validLabel && validValue
    }, true)
    const enumValid = this.validateEnum()
    if (fieldsValid && enumValid) {
      onDone(model)
    }
  }

  render() {
    const { state } = this
    const { onClose, onBack } = this.props
    return (
      <EnumControl
        enumState={state.enum}
        enumError={state.enumError}
        onClose={onClose}
        onBack={onBack}
        onDone={() => this.onDone()}
        onAdd={(...props) => this.onEnumAdd(...props)}
        onDefaultChange={(...props) => this.onDefaultChange(...props)}
        onLabelStringChange={(index, value) => {
          this.onAnyStringChange(['enum', index, 'label'], value)
          this.onAnyStringChange(['enum', index, 'labelError'], '')
        }}
        onLabelBlur={index => this.onEnumLabelBlur(index)}
        onDelete={index => this.onEnumDelete(index)}
        onTypeChange={(...props) => this.onEnumTypeChange(...props)}
        defaultIndex={state.default}
        onValueStringChange={(index, value) => {
          this.onAnyStringChange(['enum', index, 'value'], value)
          this.onAnyStringChange(['enum', index, 'valueError'], '')
          this.onAnyStringChange(['enumError'], '')
        }}
        onValueNumberChange={(index, value) => {
          this.onAnyNumberChange(['enum', index, 'value'], value)
          this.onAnyStringChange(['enum', index, 'valueError'], '')
          this.onAnyStringChange(['enumError'], '')
        }}
        onValueBooleanChange={(index, value) => {
          this.onAnyBooleanChange(['enum', index, 'value'], value)
          this.onAnyStringChange(['enum', index, 'valueError'], '')
          this.onAnyStringChange(['enumError'], '')
        }}
        onValueBlur={index => this.onEnumValueBlur(index)}
      />
    )
  }
}
