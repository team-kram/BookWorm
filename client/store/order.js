import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE ORDER'

const defaultOrder = {}

const gotOrders = order => ({
  type: GOT_ORDER,
  order
})
const removeOrder = order => ({
  type: REMOVE_ORDER,
  order
})
const gotSingleOrder = order => ({
  type: GOT_SINGLE_ORDER,
  order
})

export const getOrders = () => async dispatch => {
  try {
    let {data: orders} = await axios.get('/api/orders')
    orders = orders.reduce((accumulator, current) => {
      accumulator[current.id] = current
      return accumulator
    }, {})
    dispatch(gotOrders(orders))
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

export const getSingleOrder = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotSingleOrder(data))
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
