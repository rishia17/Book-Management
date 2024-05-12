import {useState,useEffect} from 'react';
import {useNavigate,Outlet} from 'react-router-dom'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector ,useDispatch} from "react-redux";

function Books() {

    let { register, handleSubmit } = useForm();
    const { loginStatus, currentUser } = useSelector((state) => state.userLogin);
  const [bookList, setBookList] = useState([]);
  const token=sessionStorage.getItem('token')
  
  const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })
    let [err,setErr]=useState('')
    let navigate=useNavigate()
    let [bookEditStatus, setBookEditStatus] = useState(false);
    let [bookDeleteStatus,setBookDeleteStatus]=useState(true)
    let [currentBook, setCurrentBook] = useState("");



  const getAllBooks=async()=>{
    let res;
    if (currentUser.userType==="admin"){
         res=await axiosWithToken.get(`http://localhost:5500/admin-api/books`)
    }
    else{
         res=await axiosWithToken.get(`http://localhost:5500/user-api/books`)
    }
    console.log("res",res)
    if(res.data.message==='all books'){
      setBookList(res.data.payload)
    }else{
      setErr(res.data.message)
    }
    
  }

    
  const deleteBook = async (bookToDelete) => {
    try {
        // Delete the book
        let art={...bookToDelete};
        delete art._id;
        const res = await axiosWithToken.put(`http://localhost:5500/admin-api/books/${bookToDelete.bookId}`,art);
        console.log("deletebook",res)
        if (res.data.message === "book deleted") {
            // Update the book status in the bookList
            const updatedBookList = bookList.map(book => {
                if (book.bookId === bookToDelete.bookId) {
                    return { ...book, status: false }; // Mark as deleted
                } else {
                    return book;
                }
            });
            console.log("deletebook",updatedBookList)
            setBookList(updatedBookList);
        } else {
            setErr(res.data.message);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        setErr("An error occurred while deleting the book.");
    }
};

  
  

  const restoreBook=async(books)=>{
    let book={...books};
    delete book._id;
    console.log("restore working",book)
    let res=await axiosWithToken.put(`http://localhost:5500/admin-api/books/${books.bookId}`,book)
    console.log(res)
    if (res.data.message==="book restored"){
      const updatedBookList = bookList.map(book => {
        if (book.bookId === books.bookId) {
            return { ...book, status: true }; // Mark as deleted
        } else {
            return book;
        }
    });
    console.log("deletebook",updatedBookList)
    setBookList(updatedBookList);
    }else{
        setErr(res.data.message)
        console.log("Erroorr")
    }
    console.log("restore book")

  }
  let {favs,setfavs}=useState('')
  const addFavourite=async(books)=>{
    let art={...books};
    delete art._id;
    let res =await axiosWithToken.put(`http://localhost:5500/user-api/add-favourite/${currentUser.userName}`,art)
    console.log(res)
    if (res.data.message==="Favourite added"){
        setfavs(res)
    }else{
      setErr(res.data.message)
    }
  }
  

    useEffect(()=>{
      getAllBooks()
    },[])

    const enableEditState=async(books)=>{
      navigate('/admin-profile/edit-book',{state:books})
    }


  return (
    <div>
      {bookList.length===0?(<p className=' text-center'>No Books found</p>):
     (<div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {bookList.map((books) => (
          <div className="col" key={books.booksId}  >
            <div className="card h-30 w-30" >
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight:"bold"}}>{books.title}</h5>
                <img src={`${books.imageUrl}`} style={{height:"40%", width: "40%" ,objectFit: "contain" }}></img>
                <h4 className='card-text'>Author:{`${books.author}`}</h4>
                {
                    loginStatus && currentUser.userType=="user"?
                    <>
                        <button className='btn btn-info' onClick={()=>addFavourite(books)}>Add to favourites</button>
                    </>:
                    <>
                        <div className="d-flex justify-content-around">                           
                        <button className='btn btn-warning' onClick={()=>enableEditState(books)}>Edit</button>
                        {
                           books.status === false? (
                                    <button className='btn btn-info' onClick={() => restoreBook(books)}>Restore</button>
                                    ) : (
                                    <button className='btn btn-danger' onClick={() => deleteBook(books)}>Delete</button>
                                    )  
                          }
                        
                        </div>
                    </>
                }
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

export default Books