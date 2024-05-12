// bcrypt js
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const {verifyToken}=require("../middlewares/verifyToken")
// req handler for registratioin
const createUserOrAdmin=async(req,res)=>{
    //get users and admins collection object
    const userCollectionObj=req.app.get('usercollection')
    const adminCollectionObj=req.app.get('admincollection')
    
    //get user or admin
    const user=req.body

    //check duplicate user
    if (user.userType==='user'){
        //find user by username
        let status=await userCollectionObj.findOne({userName:user.userName})
        if (status!=null){
            return res.send({message:"user already existed"})
        }
    }
    //check duplicate author
    if (user.userType==='admin'){

        let status=await adminCollectionObj.findOne({userName:user.userName})
        if (status!=null){
            return res.send({message:"admin already existed"})
        }
    }

    //hash password
    const hashedpassword=await bcryptjs.hash(user.password,7)
    //replace plane password with hashed password
    user.password=hashedpassword
    if (user.userType==='user'){
        await userCollectionObj.insertOne(user)
        res.send({message:"user created"})

    }
    if (user.userType==='admin'){
        await adminCollectionObj.insertOne(user)
        res.send({message:"admin created"})
    }
};

//user or admin login
const userOrAdminLogin=async(req,res)=>{
    const userCollectionObj=req.app.get('usercollection')
    const adminCollectionObj=req.app.get('admincollection')
    //get user
    const user=req.body

    if (user.userType==='user'){

        let dbUser =await userCollectionObj.findOne({userName:user.userName})
        if (dbUser===null){
            return res.send({message:"invalid user name"})

        }
        let status =await bcryptjs.compare(user.password,dbUser.password)
        if (status===false){
            return res.send({message:"password invalid"})
        }else{
              //generation token
               const signedToken=jwt.sign({userName:dbUser.userName},process.env.SECRET_KEY,{expiresIn:'1d'})
               delete dbUser.password
               res.send({message:"login success",token:signedToken,user:dbUser})
        }


    }
    if (user.userType==='admin'){
        let dbUser =await adminCollectionObj.findOne({userName:user.userName})
        if (dbUser===null){
            return res.send({message:"invalid user name"})
        }
        let status =await bcryptjs.compare(user.password,dbUser.password)
        if (status===false){
            return res.send({message:"password invalid"})
        }else{
            //generation token
            const signedToken=jwt.sign({userName:dbUser.userName},process.env.SECRET_KEY,{expiresIn:'1d'})      
            delete dbUser.password
            res.send({message:"login success",token:signedToken,user:dbUser})

        }

    }
}



module.exports={createUserOrAdmin,userOrAdminLogin};
//module.exports=userOrAuthorLogin