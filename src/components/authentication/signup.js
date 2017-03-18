import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Signup extends Component {
  submitForm = values => {
    this.props.signupUser(values)
  }

  renderError = () => {
    if (this.props.errorMessages.length) {
      return (
        <div className='alert alert-danger'>
          <ul>
            {this.props.errorMessages.map((msg) => <li key={msg} className='small'>{msg}</li>)}
          </ul>
        </div>
      )
    }
  }

  renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} className="form-control" placeholder={label} type={type}/>
        {touched && ((error && <small><em>{error}</em></small>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  render() {
    const { handleSubmit, pristine, reset, submitting, valid } = this.props

    return(
      <div className="container m-t-3">
        <div className="col-md-6 col-md-offset-3">
          <h1 className="signup-header">Креирај профил</h1>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
            <div className="form-group m-t-2">
              <Field name="full_name" type="text" component={this.renderTextField} label="Име"/>
            </div>

            <div className="form-group">
              <Field name="email" type="email" component={this.renderTextField} label="Е-маил"/>
              <small className="form-text text-muted">Ние нема да ја споделуваме вашата е-маил адреса.</small>
            </div>

            <div className="form-group">
              <Field name="phone" type="text" component={this.renderTextField} label="Телефон"/>
            </div>

            <div className="form-group">
              <Field name="password" type="password" component={this.renderTextField} label="Лозинка"/>
            </div>

            <div className="form-group">
              <Field name="password_confirmation" type="password" component={this.renderTextField} label="Потврди лозинка"/>
            </div>

            {this.renderError()}    
            
            <div className="col-md-2 offset-md-5">
              <button type="submit" disabled={!valid} className="btn btn-info m-t-2">Креирај</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  const required_fields = ['full_name', 'email', 'phone', 'password', 'password_confirmation']

  required_fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Задолжително поле'
    }    
  })

  if(values .full_name && (values.full_name.length < 3 || values.full_name.length > 50)) {
    errors.full_name = 'Името може да содржи минимум 3, максимум 50 карактери'
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Невалидна е-маил адреса'
  }

  if (!/^\+?[0-9]{8,14}$/.test(values.phone)) {
    errors.phone = 'Невалиден телефонски број'
  }

  if(values.password && values.password.length < 6) {
    errors.password = 'Лозинка мора да има минимум 6 карактери'
  }

  if(values.password_confirmation && values.password_confirmation.length < 6) {
    errors.password_confirmation = 'Потврди лозинка мора да има минимум 6 карактери'
  }

  if(values.password_confirmation && values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Лозинките мора да се совпаѓаат'
  }

  return errors
}

const mapStateToProps = state => {
  return {errorMessages: state.auth.errors}
}

Signup = reduxForm({
  form: "Signup",
  validate
})(Signup)

Signup = connect(
  mapStateToProps,
  actions
)(Signup)

export default Signup
