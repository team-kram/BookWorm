import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GOT_CART = 'GOT_CART'
const GOT_COMPLETED = 'GOT_COMPLETED'
const UPDATED_CART = 'UPDATED_CART'
const UPDATED_ITEM = 'UPDATED_ITEM'
const DELETED_ITEM = 'DELETED_ITEM'

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

const gotUpdatedCart = cart => ({
  type: UPDATED_CART,
  cart
})

const gotUpdatedItem = item => ({
  type: UPDATED_ITEM,
  item
})

const deletedItem = item => ({
  type: DELETED_ITEM,
  item
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

export const updateCart = (bookId, userId, quantity) => async dispatch => {
  const update = {id: bookId, quantity}
  const {data: updatedCart} = await axios.put(
    `/api/orders/addToCart/${userId}`,
    update
  )
  dispatch(gotUpdatedCart(updatedCart))
}

export const updateItem = (bookId, orderId, quantity) => async dispatch => {
  const update = {bookId, orderId, quantity}
  const {data: updatedItem} = await axios.put(`/api/orders/editCart`, update)
  dispatch(gotUpdatedItem(updatedItem))
}

export const deleteItem = (bookId, orderId) => async dispatch => {
  const body = {bookId, orderId}
  console.log(body)
  await axios.delete(`/api/orders/removeCart`, {data: body})
  dispatch(deletedItem(body))
}

// state = {completedOrders: {orders where completed is true, id has to match userId}, cart: {order where completed is false}}
export default (state = {completedOrders: [], cart: {}}, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return {...state, completedOrders: action.order}
    case REMOVE_ORDER:
      return {...state, completedOrders: action.order}
    case GOT_CART:
      const oldCart = action.cart[0]
      return {...state, cart: oldCart}
    case GOT_COMPLETED:
      return {...state, completedOrders: action.completed}
    case UPDATED_CART:
      const cartCopy = {...state.cart}
      cartCopy.books = action.cart
      return {...state, cart: cartCopy}
    case UPDATED_ITEM:
      const newCart = {...state.cart}
      newCart.books = newCart.books.forEach(book => {
        if (book.id === action.item.bookId) {
          book['order-book'].quantity = action.item.quantity
        }
      })
      return {...state, cart: newCart}
    case DELETED_ITEM:
      const copyCart = {...state.cart}
      copyCart[0].books = copyCart[0].books.filter(
        book => book.id !== action.item.bookId
      )
      return {...state, cart: copyCart}
    default:
      return {...state}
  }
}
