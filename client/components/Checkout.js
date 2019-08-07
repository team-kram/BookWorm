import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, checkout} from '../store/order'
import CheckoutForm from './CheckoutForm'
import {Elements, StripeProvider} from 'react-stripe-elements'
const storage = window.localStorage

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      cart: {},
      shipping: {name: '', email: '', address: '', zipcode: ''},
      successHidden: true,
      failHidden: true,
      submitDisabled: true
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCart(this.props.user.id)
      this.setState({cart: this.props.cart})
    } else {
      let cart = JSON.parse(storage.getItem('cart'))
      if (!cart) {
        cart = {
          completed: false,
          books: []
        }
        storage.setItem('cart', JSON.stringify(cart))
      }
      this.setState({cart})
    }
  }
  componentWillReceiveProps(props) {
    if (props.cart) {
      this.setState({cart: props.cart})
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const cart = JSON.parse(storage.getItem('cart'))
    if (this.state.cart.books.length || cart.books.length) {
      if (this.props.isLoggedIn) {
        this.props.checkout(this.state.cart.id, this.props.user.id)
      } else {
        let completedOrders = JSON.parse(storage.getItem('completedOrders'))
        cart.completed = true
        cart.shipping = this.state.shipping
        if (!completedOrders) {
          completedOrders = []
        }
        completedOrders.push(cart)
        storage.setItem('completedOrders', JSON.stringify(completedOrders))
        storage.setItem('cart', JSON.stringify({completed: false, books: []}))
      }
      this.setState({successHidden: false})
      setTimeout(() => {
        this.setState({successHidden: true, submitDisabled: true})
      }, 3000)
    } else {
      this.setState({failHidden: false})
      setTimeout(() => this.setState({failHidden: true}), 3000)
    }
  }
  handleChange = e => {
    const shipping = {...this.state.shipping}
    shipping[e.target.name] = e.target.value
    this.setState({shipping})
  }
  confirm = () => {
    this.setState({submitDisabled: false})
  }
  render() {
    const order = this.state.cart
    return Object.keys(order).length ? (
      <StripeProvider apiKey="pk_test_JLN05JZh6qQyeGXLAhu4IXZR00mH0xeQlm">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <h3>Shipping Information</h3>
              <form className="card my-3 p-4">
                <div className="form-group">
                  <label htmlFor="name">
                    Name <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.shipping.name}
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">
                    Address <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.shipping.address}
                    type="text"
                    name="address"
                    id="address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.shipping.email}
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Zip Code <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.shipping.zipcode}
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    required
                  />
                </div>
              </form>
              <h3>Payment Information</h3>
              <div className="card mt-4 p-4">
                <Elements>
                  <CheckoutForm confirm={this.confirm} />
                </Elements>
              </div>
            </div>
            <div className="col-5">
              <h3>Your Order</h3>
              <ul className="card my-3 p-4">
                <div className="row">
                  <div className="col-8">
                    <strong>Product</strong>
                  </div>
                  <div className="col-4">
                    <strong>Price</strong>
                  </div>
                </div>
                <hr />
                {order.books.map(book => (
                  <li className="mb-2" key={book.id}>
                    <div className="row">
                      <div className="col-8">
                        <p>
                          {book.title}{' '}
                          <small className="text-muted">{book.isbn}</small> x{' '}
                          <strong>{book['order-book'].quantity}</strong>
                        </p>
                      </div>
                      <div className="col-4">
                        <p>
                          $
                          {(book.price * book['order-book'].quantity).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="row">
                  <div className="col-8">
                    <h3>Total</h3>
                  </div>
                  <div className="col-4">
                    <h3>
                      $
                      {order.books
                        .reduce(
                          (accumulator, book) =>
                            accumulator +
                            book.price * parseInt(book['order-book'].quantity),
                          0
                        )
                        .toFixed(2)}
                    </h3>
                  </div>
                </div>
              </ul>
              <button
                onClick={this.handleSubmit}
                type="button"
                className="btn btn-success w-100"
                disabled={this.state.submitDisabled}
              >
                Place Order
              </button>
              <div
                className="alert alert-success mt-2"
                hidden={this.state.successHidden}
              >
                {' '}
                Order successfully placed! Thank you!{' '}
              </div>
              <div
                className="alert alert-danger mt-2"
                hidden={this.state.failHidden}
              >
                {' '}
                Error. Your cart is empty!{' '}
              </div>
            </div>
          </div>
        </div>
      </StripeProvider>
    ) : (
      <h1 className="text-center">Thank you for your order!</h1>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.user
})
const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => {
      dispatch(getCart(userId))
    },
    checkout: (orderId, userId) => {
      dispatch(checkout(orderId, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
