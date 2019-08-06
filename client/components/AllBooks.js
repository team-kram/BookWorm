import React from 'react'
import {connect} from 'react-redux'
import {getBooks} from '../store/book'

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
          let {imageUrl, title, isbn, stock, price, id} = book
          return (
            <li key={book.id} className="list-group-item mb-3">
              <div className="row">
                <div className="col-4">
                  <img className="w-75" src={imageUrl} />
                </div>
                <div className="col-8">
                  <h2 className="text-center">{title}</h2>
                  <p className="text-center">ISBN: {isbn}</p>
                  <small>By: {book.author}</small>
                  <p>{book.description}</p>
                  <h4 className="text-center">{stock} in stock</h4>
                  <h3 className="text-center">Price: ${price}</h3>

                  <button
                    onClick={() => this.selectBook(id)}
                    type="button"
                    className="btn btn-success ml-4 w-100"
                  >
                    Select Book
                  </button>
                </div>
              </div>
            </li>
          )
        }
      })
    } else {
      return <h1 className="text-center">Loading...</h1>
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
