import axios from 'axios'

const GOT_BOOKS = 'GOT_BOOKS'
const DELETED_BOOK = 'DELETED_BOOK'
const FOUND_BOOK = 'FOUND_BOOK'

// Action creators
const gotBooks = books => {
  return {
    type: GOT_BOOKS,
    books
  }
}

// const deletedBook = book => {
//   return {
//     type: DELETED_BOOK,
//     book
//   }
// }

const deletedBook = book => ({
  type: DELETED_BOOK,
  book
})

const foundBook = book => ({
  type: FOUND_BOOK,
  book
})

// Thunk creators

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
export const findBook = id => async dispatch => {
  try {
    const {data: book} = await axios.get(`/api/books/${id}`)
    dispatch(foundBook(book))
  } catch (error) {
    console.log(error)
  }
}

const booksReducer = (state = {currentBookId: null}, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return {...action.books, currentBookId: null}
    case DELETED_BOOK:
      let copyState = {...state}
      delete copyState[action.book.isbn]
      return copyState
    case FOUND_BOOK:
      let isbn = action.book.isbn
      return {...state, [isbn]: action.book, currentBookId: isbn}
    default:
      return state
  }
}

export default booksReducer
