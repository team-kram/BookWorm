import React from 'react'
import {NavLink} from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <div>
        <NavLink to="admin/users">View All Users</NavLink>
      </div>
      <div>
        <NavLink to="admin/books">View All Books</NavLink>
      </div>
    </div>
  )
}

export default Admin
