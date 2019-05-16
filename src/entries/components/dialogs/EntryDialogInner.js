import React, { Component } from 'react'
import { func, instanceOf, arrayOf } from 'prop-types'
import { ModelType } from 'src/lib/types/models/ModelType'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { ControlFactory } from 'src/entries/components/dialogs/ControlFactory'
import { DialogContent } from 'src/lib/components/DialogContent'
import { DialogActions } from 'src/lib/components/DialogActions'
import { Button } from 'src/lib/components/Button'
import { validate } from 'src/lib/services/Validator'
import { isNumber } from 'src/lib/helpers/isNumber'
import { sortKeys } from 'src/lib/helpers/sortKeys'
import { TextField } from 'src/lib/components/fields/TextField'

export class EntryDialogInner extends Component {
  static propTypes = {
    onDone: func.isRequired,
    onClose: func.isRequired,
    model: instanceOf(ModelType).isRequired,
    entry: instanceOf(EntryType),
    entries: arrayOf(instanceOf(EntryType)).isRequired,
  }

  static defaultProps = {
    entry: null,
  }

  constructor(props) {
    super(props)
    const { model, entry } = props
    this.state = {
      identificator: entry ? entry.identificator : '',
      control: this.init(model, entry ? entry.value : undefined),
    }
  }

  isTypeCorrect(model, value) {
    if (!value || model.type !== value.type) {
      return false
    }
    if (model.type === 'reference') {
      const { entries } = this.props
      return entries
        .filter(entry => entry.modelId === model.reference)
        .some(entry => entry.id === value.value)
    }
    if (model.type === 'enum') {
      const { valid } = validate(value.value, model.toSchema())
      return valid
    }
    return true
  }

  initBool(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: false,
      value: isTypeCorrect ? value.value : model.default,
    }
  }

  initString(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: true,
      error: '',
      value: isTypeCorrect ? value.value : model.default || '',
    }
  }

  initNumber(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: true,
      error: '',
      value: isTypeCorrect ? value.value : model.hasOwnProperty('default') ? model.default : '',
    }
  }

  initObject(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: false,
      controls: sortKeys(model.properties).map(propName => {
        const subModel = model.properties[propName]
        const isRequired = model.required.some(item => item === propName)
        const isPropTypeCorrect = isTypeCorrect && this.isTypeCorrect(subModel, value.value[propName])
        const control =
          isTypeCorrect && isPropTypeCorrect
            ? this.init(subModel, value.value[propName])
            : this.init(subModel)
        control.exist = (isTypeCorrect && isPropTypeCorrect) || isRequired
        control.isRequired = isRequired
        control.propName = propName
        return control
      }),
    }
  }

  initArray(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: true,
      error: '',
      controls: !model.items
        ? null
        : isTypeCorrect
          ? (() => {
              const addControlsForMin = (model.minItems || 0) - value.value.length
              const isEnoughForMin = addControlsForMin <= 0
              const existsControls = value.value.map(item => {
                const isItemTypeCorrect = this.isTypeCorrect(model.items, item)
                return isItemTypeCorrect ? this.init(model.items, item) : this.init(model.items)
              })
              const emptyControlsForMin = isEnoughForMin
                ? []
                : Array.from(Array(addControlsForMin)).map(() => this.init(model.items))
              return [...existsControls, ...emptyControlsForMin]
            })()
          : Array.from(Array(model.minItems || 0)).map(() => this.init(model.items)),
    }
  }

  initEnum(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: true,
      error: '',
      value: isTypeCorrect
        ? model.enum.find(item => item.value === value.value)
        : model.hasOwnProperty('default')
          ? model.enum.find(item => item.value === model.default)
          : null,
      options: model.enum,
    }
  }

  initReference(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    const { entries } = this.props
    const options = entries
      .filter(enrty => enrty.modelId === model.reference)
      .map(enrty => ({ label: enrty.identificator || 'Unidentified entry', value: enrty.id }))
    return {
      model: model,
      showError: true,
      error: '',
      value: isTypeCorrect ? options.find(option => option.value === value.value) : null,
      options: options,
    }
  }

  initAsset(model, value) {
    const isTypeCorrect = this.isTypeCorrect(model, value)
    return {
      model: model,
      showError: true,
      error: '',
      initialValue: isTypeCorrect ? value.value : null,
      value: isTypeCorrect ? value.value : null,
    }
  }

  init(model, value) {
    const MAP = {
      'string-line': this.initString,
      'string-multiline': this.initString,
      'string-html': this.initString,
      'string-markdown': this.initString,
      boolean: this.initBool,
      number: this.initNumber,
      object: this.initObject,
      array: this.initArray,
      enum: this.initEnum,
      reference: this.initReference,
      asset: this.initAsset,
    }
    return MAP[model.type].call(this, model, value)
  }

  onBooleanChange(dist, value) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = value
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onStringChange(dist, value) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = value
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onNumberChange(dist, value) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = isNumber(value) ? +value : value
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onSelectChange(dist, value) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = value
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onFileChange(dist, value) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = value
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onFileReset(dist) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.value = res.initialValue
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onBlur(dist) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        this.validate(res)
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onPropBtnStatusChange(dist, active) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.exist = active
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onItemDelete(dist) {
    const { control } = this.state
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 2 === index
      if (isLast) {
        const itemKey = dist[dist.length - 1]
        res.controls.splice(itemKey, 1)
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onItemAdd(dist) {
    const { control } = this.state
    const arr = [...dist, 1]
    arr.reduce((res, key, index) => {
      const isLast = arr.length - 1 === index
      if (isLast) {
        res.controls.push(this.init(res.model.items))
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onItemUp(dist) {
    const { control } = this.state
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 2 === index
      if (isLast) {
        const itemKey = dist[dist.length - 1]
        const control = res.controls[itemKey]
        res.controls.splice(itemKey, 1)
        res.controls.splice(itemKey - 1, 0, control)
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  onItemDown(dist) {
    const { control } = this.state
    dist.reduce((res, key, index) => {
      const isLast = dist.length - 2 === index
      if (isLast) {
        const itemKey = dist[dist.length - 1]
        const control = res.controls[itemKey]
        res.controls.splice(itemKey, 1)
        res.controls.splice(itemKey + 1, 0, control)
        res.error = ''
      }
      return res[key]
    }, control)
    this.setState({ control })
  }

  validate(control) {
    // array
    const validation = []
    const propExist = !control.hasOwnProperty('exist') ? true : control.exist
    if (control.showError && propExist) {
      const value = this.normalize(control, true)
      const { originalErrors } = validate(value, control.model.toSchema())
      const errorOfControlItself = originalErrors.find(error => !error.dataPath.length)
      control.error = !errorOfControlItself ? '' : errorOfControlItself.message
      validation.push(!errorOfControlItself)
    }
    if (control.controls) {
      control.controls.forEach(item => validation.push(this.validate(item)))
    }
    return validation.every(item => item === true)
  }

  normalizeSimple(control, forValidation) {
    const value = control.value
    return forValidation ? value : { type: control.model.type, value }
  }

  normalizeObject(control, forValidation) {
    const value = control.controls.reduce((res, control) => {
      if (control.exist) {
        res[control.propName] = this.normalize(control, forValidation)
      }
      return res
    }, {})
    return forValidation ? value : { type: control.model.type, value }
  }

  normalizeArray(control, forValidation) {
    const value = !control.controls
      ? []
      : control.controls.map(control => this.normalize(control, forValidation))
    return forValidation ? value : { type: control.model.type, value }
  }

  normalizeEnum(control, forValidation) {
    const value = control.value ? control.value.value : null
    return forValidation ? value : { type: control.model.type, value }
  }

  normalizeReference(control, forValidation) {
    const value = control.value ? control.value.value : null
    return forValidation ? value : { type: control.model.type, value }
  }

  normalizeAsset(control, forValidation) {
    const value = control.value
    return !forValidation ? { type: control.model.type, value } : value && value.name ? value.name : value
  }

  normalize(control, forValidation) {
    const MAP = {
      'string-line': this.normalizeSimple,
      'string-multiline': this.normalizeSimple,
      'string-html': this.normalizeSimple,
      'string-markdown': this.normalizeSimple,
      boolean: this.normalizeSimple,
      number: this.normalizeSimple,
      object: this.normalizeObject,
      array: this.normalizeArray,
      enum: this.normalizeEnum,
      reference: this.normalizeReference,
      asset: this.normalizeAsset,
    }
    return MAP[control.model.type].call(this, control, forValidation)
  }

  onDone() {
    const { onDone, model, entry } = this.props
    const { control, identificator } = this.state
    const valid = this.validate(control)
    if (!valid) return this.setState({ control })
    onDone(
      entry
        ? {
            ...entry,
            identificator,
            value: this.normalize(control, false),
          }
        : {
            identificator,
            modelId: model.id,
            value: this.normalize(control, false),
          }
    )
  }

  render() {
    const { onClose, model } = this.props
    const { value, error, controls, options } = this.state.control
    const { identificator } = this.state
    return (
      <div>
        <DialogContent>
          <div className="mb-xl pb-sm">
            <TextField
              label="Entry identificator"
              onChange={value => this.setState({ identificator: value })}
              onBlur={() => {}}
              value={identificator}
              error={false}
              helperText="This will help to distinguish one entry from another."
            />
          </div>
          <ControlFactory
            /* common */
            model={model}
            error={error}
            /* primitive */
            value={value}
            options={options}
            onBooleanChange={value => this.onBooleanChange([], value)}
            onStringChange={value => this.onStringChange([], value)}
            onNumberChange={value => this.onNumberChange([], value)}
            onSelectChange={value => this.onSelectChange([], value)}
            onFileChange={value => this.onFileChange([], value)}
            onFileReset={() => this.onFileReset([])}
            onBlur={() => this.onBlur([])}
            /* complex */
            controls={controls}
            onBooleanChangeDeep={(...props) => this.onBooleanChange(...props)}
            onStringChangeDeep={(...props) => this.onStringChange(...props)}
            onNumberChangeDeep={(...props) => this.onNumberChange(...props)}
            onSelectChangeDeep={(...props) => this.onSelectChange(...props)}
            onFileChangeDeep={(...props) => this.onFileChange(...props)}
            onFileResetDeep={(...props) => this.onFileReset(...props)}
            onBlurDeep={(...props) => this.onBlur(...props)}
            onPropBtnStatusChangeDeep={(...props) => this.onPropBtnStatusChange(...props)}
            onItemDeleteDeep={(...props) => this.onItemDelete(...props)}
            onItemAddDeep={(...props) => this.onItemAdd(...props)}
            onItemUpDeep={(...props) => this.onItemUp(...props)}
            onItemDownDeep={(...props) => this.onItemDown(...props)}
            /* array */
            onItemAdd={() => this.onItemAdd([])}
          />
        </DialogContent>
        <DialogActions onClose={onClose}>
          <Button color="secondary" onClick={() => this.onDone()}>
            Done
          </Button>
        </DialogActions>
      </div>
    )
  }
}
