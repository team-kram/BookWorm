import React from 'react'
import {NavLink} from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <NavLink to="admin/users">View All Users</NavLink>
      <NavLink to="admin/books">View All Books</NavLink>
    </div>
  )
}

export default Admin
