import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, addUser} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, handleCreateUser} = props
  return (
    <div className="container w-50">
      <h1>{displayName}</h1>
      <form
        onSubmit={name === 'signup' ? handleCreateUser : handleSubmit}
        name={name}
      >
        {name === 'signup' && (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="username">
                <small>Name</small>
              </label>
              <input className="form-control" name="username" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input className="form-control" name="address" type="text" />
            </div>
          </React.Fragment>
        )}
        <div className="form-group">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input className="form-control" name="password" type="password" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary w-100" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a className="btn btn-danger w-100" href="/auth/google">
          <i className="fa fa-google fa-lg mr-2" aria-hidden="true" />{' '}
          {displayName} with Google
        </a>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.name.value
      dispatch(auth(email, password, formName, name))
    },
    handleCreateUser(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const username = evt.target.username.value
      const address = evt.target.address.value
      dispatch(addUser(email, password, username, address))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
