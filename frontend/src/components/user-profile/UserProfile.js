import React from 'react'
import { NavLink ,Outlet} from 'react-router-dom'
function UserProfile() {
  return (
    <div>
      <div className="user-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
           to='books'
          >
            Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
             to="favourites"
          >
           Favourites
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
    </div>
  )
}

export default UserProfile