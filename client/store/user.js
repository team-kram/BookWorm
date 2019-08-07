import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_USERS = 'GOT_ALL_USERS'
const GOT_USER = 'GOT_USER'
const REMOVE_USER = 'REMOVE_USER'
const CREATE_USER = 'CREATE_USER'
const DELETED_USER = 'DELETED_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const gotAllUsers = users => ({type: GOT_ALL_USERS, users})
const gotUser = user => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const createUser = user => ({type: CREATE_USER, user})
const deletedUser = user => ({type: DELETED_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    dispatch(gotUser(res.data))
    res.data.admin ? history.push('/admin') : history.push('/books')
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addUser = (
  email,
  password,
  username,
  address
) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {
      email,
      password,
      username,
      address
    })
    dispatch(createUser(res))
    history.push('/books')
  } catch (err) {
    console.error(err)
  }
}

export const getAllUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users')
    dispatch(gotAllUsers(users))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = user => async dispatch => {
  try {
    await axios.delete(`/api/users/${user}`)
    dispatch(deletedUser(user))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return {...state.users, users: action.users}
    case GOT_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CREATE_USER:
      return action.user
    case DELETED_USER:
      return defaultUser
    default:
      return state
  }
}
