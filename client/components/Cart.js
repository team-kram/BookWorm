import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/order'
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
      console.log('put logic here')
    } else {
      const cart = JSON.parse(storage.getItem('cart'))
      cart.books = cart.books.filter(book => book.id !== bookId)
      storage.setItem('cart', JSON.stringify(cart))
      this.setState(cart)
    }
  }
  handleRemoveAll = () => {
    if (this.props.isLoggedIn) {
      console.log('put logic here')
    } else {
      const cart = {
        completed: false,
        books: []
      }
      storage.setItem('cart', JSON.stringify(cart))
      this.setState(cart)
    }
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
                <li className="mb-2" key={book.id}>
                  <div className="row">
                    <div className="col-4">
                      <img className="w-75" src={book.imageUrl} />
                    </div>
                    <div className="col-8">
                      <h3>{book.title}</h3>
                      <p>Author: {book.author}</p>
                      <p>Price per book: ${book.price}</p>
                      <p>Quantity: {book['order-book'].quantity}</p>
                      <p>
                        Total price: ${(
                          book.price * book['order-book'].quantity
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() => this.handleRemove(book.id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                      <button type="button" className="btn btn-secondary ml-2">
                        Edit Quantity
                      </button>
                    </div>
                  </div>
                </li>
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

            <button type="button" className="btn btn-success w-100">
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
  cart: state.orders.cart[0],
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCart(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
