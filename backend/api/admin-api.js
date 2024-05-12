// create mini express application
const exp=require('express')
const adminApp=exp.Router()
const {createUserOrAdmin,userOrAdminLogin}=require('./util')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require("../middlewares/verifyToken")

let adminCollection;
let booksCollection;
adminApp.use((req,res,next)=>{
    userCollection=req.app.get('usercollection')
    adminCollection=req.app.get('admincollection')
    booksCollection=req.app.get('bookscollection')
    next()
})

//define routes
adminApp.post('/user',expressAsyncHandler(createUserOrAdmin))

adminApp.post('/login',expressAsyncHandler(userOrAdminLogin))

//  add new article
adminApp.post('/new-book',expressAsyncHandler(async(req,res)=>{
    // get a new article
    const newBook=req.body;
    //sav new article to articles collection
    await booksCollection.insertOne(newBook)
    // send res
    res.send({message:"new book is added"})
}))


// soft delete an article
adminApp.put('/books/:bookId',expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const bookIdFromUrl=(+req.params.bookId);
    //get article 
    const bookToDelete=req.body;
    console.log(bookIdFromUrl)
    console.log(bookToDelete)
    if(bookToDelete.status===true){
       let modifiedArt= await booksCollection.findOneAndUpdate({bookId:bookIdFromUrl},{$set:{...bookToDelete,status:false}},{returnDocument:"after"})
       console.log("dfgdg",modifiedArt)
       res.send({message:"book deleted",payload:modifiedArt.status})
    }
    if(bookToDelete.status===false){
        let modifiedArt= await booksCollection.findOneAndUpdate({bookId:bookIdFromUrl},{$set:{...bookToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"book restored",payload:modifiedArt.status})
    }
}))

//edit articles
adminApp.put('/edit',expressAsyncHandler(async(req,res)=>{
    // get modified book
    const modifiedBook=req.body;
    let result= await booksCollection.updateOne({bookId:modifiedBook.bookId},{$set:{...modifiedBook}})
    let latestBook=await booksCollection.findOne({bookId:modifiedBook.bookId})
    res.send({message:"book modified",book:latestBook})

}))
// read articles of all authors
adminApp.get('/books',expressAsyncHandler(async(req,res)=>{
    // get all articles of all oauthors
    const booksList= await booksCollection.find({status:true}).toArray()
    res.send({message:"all books",payload:booksList})
})) 
//dashboard
adminApp.get('/dashboard',expressAsyncHandler(async(req,res)=>{
    // get modified book
    const userCount = await userCollection.countDocuments();
    const adminCount = await adminCollection.countDocuments();
    const bookCount = await booksCollection.countDocuments({ status: true });
    res.json({
        userCount,
        adminCount,
        bookCount
    });

}))

module.exports=adminApp