import React, {Component} from 'react'
import {
  CardElement,
  PostalCodeElement,
  injectStripe
} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit() {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    if (Object.keys(token).length) {
      this.props.confirm()
    }
  }

  render() {
    return (
      <div className="checkout">
        <div className="form-element my-3">
          <p>
            Card Details <span className="text-danger">*</span>{' '}
          </p>
          <CardElement style={{base: {fontSize: '18px'}}} />
        </div>

        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={this.submit}
        >
          Confirm
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
