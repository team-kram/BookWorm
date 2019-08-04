import React from 'react'

class Home extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
  }
  render() {
    return (
      <div className="Home">
        <div className="overlay" />
        <div className="m-auto container home-content w-50">
          <h3 className="display-3">Search for books</h3>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus iste
            cum doloremque, doloribus amet quam tenetur veniam obcaecati quia
            necessitatibus nisi, iusto minus, quibusdam animi eum laborum
            consequatur veritatis possimus!
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg home-input-prepend form-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  <i className="fa fa-search" aria-hidden="true" />
                </span>
              </div>
              <input
                type="text"
                className="form-control home-input"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Home
