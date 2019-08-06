import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findBook, updateBook} from '../store/book'

class EditBook extends Component {
  constructor(props) {
    super(props)
    this.state = {book: {}, quantity: 0}
  }
  componentDidMount() {
    this.props.findBook(this.props.match.params.bookId)
  }
  componentWillReceiveProps(props) {
    if (props.books.currentBookId) {
      this.setState({book: props.books[props.books.currentBookId]})
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const book = {
      id: this.state.book.id,
      title: e.target.title.value,
      author: e.target.author.value,
      description: e.target.description.value,
      stock: e.target.stock.value,
      imageUrl: e.target.imageUrl.value,
      price: e.target.price.value,
      isbn: e.target.isbn.value,
      genre: e.target.isbn.value
    }
    this.props.updateBook(book)
  }

  render() {
    const {
      title,
      author,
      description,
      stock,
      imageUrl,
      price,
      isbn,
      genre
    } = this.state.book
    const {book} = this.state
    return Object.keys(book).length ? (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img className="w-100" src={imageUrl} />
          </div>
          <div className="col-8">
            <h3>Title: {title}</h3>
            <p>Author: {author}</p>
            <p>Genre: {genre}</p>
            <p>Description: {description}</p>
            <p>ImageUrl: {imageUrl}</p>
            <p>ISBN: {isbn}</p>
            <h5>Stock: {stock} copies</h5>
            <h5>Price: ${price}</h5>
          </div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit} className="mx-auto">
            <h4>Edit Book:</h4>
            <label>
              Title:
              <input type="text" name="title" />
            </label>
            <label>
              Author:
              <input type="text" name="author" />
            </label>
            <label>
              Genre:
              <input type="text" name="genre" />
            </label>
            <label>
              Description:
              <textarea type="text" name="description" />
            </label>
            <label>
              ImageUrl:
              <input type="text" name="imageUrl" />
            </label>
            <label>
              ISBN:
              <input type="text" name="isbn" />
            </label>
            <label>
              Stock:
              <input type="number" name="stock" />
            </label>
            <label>
              Price:
              <input type="number" name="price" />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    ) : (
      <h1 className="text-center">Book not found</h1>
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
    findBook: bookId => {
      dispatch(findBook(bookId))
    },
    updateBook: book => {
      dispatch(updateBook(book))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook)
