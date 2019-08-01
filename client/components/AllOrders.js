import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/order'
import {getDeleteOrder} from '../store/order'

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
  }

  DeleteOrder(id) {
    this.props.getDeleteOrder(id)
  }

  componentDidMount() {
    this.props.getOrders()
  }
  render() {
    if (this.props.orders) {
      const arr = Object.keys(this.props.orders)
      return arr.map(orderNumber => {
        let order = this.props.orders[orderNumber]
        return (
          <li key={order.id} className="list-group-item mb-3">
            <div className="col-8">
              <h3>{order.orderNumber}</h3>
              <small>By: {order.user.name}</small>
              <p>{order.user.address}</p>
              <button
                className="btn btn-danger ml-5"
                onClick={() => this.DeleteOrder(order.id)}
              >
                Remove
              </button>
            </div>
          </li>
        )
      })
    }
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => {
      dispatch(getOrders())
    },
    getDeleteOrder: id => {
      dispatch(getDeleteOrder(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
