import React, { Component } from 'react'
import { func, shape, string, bool, number, oneOfType, oneOf, arrayOf, any } from 'prop-types'
import { Grid } from 'material-ui'
import { TextField } from 'src/lib/components/fields/TextField'
import { DialogContent } from 'src/lib/components/DialogContent'
import { DialogActions } from 'src/lib/components/DialogActions'
import { Button } from 'src/lib/components/Button'
import { Checkbox } from 'src/lib/components/fields/Checkbox'
import { valueAsNumber } from 'src/lib/helpers/valueAsNumber'
import { Switch } from 'src/lib/components/fields/Switch'
import { Select } from 'src/lib/components/fields/Select'

export class Step extends Component {
  static propTypes = {
    classes: shape({
      contentContainer: string,
    }),
    fields: arrayOf(
      oneOfType([
        shape({
          type: oneOf(['string']),
          name: string.isRequired,
          label: string.isRequired,
          required: bool.isRequired,
          value: string,
          error: string.isRequired,
          shrink: bool,
          placeholder: string,
        }),
        shape({
          type: oneOf(['number']),
          name: string.isRequired,
          label: string.isRequired,
          required: bool.isRequired,
          value: oneOfType([number, string]),
          error: string.isRequired,
        }),
        shape({
          type: oneOf(['checkox']),
          name: string.isRequired,
          label: string.isRequired,
          value: bool.isRequired,
        }),
        shape({
          type: oneOf(['switch']),
          name: string.isRequired,
          label: string.isRequired,
          value: bool.isRequired,
        }),
        shape({
          type: oneOf(['select']),
          name: string.isRequired,
          label: string.isRequired,
          value: any,
          required: bool.isRequired,
          options: any,
          error: string.isRequired,
        }),
      ])
    ).isRequired,
    onStringChange: func.isRequired,
    onNumberChange: func.isRequired,
    onBooleanChange: func.isRequired,
    onSelectChange: func.isRequired,
    onBlur: func.isRequired,
    onClose: func.isRequired,
    onBack: func,
    onNext: func,
    onDone: func.isRequired,
  }

  static defaultProps = {
    onBack: null,
    onNext: null,
    classes: {
      contentContainer: '',
    },
  }

  render() {
    const {
      fields,
      onStringChange,
      onNumberChange,
      onBooleanChange,
      onSelectChange,
      onBlur,
      onClose,
      onBack,
      onNext,
      onDone,
      classes,
    } = this.props
    return (
      <div>
        <DialogContent>
          <div className={classes.contentContainer}>
            <Grid container spacing={8}>
              {fields.map((field, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  {field.type !== 'string' ? null : (
                    <TextField
                      required={field.required}
                      label={field.label}
                      value={field.value || ''}
                      error={!!field.error}
                      helperText={field.error || ' '}
                      onChange={value => onStringChange(field.name, value)}
                      onBlur={() => onBlur(field.name)}
                      shrink={field.shrink || undefined}
                      placeholder={field.placeholder || undefined}
                    />
                  )}
                  {field.type !== 'number' ? null : (
                    <TextField
                      required={field.required}
                      label={field.label}
                      value={valueAsNumber(field.value)}
                      error={!!field.error}
                      helperText={field.error || ' '}
                      onChange={value => onNumberChange(field.name, value)}
                      onBlur={() => onBlur(field.name)}
                    />
                  )}
                  {field.type !== 'checkox' ? null : (
                    <Checkbox
                      label={field.label}
                      checked={field.value}
                      onChange={() => onBooleanChange(field.name, !field.value)}
                    />
                  )}
                  {field.type !== 'switch' ? null : (
                    <Switch
                      checked={field.value}
                      onChange={() => onBooleanChange(field.name, !field.value)}
                      label={field.label}
                    />
                  )}
                  {field.type !== 'select' ? null : (
                    <Select
                      required={field.required}
                      label={field.label}
                      value={field.value}
                      error={!!field.error}
                      helperText={field.error || ' '}
                      onChange={value => onSelectChange(field.name, value)}
                      options={field.options}
                      onBlur={() => onBlur(field.name)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
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
