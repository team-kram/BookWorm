import React from 'react'
import {connect} from 'react-redux'
import {getBooks, deleteBook} from '../store/book'

class AllBooks extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }
  selectBook = id => {
    this.props.history.push(`/books/${id}`)
  }
  renderList = () => {
    if (this.props.books) {
      const arr = Object.keys(this.props.books)
      return arr.map(key => {
        if (key !== 'currentBookId') {
          let book = this.props.books[key]
          return (
            <li key={book.id} className="list-group-item mb-3">
              <div className="row">
                <div className="col-4">
                  <img className="w-75" src={book.imageUrl} />
                </div>
                <div className="col-8">
                  <h2 className="text-center">{book.title}</h2>
                  <p className="text-center">ISBN: {book.isbn}</p>
                  <small>By: {book.author}</small>
                  <p>{book.description}</p>
                  <h4 className="text-center">{book.stock} in stock</h4>
                  <h3 className="text-center">Price: ${book.price}</h3>
                  <div className="row">
                    <div className="col-6">
                      <button
                        onClick={() => this.selectBook(book.id)}
                        type="button"
                        className="btn btn-success ml-4 w-75"
                      >
                        Select Book
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={() => this.props.deleteBook(book)}
                        className="btn btn-danger ml-4 w-75"
                        type="button"
                      >
                        Remove book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        }
      })
    } else {
      return <h1>Loading...</h1>
    }
  }

  render() {
    return (
      <div className="container">
        <ul className="list-group">{this.renderList()}</ul>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
