import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Signin extends Component {
  submitForm = values => {
    this.props.signinUser(values)
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
          <h1 className="signup-header">Sign in</h1>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
            <div className="form-group">
              <Field name="email" type="email" component={this.renderTextField} label="Email" />
            </div>

            <div className="form-group">
              <Field name="password" type="password" component={this.renderTextField} label="Password" />
            </div>
            
            {this.renderError()}    
            
            <div className="col-md-2 offset-md-5">
              <button type="submit" disabled={!valid} className="btn btn-info m-t-2">Sign in</button>
            </div>

            <p><Link to="signup">Sign up</Link></p>
          </form>
        </div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  const required_fields = ['email', 'password']

  required_fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Задолжително поле!'
    }    
  })

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Невалидна е-маил адреса!'
  }

  return errors
}

const mapStateToProps = state => {
  return {errorMessages: state.auth.errors}
}

Signin = reduxForm({
  form: "Signin",
  validate
})(Signin)

Signin = connect(
  mapStateToProps,
  actions
)(Signin)

export default Signin
