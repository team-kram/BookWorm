import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findBook} from '../store/book'
import {updateCart} from '../store/order'

class SingleBook extends Component {
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
  handleChange = event => {
    //arrow
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.props.user.id)
    if (this.props.isLoggedIn) {
      this.props.updateCart(
        this.props.match.params.bookId,
        this.props.user.id,
        this.state.quantity
      )
    }
    this.props.history.push('/books')
  }

  render() {
    return Object.keys(this.state.book).length ? (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img className="w-100" src={this.state.book.imageUrl} />
          </div>
          <div className="col-8">
            <h1>{this.state.book.title}</h1>
            <p>by: {this.state.book.author}</p>
            <p>{this.state.book.description}</p>
            <h3 className="text-center">
              Only {this.state.book.stock} copies left!
            </h3>
            <form onSubmit={this.handleSubmit} className="mx-auto">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  aria-describedby="quantity"
                  placeholder="Enter quantity"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add to cart
                </button>
              </div>
              <div className="form-group">
                <h3>
                  ${(this.state.quantity * this.state.book.price).toFixed(2)}
                </h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    findBook: bookId => {
      dispatch(findBook(bookId))
    },
    updateCart: (bookId, userId, quantity) => {
      dispatch(updateCart(bookId, userId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
