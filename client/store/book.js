import axios from 'axios'

const GOT_BOOKS = 'GOT_BOOKS'
const DELETED_BOOK = 'DELETED_BOOK'

// Action creators
const gotBooks = books => {
  return {
    type: GOT_BOOKS,
    books
  }
}
const deletedBook = book => {
  return {
    type: DELETED_BOOK,
    book
  }
}

// Thunk creator

export const getBooks = () => async dispatch => {
  try {
    let {data: books} = await axios.get('/api/books')
    books = books.reduce((accumulator, current) => {
      accumulator[current.isbn] = current
      return accumulator
    }, {})
    dispatch(gotBooks(books))
  } catch (error) {
    console.log(error)
  }
}

export const deleteBook = book => async dispatch => {
  try {
    await axios.delete(`/api/books/${book.id}`)
    dispatch(deletedBook(book))
  } catch (error) {
    console.log(error)
  }
}

const booksReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    case DELETED_BOOK:
      let copyState = {...state}
      delete copyState[action.book.isbn]
      return copyState
    default:
      return state
  }
}

export default booksReducer
