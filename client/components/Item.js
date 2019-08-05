import React, {Component} from 'react'

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      quantity: this.props.book['order-book'].quantity
    }
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({
      quantity: event.target.value
    })
  }
  toggleMode = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    if (this.state.editMode) {
      this.props.updateItem(
        this.props.book.id,
        this.props.orderId,
        this.state.quantity
      )
    }
    this.toggleMode()
  }
  render() {
    const {imageUrl, title, author, price, id} = this.props.book
    const quantity = this.props.book['order-book'].quantity
    return (
      <li className="mb-2">
        <div className="row">
          <div className="col-4">
            <img className="w-75" src={imageUrl} />
          </div>
          <div className="col-8">
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Price per book: ${price}</p>
            <form onSubmit={this.handleSubmit}>
              <p>
                Quantity:{' '}
                {this.state.editMode ? (
                  <input
                    type="number"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                ) : (
                  quantity
                )}
              </p>
              <p>Total price: ${(price * quantity).toFixed(2)}</p>
              <button
                onClick={() => this.props.handleRemove(id)}
                type="button"
                className="btn btn-danger"
              >
                Remove
              </button>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-secondary ml-2"
              >
                {this.state.editMode ? 'Save' : 'Edit Quantity'}
              </button>
            </form>
          </div>
        </div>
      </li>
    )
  }
}
