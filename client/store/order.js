import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const UPDATE_ORDER = 'UPDATE ORDER'

const defaultOrder = {}

const gotOrder = order => ({
  type: GET_ORDER,
  order
})
const removeOrder = id => ({
  type: REMOVE_ORDER,
  id
})

export const getOrder = () => async dispatch => {
  try {
    const orders = await axios.get('/api/orders')
    dispatch(gotOrder(orders.data))
  } catch (err) {
    console.error(err)
  }
}

export const getDeleteOrder = id => {
  return async dispatch => {
    await Axios.delete(`/api/orders/${id}`)
    const {data} = await Axios.get('/api/orders')
    dispatch(removeOrder(data))
  }
}

export default (orders = defaultOrder, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order

    default:
      return orders
  }
}
