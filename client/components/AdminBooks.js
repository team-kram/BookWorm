import React from 'react'
import {connect} from 'react-redux'
import {getBooks, deleteBook} from '../store/book'

class AdminBooks extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }
  selectBook = id => {
    this.props.history.push(`/admin/books/edit/${id}`)
  }
  deleteBook = id => {
    this.props.deleteBook(id)
  }
  renderList = () => {
    if (this.props.books) {
      const arr = Object.keys(this.props.books)
      return arr.map(key => {
        if (key !== 'currentBookId') {
          let book = this.props.books[key]
          let {title, isbn, stock, price, id, genre} = book
          return (
            <React.Fragment>
              <tr key={book.id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{genre}</td>
                <td>{isbn}</td>
                <td>{stock}</td>
                <td>{price}</td>
                <td>
                  <button onClick={() => this.selectBook(id)} type="button">
                    Edit Book
                  </button>
                </td>
                <td>
                  <button onClick={() => this.deleteBook(book)} type="button">
                    Delete Book
                  </button>
                </td>
              </tr>
            </React.Fragment>
          )
        }
      })
    } else {
      return <h1 className="text-center">Loading...</h1>
    }
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Stock</th>
            <th>Price</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getBooks: () => {
      dispatch(getBooks())
    },
    deleteBook: book => {
      dispatch(deleteBook(book))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooks)
