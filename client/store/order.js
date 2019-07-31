import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const UPDATE_ORDER = 'UPDATE ORDER'

const defaultOrder = {}

const gotOrder = order => ({
  type: GET_ORDER,
  order
})
const removeOrder = () => ({
  type: REMOVE_ORDER
})

export const getOrder = () => async dispatch => {
  try {
    const orders = await axios.get('/api/orders')
    dispatch(gotOrder(orders.data))
  } catch (err) {
    console.error(err)
  }
}

export default (ordersReducer = (orders = defaultOrder, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order

    default:
      return orders
  }
})
