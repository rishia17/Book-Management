// create mini express application
const exp=require('express')
const userApp=exp.Router()
const {createUserOrAdmin,userOrAdminLogin}=require('./util')
const expressAsyncHandler=require('express-async-handler')
userApp.use((req,res,next)=>{
    userCollection=req.app.get("usercollection")
    booksCollection=req.app.get("bookscollection")
    next()
})

const verifyToken=require("../middlewares/verifyToken")

//define routes

userApp.post('/user',createUserOrAdmin)

userApp.post('/login',userOrAdminLogin)

// read articles of all authors
userApp.get('/books',expressAsyncHandler(async(req,res)=>{
    // get all articles of all oauthors
    const booksList= await booksCollection.find({status:true}).toArray()
    res.send({message:"all books",payload:booksList})
})) 


userApp.put('/add-favourite/:userName', expressAsyncHandler(async(req, res) => {
    const userName = req.params.userName;
    const bookToUpdate = req.body;
    console.log(userName);
    console.log(bookToUpdate);
    
    await booksCollection.findOneAndUpdate(
        { bookId: bookToUpdate.bookId },
        { $addToSet: { favourites: userName } },
        { new: true }
    );

    // Fetch the updated book after the update operation
    const updatedBook = await booksCollection.findOne({ bookId: bookToUpdate.bookId });

    console.log(updatedBook);
    res.send({ message: "Favourite added", book: updatedBook });
}));


// Get books with given username in favourites
userApp.get('/favourites/:userName', expressAsyncHandler(async (req, res) => {
    const userName = req.params.userName;

    const books = await booksCollection.find({ favourites: { $in: [userName] } }).toArray();

    res.send({ message: "Books found", payload: books });
}));


//remove favourites
// Remove a specific username from favourites
// Remove a specific username from favourites in a specific book
userApp.put('/remove-favourite/:userName', expressAsyncHandler(async(req, res) => {
    const userName = req.params.userName;
    const bookToUpdate = req.body;
    console.log(userName);
    console.log(bookToUpdate);

    // Update the document to remove the username from the favourites array
    await booksCollection.findOneAndUpdate(
        { 
            bookId: bookToUpdate.bookId,
            favourites: userName // Ensure the username exists in the favourites array
        },
        { $pull: { favourites: userName } }, // Remove the username from the favourites array
        { new: true }
    );

    // Fetch the updated book after the update operation
    const updatedBook = await booksCollection.findOne({ bookId: bookToUpdate.bookId });

    console.log(updatedBook);
    res.send({ message: "Username removed from favourites", book: updatedBook });
}));





// exporting the file
module.exports=userApp;