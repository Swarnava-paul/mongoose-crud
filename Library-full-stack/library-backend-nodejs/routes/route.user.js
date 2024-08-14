const express = require('express');

const userRouter = express.Router();

userRouter.use(express.json());
const bcrypt = require('bcrypt');

// custom modules
const generateJwtToken = require('../modules/model.JwtSign')
const hashPassword = require('../modules/module.HashPassword')

//middlewares
const authenticationMiddleware = require("../middleware/middleware.Authentication")
// models

const UserModel = require('../models/model.user')

userRouter.post('/register',async(req,res)=> {
    try {
     const {email,password} = req.body;
     
     const findUser = await UserModel.findOne({email:email}); // first we check if user already exist or not

    if(findUser) {
        return res.status(400).json({message:"User Already Exist With This Email"})
     } // in case if user already exist
     
     const hashedPassword = hashPassword(password);

     await UserModel.create({...req.body,password:hashedPassword}); // if user not exist then create a user in database
     res.status(201).json({message:"Register Successful"});

    } catch (error) {
        console.log(error);
        
      res.status(400).json({message:"Internal Server Error Please Try Again Later",err:error})
    }

})

userRouter.post('/login',async(req,res)=>{
    
   try {
    const {email,password} = req.body;
    
    const findUser = await UserModel.find({email:email});
    if(!findUser || findUser.length == 0) {
        return res.status(400).json({message:"Wrong Email"})
    }

    bcrypt.compare(password,findUser[0].password,(err,result)=>{
      if(result) {
        const token = generateJwtToken({id:findUser[0]._id,name:findUser[0].name});
         return res.status(200).json({message:"Login Successful",token})  
      }
      return res.status(404).json({message:"Wrong Password"});
    })

    
   } catch (error) {
      res.status(400).json({message:"Internal server Error"})
  }

})

userRouter.patch('/updateUser', authenticationMiddleware, async (req, res) => {
  try {
    const {id} = req.user;
    const payload = req.body;
    await UserModel.updateOne({_id:id},{...payload})
    res.status(200).json({message:"Details Updated"})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.get('/checkRole',authenticationMiddleware,async(req,res)=>{

  try{
   const {id} = req.user;
   const user = await UserModel.find({_id:id});
   if(user) {
    return res.status(200).json({message:"successful",role:user[0].role,name:user[0].name})
   }
  }catch(e) {
   res.status(404).json({message:"Internal Server Error"})
  }

})


module.exports = userRouter;