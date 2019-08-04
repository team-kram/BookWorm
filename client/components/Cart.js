import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/order'

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
      let storage = window.localStorage
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

  render() {
    const cart = this.state
    return Object.keys(cart).length ? (
      <div className="container">
        <ul>
          {cart.books.map(book => (
            <li key={book.id}>
              <div className="row">
                <div className="col-4">
                  <img className="w-75" src={book.imageUrl} />
                </div>
                <div className="col-8">
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Price: {book.price}</p>
                  <p>Quantity: {book['order-book'].quantity}</p>
                  <p>
                    Total price: ${(
                      book.price * book['order-book'].quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
