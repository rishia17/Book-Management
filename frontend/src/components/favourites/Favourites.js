import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { current } from '@reduxjs/toolkit'
import { useSelector ,useDispatch} from "react-redux";
import {useNavigate,Outlet} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function Favourites() {


  const { loginStatus, currentUser } = useSelector((state) => state.userLogin);
  const {state,state1}=useLocation();
  const token=sessionStorage.getItem('token')
  
  const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })

    const [bookList, setBookList] = useState([]);
    let [err,setErr]=useState('')

    let navigate=useNavigate()
  const getBooks=async()=>{
    let res=await axiosWithToken.get(`http://localhost:5500/user-api/favourites/${currentUser.userName}`)
    console.log("boookssss",res)
    if (res.data.message==="Books found"){
      setBookList(res.data.payload)
    }
  }
  const removeFavourites=async(books)=>{
    let art={...books}
    delete art._id;
    let res= await axiosWithToken.put(`http://localhost:5500/user-api/remove-favourite/${currentUser.userName}`,art)
    if (res.data.message==="Username removed from favourites"){
      const updatedBookList = bookList.map(book => {
        if (book.bookId === art.bookId) {
            // Remove the currentUser.userName from the favourites array
            const updatedFavourites = book.favourites.filter(username => username !== currentUser.userName);
            return { ...book, favourites: updatedFavourites };
        } else {
            return book;
        }
    });
    setBookList(updatedBookList);
    navigate('/user-profile/books')
    }else{
      setErr(res.data.message)
    }
  }
  
  useEffect(()=>{
    getBooks()
  },[])
  return (
    <div>
    {bookList.length===0?(<p className='display-2  text-center'>No Books found</p>):
   (<div>

    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
      {bookList.map((books) => (
        <div className="col" key={books.booksId}  >
          <div className="card h-30 w-30" >
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight:"bold"}}>{books.title}</h5>
              <img src={`${books.imageUrl}`} style={{height:"40%", width: "40%" ,objectFit: "contain" }}></img>
              <h4 className='card-text'>Author:{`${books.author}`}</h4>
              <button className='btn btn-warning' onClick={()=>removeFavourites(books)}>remove</button>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated on {books.dateOfModification}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  
     
    <Outlet />
  </div>)
      }
    </div>
  )
}

export default Favourites