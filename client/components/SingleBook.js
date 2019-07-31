import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findBook} from '../store/book'

class SingleBook extends Component {
  constructor(props) {
    super(props)
    this.state = {book: {}, quantity: 0}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.findBook(this.props.match.params.bookId)
  }
  componentWillReceiveProps(props) {
    if (props.books.currentBookId) {
      this.setState({book: props.books[props.books.currentBookId]})
    }
  }
  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return Object.keys(this.state.book).length ? (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src={this.state.book.imageUrl} />
          </div>
          <div className="col-8">
            <h1>{this.state.book.title}</h1>
            <p>by: {this.state.book.author}</p>
            <p>{this.state.book.description}</p>
            <h3 className="text-center">
              Only {this.state.book.stock} copies left!
            </h3>
            <form className="mx-auto">
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
    books: state.books
  }
}
function mapDispatchToProps(dispatch) {
  return {
    findBook: bookId => {
      dispatch(findBook(bookId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)