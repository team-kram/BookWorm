import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/order'

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getOrders()
  }
  render() {
    if (this.props.orders) {
      const arr = Object.keys(this.props.orders)
      
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
