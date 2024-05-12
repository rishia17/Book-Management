import React from 'react'
import { NavLink, Navigate } from "react-router-dom";
import '../head/head.css';
import { useSelector ,useDispatch} from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";

function Head() {
  const { loginStatus, currentUser } = useSelector(state => state.userLogin);
  let dispatch = useDispatch();

  function signout(){
    dispatch(resetState())
  }
  return (
    <div className="container1" style={{backgroundColor:"#7300e6"}}>   
    <div className="one ">
       
      <div className="nav d-flex justify-content-end headings">
        <h2 style={{textAlign:"left",marginRight:"auto",marginLeft:"20px"}}>Book Store</h2>
        {
          loginStatus === false ? 
          <>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="signin">
                Signin
              </NavLink>
            </li>
           </> :
          <>
            {/* <li className="nav-item">
              <p className="nav-link text-dark">{currentUser.username}({currentUser.userType})</p>
            </li> */}
             <li className="nav-item">
            <NavLink
                className="nav-link"
                to="signin"
                style={{ color: "var(--light-grey)" }}
                onClick={signout}
              >
                 <span className="lead  fs-4 me-3 fw-1"  style={{ color: "white" ,fontSize:'0.8rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.userName}
                 <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
                 </span>
                Signout
              </NavLink>
            </li>
          </>
        }  
      </div>
    </div>
  </div> 
  )
}

export default Head