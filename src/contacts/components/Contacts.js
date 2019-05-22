import React, { Component } from 'react'
import { func, oneOf, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RedirectContainer } from 'src/global/components/RedirectContainer'
import { ErrorContainer } from 'src/global/components/ErrorContainer'
import { Loader } from 'src/global/components/Loader'
import { TextField } from 'src/lib/components/fields/TextField'
import { Button } from 'src/lib/components/Button'
import { Typography } from 'src/lib/components/Typography'
import { onDone } from 'src/contacts/actions/onDone'
import { MessageBlock } from 'src/lib/components/MessageBlock'
import { routes } from 'src/lib/services/Routes'
import { PageContainer } from 'src/lib/components/PageContainer'

class AContacts extends Component {
  static propTypes = {
    onDone: func.isRequired,
    loading: bool.isRequired,
    status: oneOf(['form', 'success']).isRequired,
  }

  state = {
    values: {
      email: '',
      phone: '',
      name: '',
      jobTitle: '',
      company: '',
    },
    errors: {
      email: '',
      phone: '',
      name: '',
      jobTitle: '',
      company: '',
    },
  }

  onChange(field, value) {
    const { values, errors } = this.state
    values[field] = value
    errors[field] = ''
    this.setState({ values, errors })
  }

  validate() {
    const { values, errors } = this.state
    if (!values.email || !/@/g.test(values.email)) {
      errors.email = 'Invalid email'
      this.setState({ errors })
      return false
    }
    return true
  }

  onDone() {
    if (!this.validate()) return
    const { onDone } = this.props
    const { values } = this.state
    const res = {}
    Object.keys(values).forEach(item => {
      if (values[item]) {
        res[item] = values[item]
      }
    })
    onDone(res)
  }

  render() {
    const { values, errors } = this.state
    const { status, loading } = this.props
    return (
      <PageContainer>
        <RedirectContainer />
        <ErrorContainer />
        <Loader />
        <div className="text-center p-xxl">
          <MessageBlock>
            {status !== 'success' ? null : (
              <span>
                Thank you! Contacts are sent. Go to <Link to={routes.home()}>homepage</Link>.
              </span>
            )}
            {status !== 'form' ? null : (
              <div>
                <Typography type="md" className="pb-sm">
                  Leave your contacts and we will let you know when CMS will be ready for production.
                </Typography>
                <div className="pb-sm">
                  <TextField
                    label="E-mail"
                    required={true}
                    onChange={value => this.onChange('email', value)}
                    onBlur={() => {}}
                    value={values.email}
                    error={!!errors.email}
                    helperText={errors.email || 'Required field'}
                  />
                  <TextField
                    label="Phone"
                    required={false}
                    onChange={value => this.onChange('phone', value)}
                    onBlur={() => {}}
                    value={values.phone}
                    error={!!errors.phone}
                    helperText={errors.phone || ''}
                  />
                  <TextField
                    label="Name"
                    required={false}
                    onChange={value => this.onChange('name', value)}
                    onBlur={() => {}}
                    value={values.name}
                    error={!!errors.name}
                    helperText={errors.name || ''}
                  />
                  <TextField
                    label="Job title"
                    required={false}
                    onChange={value => this.onChange('jobTitle', value)}
                    onBlur={() => {}}
                    value={values.jobTitle}
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle || ''}
                  />
                  <TextField
                    label="Company name"
                    required={false}
                    onChange={value => this.onChange('company', value)}
                    onBlur={() => {}}
                    value={values.company}
                    error={!!errors.company}
                    helperText={errors.company || ''}
                  />
                </div>
                <Button onClick={() => this.onDone()} color="primary" filled disabled={loading}>
                  Submit
                </Button>
              </div>
            )}
          </MessageBlock>
        </div>
      </PageContainer>
    )
  }
}

export const Contacts = connect(
  state => ({
    loading: state.contacts.loading.post,
    status: state.contacts.status,
  }),
  dispatch => ({
    onDone: (...props) => dispatch(onDone(...props)),
  })
)(AContacts)
