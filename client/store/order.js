import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const UPDATE_ORDER = 'UPDATE ORDER'

const defaultOrder = {}

const gotOrders = order => ({
  type: GET_ORDER,
  order
})
const removeOrder = order => ({
  type: REMOVE_ORDER,
  order
})

export const getOrders = () => async dispatch => {
  try {
    let {data: orders} = await axios.get('/api/orders')
    orders = orders.reduce((accumulator, current) => {
      accumulator[current.orderNumber] = current
      return accumulator
    }, {})
    dipatch(gotOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

export const getDeleteOrder = id => {
  return async dispatch => {
    await axios.delete(`/api/orders/${id}`)
    const {data} = await axios.get('/api/orders')
    dispatch(removeOrder(data))
  }
}

export default (orders = defaultOrder, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    case REMOVE_ORDER:
      return action.order
    default:
      return orders
  }
}
