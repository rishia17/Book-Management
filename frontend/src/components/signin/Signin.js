import React from 'react'
import { useForm } from 'react-hook-form';
import { useState ,useEffect} from 'react';
import { userLoginThunk } from "../../redux/slices/userLoginSlice";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import './signin.css'
function Signin() {
    let { register, handleSubmit,formState:{errors} ,} = useForm();
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const {isPending,currentUser,errorStatus,errorMessage,loginStatus}=useSelector(state=>state.userLogin)
    //handle form submit
    function handleFormSubmit(userCred) {
        let actionObj=userLoginThunk(userCred)
        dispatch(actionObj)
    }
    
  useEffect(()=>{
    if (loginStatus){
      if (currentUser.userType==='user'){
        navigate('/user-profile')
      }
      if (currentUser.userType==='admin'){
        console.log("admin navigate")
        navigate("/admin-profile")
      }
    }
  },[loginStatus]);

  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow form1">
          <div className="card-title text-center border-bottom ">
            <h2 className="p-3">Signin</h2>
          </div>
          <div className="card-body ">
            {/* invalid cred err */}
            {errorStatus=== true && (
              <p className="text-center error-msg" style={{ color: "var(--crimson)" }}>
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* radio */}
              <div className="mb-4">
                <label
                  htmlFor="user"
                  className="form-check-label me-3"
                  style={{
                    fontSize: "1.2rem",
                    color: "text-danger",
                  }}
                >
                  Login as
                </label>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="admin"
                    value="admin"
                    {...register("userType")}
                  />
                  <label htmlFor="admin" className="form-check-label">
                    Admin
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="user"
                    value="user"
                    {...register("userType")}
                  />
                  <label htmlFor="user" className="form-check-label">
                    User
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  
                  {...register("userName")}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
  
                  {...register("password")}
                />
              </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
export default Signin