import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <nav className="navbar navbar-nav navbar-expand fixed-top">
    <div className="order-0 ml-3">
      <Link to="/" className="navbar-brand mx-auto">
        Book Worm
      </Link>
    </div>
    {isLoggedIn ? (
      isAdmin ? (
        <ul className="ml-auto navbar-nav">
          {/* The navbar will show these links after you log in */}
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/admin">
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/books">
              Show inventory
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/completed-orders">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/cart">
              Cart
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="ml-auto navbar-nav">
          {/* The navbar will show these links after you log in */}
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/books">
              Show inventory
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/completed-orders">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active-link" to="/cart">
              Cart
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      )
    ) : (
      <ul className="ml-auto navbar-nav">
        {/* The navbar will show these links after you log in */}
        <li className="nav-item">
          <NavLink activeClassName="active-link" to="/books">
            Show inventory
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active-link" to="/cart">
            Cart
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active-link" to="/signup">
            Sign Up
          </NavLink>
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
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
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
