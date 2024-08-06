const express = require('express');
const router = express.Router(); // express router
require('dotenv').config();// dotenv config to use environmental variables
const jwt = require('jsonwebtoken')

// custom modules
const checkAuthentication = require('../middlewares/middleware.Authentication')
const hashPassword = require('../modules/bcryptFunction');
const CompareBcrypt = require('../modules/bcryptCompare');
const jwtSign = require('../modules/jwtSign')

//mongoose models 
const UserModel = require("../models/model.user");
const TodoModel = require('../models/model.todo');

// middlewares
router.use(express.json()); // to receive incoming request body


// -> from here below all api endpoints for todo application

router.post('/register',async(req,res)=>{
   const {email} = req.body;

   try{

     const findUser = await UserModel.findOne({email:email});

     if(!findUser || findUser.length == 0) {

       const hashedPassword = hashPassword(req.body.password);
       await UserModel.create({...req.body,password:hashedPassword});
       res.status(201).json({massage:"Register Successful"});

     }else {
        res.status(404).json({massage:"This email is already registered with us"})
     }

   }catch(error) {
     res.status(404).json({massage:'Something went wrong',error})
   }

})


router.post('/login',async(req,res)=>{

 const {email,password} = req.body;

 try{
  
  const user = await UserModel.findOne({email:email});

  if(!user || user.length == 0) {
    res.status(400).json({message:"Wrong Email No user is found"})
  }else {

    const compareResult = CompareBcrypt(password,user.password)

    if(compareResult) {
     
      const token = jwtSign({id:user._id,email:user.email,name:user.name});
      res.status(200).json({massage:"Login Successfull",token:token})

    }else {
       res.status(400).json({massage:'Wrong Password'})
    }
  }

 }catch(error) {
  res.status(400).status('Error During Login Try again')
 }
})


router.get('/getAllTodo',checkAuthentication,async(req,res)=>{
 try{
  const {id} = req.user;
  const AllTodo = await TodoModel.find({ownerId:id})
  if(!AllTodo || AllTodo.length == 0) {
    res.status(400).json({message:"No Todo Found"})
  }else {
    res.status(200).json({message:"Successfull",todos:AllTodo})
  }
 }catch(error) {
  res.status(404).json({message:"Unable to get Todos"})
 }
})


router.post('/createTodo',checkAuthentication,async(req,res)=>{
 const {id} = req.user;
 
  try{
     await TodoModel.create({...req.body,ownerId:id});
     res.status(201).json({message:"Todo Created Successfully"})
  }catch(e) {
     res.status(400).json({message:"Some Thing Went Wrong"})
  }

})


router.patch('/updateTodo',checkAuthentication,async(req,res)=>{

 try{
   const todoId = req.query.id;
   await TodoModel.updateOne({_id:todoId,ownerId:req.user.id},{...req.body});
   res.status(200).json({message:"Todo Updated Successfully"})
 }catch(error) {
   res.status(400).json({message:"Failed to update the Todo"})
 }

})


router.delete('/deleteTodo',checkAuthentication,async(req,res)=>{

try{
const todoId = req.query.id;
await TodoModel.deleteOne({_id:todoId,ownerId:req.user.id})
res.status(200).json({message:"Todo Deleted"})
}catch(error) {
res.status(400).json({message:"Failed to Delete the todo"})
}

})


module.exports = {
    router
}