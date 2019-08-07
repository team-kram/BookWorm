import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Home, Admin} from './components'
import {me} from './store'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import AllOrders from './components/AllOrders'
import Orders from './components/Orders'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import AdminUsers from './components/AdminUsers'
import AdminBooks from './components/AdminBooks'
import EditBook from './components/EditBook'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/books" component={AllBooks} />
        <Route exact path="/orders" component={AllOrders} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/books" component={AdminBooks} />
        <Route exact path="/admin/books/edit/:bookId" component={EditBook} />
        {/* <Route exact path="/admin/books/edit/:userId" component={EditUser} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/completed-orders" component={Orders} />
            <Route exact path="/books" component={AllBooks} />
            <Route
              exact
              path="/books/:bookId"
              render={navProps => (
                <SingleBook isLoggedIn={isLoggedIn} {...navProps} />
              )}
            />
            <Route
              exact
              path="/cart"
              render={navProps => (
                <Cart isLoggedIn={isLoggedIn} {...navProps} />
              )}
            />
            <Route
              exact
              path="/checkout"
              render={navProps => (
                <Checkout isLoggedIn={isLoggedIn} {...navProps} />
              )}
            />
          </Switch>
        )}
        <Route
          exact
          path="/checkout"
          render={navProps => (
            <Checkout isLoggedIn={isLoggedIn} {...navProps} />
          )}
        />
        <Route
          exact
          path="/books/:bookId"
          render={navProps => (
            <SingleBook isLoggedIn={isLoggedIn} {...navProps} />
          )}
        />
        <Route
          exact
          path="/cart"
          render={navProps => <Cart isLoggedIn={isLoggedIn} {...navProps} />}
        />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
