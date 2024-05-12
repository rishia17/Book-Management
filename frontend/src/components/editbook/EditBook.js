import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from "axios";


function EditBook() {
    let{ register,handleSubmit}=useForm()
    const { state ,state1} = useLocation();
    const navigate=useNavigate();
    const token=sessionStorage.getItem('token')
    let [err,setErr]=useState('')
    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })
    const saveModifiedBook=async(editedBook)=>{
        let modifiedBook = { ...state, ...editedBook };
        //change date of modification
        console.log(state)
        console.log(modifiedBook)
        console.log(editedBook)
        modifiedBook.dateOfModification = new Date();
        //remove _id
        delete modifiedBook._id;
        let res=await axiosWithToken.put('http://localhost:5500/admin-api/edit',modifiedBook)
        console.log(res)
        if (res.data.message === "book modified") {
            navigate(`/admin-profile/books`, {
              state: res.data.book,
            });
          }
          else{
            setErr(res.data.message);
          }
        };
        




  return (
        
    <div className="container">
    <div className="row justify-content-center mt-5 ">
        <div className="col-lg-8 col-md-8 col-sm-10 ">
            <div className="card shadow ">
                <div className="card-title text-center border-bottom ">
                    <h2 className="p-3">Add a Book</h2>
                </div>
                <div className="card-body" >
                        <form onSubmit={handleSubmit(saveModifiedBook)} >
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        {...register("title")}
                        defaultValue={state.title}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="category" className="form-label">
                        Select a category
                      </label>
                      <select
                        {...register("category")}
                        id="category"
                        className="form-select"
                        defaultValue={state.category}
                      >
                        <option value="programming">Programming</option>
                        <option value="AI&ML">AI&ML</option>
                        <option value="database">Database</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="author" className="form-label">
                        Author
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="author"
                        {...register("author")}
                        defaultValue={state.author}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="imageUrl" className="form-label">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        {...register("imageUrl")}
                        defaultValue={state.imageUrl}
                      />
                    </div>
                    <div className="text-end">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                    </div>
              </form>
              </div>
                    </div>
                </div>
            </div>
        </div>

      )
}

export default EditBook