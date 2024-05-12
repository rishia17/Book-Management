const exp=require('express')
const app=exp()
require('dotenv').config()

const path=require('path')
//add body parsing
app.use(exp.json())

//connecting frontend and backend
app.use(exp.static(path.join(__dirname,'../frontend/build')))


// mongo client
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DBURL)
    .then(client => {
        // get database object
        const bookDbObj = client.db('bookappdb');
        // get collection obj
        const userCollection = bookDbObj.collection('users');
        const adminCollection = bookDbObj.collection('admin');
        const booksCollection = bookDbObj.collection('books');
        // share collection to api
        app.set('usercollection', userCollection);
        app.set('admincollection', adminCollection);
        app.set('bookscollection', booksCollection);
        console.log("database connection is success");
    })
    .catch(err => {
        console.log("error in database connection", err);
    });


//import apis

const userApp=require('./api/user-api')
const adminApp=require('./api/admin-api')
//handover the requests to specific routesbased on starting path
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)

//error handling middleware handles the 7
app.use((err,req,res,next)=>{
    res.send({status:"Error",message:err.message})
})



const port=process.env.PORT;

app.listen(port,()=>{console.log(`http sever on port ${port}`)})