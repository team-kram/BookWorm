import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, deleteItem, updateItem} from '../store/order'
import Item from './Item'
import StripeCheckout from './StripeCheckout'

const storage = window.localStorage
class Cart extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCart(this.props.userId)
      this.setState(this.props.cart)
    } else {
      let cart = JSON.parse(storage.getItem('cart'))
      if (!cart) {
        cart = {
          completed: false,
          books: []
        }
        storage.setItem('cart', JSON.stringify(cart))
      }
      this.setState(cart)
    }
  }
  componentWillReceiveProps(props) {
    if (props.cart) {
      this.setState(props.cart)
    }
  }
  handleRemove = bookId => {
    if (this.props.isLoggedIn) {
      this.props.deleteItem(bookId, this.state.id)
    } else {
      const cart = JSON.parse(storage.getItem('cart'))
      cart.books = cart.books.filter(book => book.id !== bookId)
      storage.setItem('cart', JSON.stringify(cart))
      this.setState(cart)
    }
  }
  handleRemoveAll = () => {
    if (this.props.isLoggedIn) {
      console.log('do something')
    } else {
      const cart = {
        completed: false,
        books: []
      }
      storage.setItem('cart', JSON.stringify(cart))
      this.setState(cart)
    }
  }

  changeLocal = cart => {
    this.setState(cart)
  }

  render() {
    const cart = this.state
    return Object.keys(cart).length ? (
      <div className="container">
        <h1>Cart</h1>
        <div className="row">
          <div className="col-8 cart-items">
            <ul>
              {cart.books.map(book => (
                <Item
                  key={book.id}
                  book={book}
                  handleRemove={this.handleRemove}
                  updateItem={this.props.updateItem}
                  orderId={cart.id}
                  isLoggedIn={this.props.isLoggedIn}
                  changeLocal={this.changeLocal}
                />
              ))}
            </ul>
          </div>
          <div className="col-4 p-3 h-auto checkout-box">
            <h4>
              Subtotal ({cart.books.reduce(
                (accumulator, book) =>
                  accumulator + parseInt(book['order-book'].quantity),
                0
              )}{' '}
              Items) :{' '}
              <span className="text-danger">
                ${cart.books
                  .reduce((accumulator, book) => {
                    return (
                      accumulator + book.price * book['order-book'].quantity
                    )
                  }, 0)
                  .toFixed(2)}
              </span>
            </h4>
            <hr />

            <button
              type="button"
              onClick={() => this.props.history.push('/checkout')}
              className="btn btn-success w-100"
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => this.props.history.push('/books')}
              className="btn btn-warning mt-2 w-100"
            >
              Continue shopping
            </button>
            <button
              onClick={this.handleRemoveAll}
              type="button"
              className="btn btn-danger mt-2 w-100"
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.cart,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCart(userId))
  },
  deleteItem: (bookId, orderId) => {
    dispatch(deleteItem(bookId, orderId))
  },
  updateItem: (bookId, orderId, quantity) => {
    dispatch(updateItem(bookId, orderId, quantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
