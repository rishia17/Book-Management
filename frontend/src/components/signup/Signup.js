import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Signup() {
    let [users, addformData] = useState([])
    let [err,setErr]=useState('')
    let { register, handleSubmit} = useForm();
    let navigate=useNavigate()
    //handle form submit
    async function onSignUpFormSubmit(userObj) {
        let res;
    if(userObj.userType==='user'){
    res=await axios.post('http://localhost:5500/user-api/user',userObj)
    }
    if(userObj.userType==='admin'){
      res=await axios.post('http://localhost:5500/admin-api/user',userObj)
      }
    if (res.data.message=='user created' || res.data.message=='admin created'){
      //navigate to signin
      navigate("/Signin")
    }else{
      setErr(res.data.message)
    }
    }
return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow form1">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signup</h2>
            </div>
            <div className="card-body">
              {/* user register error message */}
              {err.length!=0&&<p className="text-center text-dark">{err}</p>}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="admin"
                      value="admin"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="admin"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
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
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="userName" className="form-label">
                    UserName
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
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email")}
                  />
                </div>

                <div className="text-end">
                  <button
                    className='btn btn-primary'
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup