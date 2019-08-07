import React from 'react'
import {connect} from 'react-redux'
import {getAllUsers, removeUser} from '../store/user'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  selectUser = id => {
    this.props.history.push(`/admin/users/edit/${id}`)
  }
  deleteUser = user => {
    this.props.deleteUser(user)
  }
  renderList = () => {
    if (this.props.users) {
      const users = this.props.users
      return users.map(user => {
        const {id, name, email, address, googleId, admin} = user
        return (
          <React.Fragment>
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{address}</td>
              <td>{googleId}</td>
              <td>{admin}</td>
              <td>
                <button onClick={() => this.selectUser(id)} type="button">
                  Edit Book
                </button>
              </td>
              <td>
                <button onClick={() => this.deleteUser(user)} type="button">
                  Delete Book
                </button>
              </td>
            </tr>
          </React.Fragment>
        )
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
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>GoogleID</th>
            <th>Admin</th>
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
    users: state.users
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers())
    },
    deleteUser: user => {
      dispatch(deleteUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
