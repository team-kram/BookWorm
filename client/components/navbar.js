import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar navbar-nav navbar-primary navbar-expand">
    <div className="order-0 ml-3">
      <a className="navbar-brand mx-auto" href="#">
        Book Worm
      </a>
    </div>
    {isLoggedIn ? (
      <ul className="ml-auto navbar-nav">
        {/* The navbar will show these links after you log in */}
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </li>
      </ul>
    ) : (
      <ul className="ml-auto navbar-nav">
        {/* The navbar will show these links before you log in */}
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    )}
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
