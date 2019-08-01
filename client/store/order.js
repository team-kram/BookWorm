import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE ORDER'
const GOT_CART = 'GOT_CART'
const GOT_COMPLETED = 'GOT_COMPLETED'

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
const gotCart = cart => ({
  type: GOT_CART,
  cart
})

// gets completed orders for current user
const gotCompleted = completed => ({
  type: GOT_COMPLETED,
  completed
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

export const getCart = userId => async dispatch => {
  const {data: cart} = await axios.get(`/api/orders/${userId}`)
  dispatch(gotCart(cart))
}

export const getCompleted = userId => async dispatch => {
  const {data: completedOrders} = await axios.get(
    `/api/orders/completed/${userId}`
  )
  dispatch(gotCompleted(completedOrders))
}

// state = {completedOrders: {orders where completed is true, id has to match userId}, cart: {order where completed is false}}
export default (state = {completedOrders: [], cart: {}}, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return {...state, completedOrders: action.order}
    case REMOVE_ORDER:
      return {...state, completedOrders: action.order}
    case GOT_CART:
      return {...state, cart: action.cart}
    case GOT_COMPLETED:
      return {...state, completedOrders: action.completed}
    default:
      return {...state}
  }
}
