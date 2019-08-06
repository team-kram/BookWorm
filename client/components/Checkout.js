import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCompleted} from '../store/order'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCompleted()
  }
  render() {
    const id = this.props.match.params.id
    const order = this.props.completedOrders[id]
    return order ? (
      <div className="container">
        <h1>Thank you for your order! </h1>
        <h3>Order Summary</h3>
        <ul className="card">
          {order.books.map(book => (
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
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="card my-3">
          <h3>Shipping Information</h3>
          <hr />
          <p>Name: {this.props.user.name}</p>
          <p>Address: {this.props.user.address}</p>
          <p>Email: {this.props.user.email}</p>
        </div>
        <h3 className="text-danger">Total: $</h3>
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    completedOrders: state.orders.completedOrders.reduce(
      (accumulator, order) => {
        accumulator[order[order.id]] = order
        return accumulator
      },
      {}
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCompleted: () => {
      dispatch(getCompleted())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
