import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCompleted} from '../store/order'

class Orders extends Component {
  componentDidMount() {
    this.props.getCompletedOrders(this.props.userId)
  }

  render() {
    return this.props.completedOrders ? (
      <div className="container">
        {this.props.completedOrders.map(order => (
          <div key={order.id} className="container w-75">
            <h1>Order Number: {order.id}</h1>
            <ul>
              {order.books.map(book => (
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
        ))}
      </div>
    ) : (
      <h1>Loading...</h1> //no completed orers
    )
  }
}

const mapStateToProps = state => ({
  completedOrders: state.orders.completedOrders,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCompletedOrders: userId => {
    dispatch(getCompleted(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
