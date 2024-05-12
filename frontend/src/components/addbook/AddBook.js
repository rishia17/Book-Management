import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AddBook() {
    let { register, handleSubmit } = useForm();
    let {currentUser} = useSelector(
        (state) => state.userLogin
    );
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    const token=sessionStorage.getItem('token')
    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })


    const postNewBook=async(newBook) =>{
        newBook.bookId=Date.now();
        newBook.dateOfCreation=new Date();
        newBook.dateOfModification= new Date();
        newBook.status=true;
        newBook.favourites=[];
        
        // make http post request to author api
        let res=await axiosWithToken.post('http://localhost:5500/admin-api/new-book',newBook)
        if(res.data.message==="new book is added"){
            //navigate for articles author component
              navigate(`/admin-profile/books`)
        }else{
            setErr(res.data.message)
        }
    }
        
  

    return (
        <div className="container">
            <div className="row justify-content-center mt-5 ">
                <div className="col-lg-8 col-md-8 col-sm-10 ">
                    <div className="card shadow ">
                        <div className="card-title text-center border-bottom ">
                            <h2 className="p-3">Add a Book</h2>
                        </div>
                        <div className="card-body   " >
                            <form onSubmit={handleSubmit(postNewBook)}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        {...register("title")}
                                    />
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
                                    >
                                        <option value="programming">Programming</option>
                                        <option value="AI&ML">AI&ML</option>
                                        <option value="database">Database</option>
                                        <option value="other">other</option>
                                    </select>
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
                                    />
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary">
                                        ADD
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

export default AddBook;
