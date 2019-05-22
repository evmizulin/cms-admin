import React, { Component } from 'react'
import { func, shape, string, bool, number, oneOfType, oneOf, arrayOf } from 'prop-types'
import { Grid } from 'material-ui'
import { TextField } from 'src/lib/components/fields/TextField'
import { DialogContent } from 'src/lib/components/DialogContent'
import { DialogActions } from 'src/lib/components/DialogActions'
import { Button } from 'src/lib/components/Button'
import { Checkbox } from 'src/lib/components/fields/Checkbox'
import { valueAsNumber } from 'src/lib/helpers/valueAsNumber'
import { Switch } from 'src/lib/components/fields/Switch'
import { Select } from 'src/lib/components/fields/Select'
import { Icon } from 'src/lib/components/Icon'
import { FormHelperText } from 'material-ui/Form'

import { cn } from 'src/models/components/dialogs/enum-type/EnumControl.style'

export class EnumControl extends Component {
  static propTypes = {
    defaultIndex: number,
    enumState: arrayOf(
      shape({
        type: oneOf(['string', 'number', 'boolean']).isRequired,
        value: oneOfType([number, string, bool]).isRequired,
        valueError: string.isRequired,
        label: string.isRequired,
        labelError: string.isRequired,
      })
    ).isRequired,
    enumError: string.isRequired,
    onAdd: func.isRequired,
    onDefaultChange: func.isRequired,
    onLabelStringChange: func.isRequired,
    onLabelBlur: func.isRequired,
    onTypeChange: func.isRequired,
    onValueStringChange: func.isRequired,
    onValueNumberChange: func.isRequired,
    onValueBooleanChange: func.isRequired,
    onValueBlur: func.isRequired,
    onDelete: func.isRequired,
    onClose: func.isRequired,
    onBack: func,
    onNext: func,
    onDone: func.isRequired,
  }

  static defaultProps = {
    defaultIndex: null,
    onBack: null,
    onNext: null,
  }

  render() {
    const {
      onClose,
      enumError,
      onBack,
      onNext,
      onDone,
      onAdd,
      enumState,
      defaultIndex,
      onDefaultChange,
      onLabelStringChange,
      onLabelBlur,
      onTypeChange,
      onDelete,
      onValueStringChange,
      onValueNumberChange,
      onValueBooleanChange,
      onValueBlur,
    } = this.props
    const selectOptions = [
      { label: 'String', value: 'string' },
      { label: 'Number', value: 'number' },
      { label: 'Boolean', value: 'boolean' },
    ]
    return (
      <div>
        <DialogContent>
          <div className={cn.container}>
            {enumState.map((item, index) => (
              <Grid container spacing={8} key={index}>
                <Grid item xs={12} sm={2}>
                  <Checkbox
                    checked={defaultIndex === index}
                    onChange={value => onDefaultChange(index, value)}
                    label={'Default'}
                    dirtyAlign
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Label"
                    required
                    onChange={value => onLabelStringChange(index, value)}
                    onBlur={() => onLabelBlur(index)}
                    value={item.label}
                    error={!!item.labelError}
                    helperText={item.labelError || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Select
                    options={selectOptions}
                    onChange={value => onTypeChange(index, value)}
                    label={'Select a type'}
                    required={true}
                    error={false}
                    helperText=""
                    value={selectOptions.find(option => option.value === item.type)}
                    onBlur={() => {}}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  {item.type !== 'string' ? null : (
                    <TextField
                      label="Value"
                      required
                      onChange={value => onValueStringChange(index, value)}
                      onBlur={() => onValueBlur(index)}
                      value={item.value}
                      error={!!item.valueError}
                      helperText={item.valueError || ''}
                    />
                  )}
                  {item.type !== 'number' ? null : (
                    <TextField
                      label="Value"
                      required
                      onChange={value => onValueNumberChange(index, value)}
                      onBlur={() => onValueBlur(index)}
                      value={valueAsNumber(item.value)}
                      error={!!item.valueError}
                      helperText={item.valueError || ''}
                    />
                  )}
                  {item.type !== 'boolean' ? null : (
                    <Switch
                      checked={item.value}
                      onChange={value => onValueBooleanChange(index, value)}
                      label="True or false"
                      dirtyAlign={true}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={1}>
                  <div className={cn.deleteButton}>
                    <Button
                      onClick={() => onDelete(index)}
                      color="accent"
                      outlined
                      size="md"
                      disabled={enumState.length === 1}
                    >
                      Delete
                    </Button>
                  </div>
                </Grid>
              </Grid>
            ))}
            <div className="mt-md">
              <Button onClick={onAdd} color="secondary" outlined size="md">
                <Icon type="models-dialog-enum-add-button" size={20} />
                <div className="pl-xs">Add line</div>
              </Button>
            </div>
            <FormHelperText classes={{ root: `${cn.textError} mt-md` }}>{enumError}</FormHelperText>
          </div>
        </DialogContent>
        <DialogActions onClose={onClose}>
          {!onBack ? null : (
            <Button color="secondary" onClick={onBack}>
              Back
            </Button>
          )}
          {onNext ? (
            <Button color="secondary" onClick={onNext}>
              Next
            </Button>
          ) : (
            <Button color="secondary" onClick={onDone}>
              Done
            </Button>
          )}
        </DialogActions>
      </div>
    )
  }
}
