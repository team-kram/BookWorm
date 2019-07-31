import React from 'react'
import {connect} from 'react-redux'
import {getBooks, deleteBook} from '../store/book'

class AllBooks extends React.Component {
  constructor(props) {
    super(props)
    this.renderList = this.renderList.bind(this)
  }
  componentDidMount() {
    this.props.getBooks()
  }
  renderList() {
    if (this.props.books) {
      const arr = Object.keys(this.props.books)
      return arr.map(key => {
        let book = this.props.books[key]
        return (
          <li key={book.id} className="list-group-item mb-3">
            <div className="row">
              <div className="col-4">
                <img className="h-75" src={book.imageUrl} />
              </div>
              <div className="col-8">
                <h3>{book.title}</h3>
                <small>By: {book.author}</small>
                <p>{book.description}</p>
                <p>{book.isbn}</p>
                <p>${book.price}</p>
                <button className="btn btn-success" type="button">
                  Add to Cart
                </button>
                <button
                  onClick={() => this.props.deleteBook(book)}
                  className="btn btn-danger ml-4"
                  type="button"
                >
                  Remove book
                </button>
              </div>
            </div>
          </li>
        )
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
