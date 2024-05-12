import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import AdminProfile from './components/admin-profile/AdminProfile';
import UserProfile from './components/user-profile/UserProfile';
import Books from './components/books/Books';
import Favourites from './components/favourites/Favourites';
import AddBook from './components/addbook/AddBook';
import EditBook from './components/editbook/EditBook';
function App() {
  const browserRouter=createBrowserRouter([
    {
      path:"",
      element:<Layout/>,
      children:[
        {
          path:"",
          element:<Home/>,
        },
        {
          path:"/signup",
          element:<Signup/>,
        },
        {
          path:"/signin",
          element:<Signin/>,
        },
        {
          path:"/user-profile",
          element:<UserProfile/>,
          children:[
            {
              path:"books",
              element:<Books/>,
            },
            {
              path:"favourites",
              element:<Favourites/>
            },
            {
                path:"",
                element:<Navigate to="books"/>
            },
          ]
        },
        {   path:"/admin-profile",
            element:<AdminProfile/>,
            children:[
              {
                path:'add-book',
                element:<AddBook/>,
              },
              {
                path:'books',
                element:<Books/>,
              },
              {
                path:'dashboard',
                element:<Dashboard/>
              },
              {
                path:"",
                element:<Navigate to="books"/>
              },
              {
                path:"edit-book",
                element:<EditBook/>
              }
            ]
        }

      ]
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
