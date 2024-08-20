const express = require('express');
const RegisterAndLoginRouter = express.Router();
const UserModel = require('../models/model.user');

const hashPassword = require('../modules/module.HashPassword');
const generateJwtToken = require('../modules/module.generateJwtToken');
const comparePassword = require('../modules/module.comparePassword');


RegisterAndLoginRouter.post('/register',async(req,res)=>{

 try{
   const {email,password} = req.body;
   const findUser = await UserModel.find({email:email});

   if(findUser.length > 0) {
    return res.status(400).json({message:"User Already Exist with this Email"})
   }

   const hashedPassword = hashPassword(password)
   await UserModel.create({...req.body,password:hashedPassword});
   res.status(201).json({message:"Account Created Successful"})

  }catch(error) {
    console.log(error);
    
   res.status(500).json({message:"Internal Server Error"})
  }

});


RegisterAndLoginRouter.post('/login',async(req,res)=>{

 try{
  const {email,password} = req.body;
  const findUser = await UserModel.find({email:email});

  if(!findUser || findUser.length === 0) {
    return res.status(404).json({message:"Wrong Email"})
  } 
  
  const comparePasswordResult = comparePassword(password,findUser[0].password);
 
  if(comparePasswordResult) {
    const token = generateJwtToken({id:findUser[0]._id});
    return res.status(200).json({message:"Login Successful",token})
  }

  res.status(400).json({message:"Wrong Password"})
  
 }catch(error) {
   res.status(500).json({message:"Internal Server Error"});
 }

});

module.exports = RegisterAndLoginRouter;