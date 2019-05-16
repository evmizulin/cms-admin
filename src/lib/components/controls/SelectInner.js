/* eslint-disable react/prop-types */

import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import { MenuItem } from 'material-ui/Menu'
import { emphasize } from 'material-ui/styles/colorManipulator'

import { cn } from './SelectInner.style'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  field: {
    marginTop: 16,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: '2em',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

class inputComponent extends React.Component {
  render() {
    const { inputRef, ...props } = this.props
    return <div ref={inputRef} {...props} />
  }
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        classes: { inkbar: cn.inkbar, error: cn.inkbarError },
        error: !props.selectProps.isDisabled && props.selectProps.isError,
        disabled: props.selectProps.isDisabled,
        inputProps: {
          className: `${props.selectProps.classes.input} ${
            props.selectProps.isField ? props.selectProps.classes.field : ''
          }`,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<span>X</span>}
    />
  )
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

class IntegrationReactSelect extends React.Component {
  handleChange(value) {
    const { onChange } = this.props
    onChange(Array.isArray(value) ? null : value)
  }

  render() {
    const {
      classes,
      theme,
      options,
      value,
      placeholder,
      isField,
      disabled,
      isError,
      onMenuOpen,
      onMenuClose,
      onBlur,
    } = this.props

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }

    return (
      <div className={classes.root}>
        <Select
          isError={isError}
          isDisabled={disabled}
          isField={isField}
          classes={classes}
          styles={selectStyles}
          options={options}
          components={components}
          value={disabled ? null : value}
          onChange={(...props) => this.handleChange(...props)}
          placeholder={
            disabled ? (
              <span className="text-italic text-disabled">{placeholder}</span>
            ) : (
              <span className="text-italic">{placeholder}</span>
            )
          }
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          onBlur={onBlur}
        />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect)
