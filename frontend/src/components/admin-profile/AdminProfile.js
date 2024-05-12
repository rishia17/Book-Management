import React from 'react'
import { NavLink ,Outlet} from 'react-router-dom'
function AdminProfile() {
  return (
    <div>
      <div className="admin-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
           to='books'
          //  style={{color:'black'}}
          >
            Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
             to="dashboard"
            // style={{color:'black'}}
          >
          Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
             to="add-book"
            // style={{color:'b'}}
          >
          AddBook
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
    </div>
  )
}

export default AdminProfile