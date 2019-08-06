import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name, address} = props.user
  return (
    <div className="container">
      <h3>Welcome, {name}!</h3>
      <div className="container">
        <h3>Address</h3>
        <p>{address}</p>
        <h3>Email</h3>
        <p>{email}</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
