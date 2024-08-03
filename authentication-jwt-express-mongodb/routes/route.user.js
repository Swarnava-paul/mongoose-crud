
const express = require('express');

const userRouter = express.Router();

userRouter.use(express.json());

const jwt = require('jsonwebtoken');
const UserModel = require('../models/model.user')
const MovieModel = require('../models/model.movies')

const checkAuthentication = require('../middlewares/middleware.authentication')
const checkAuthrization = require('../middlewares/middleware.authorization')
userRouter.post('/register',async(req,res)=>{

    try{
      const {email} = req.body;
      const findUser = await UserModel.find({email:email});
      if(!findUser || findUser.length == 0) {
        await UserModel.create(req.body)
        res.status(201).json({massage:'User created successfully'})
      }
      else{
        res.status(404).json({massage:"User Already Exist please Login"})
      }

    }catch(e) {
      res.status(404).send("err")
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
     const findUser = await UserModel.find({email:email,password:password});
   
     if(!findUser || findUser.length === 0) {
        res.status(404).send('Wrong Credentials')
     }else {
      jwt.sign({ name:findUser[0].name,role:findUser[0].role,id:findUser[0]._id}, 'key123', { algorithm: 'HS256' }, function(err, token) {
         if(token) {
   
            
            res.status(200).json({
               massage:"Login Successfull",
               token
            })
         }else {
            res.status(404).json({massage:'Failed during creation of token'})
         }
         
       });
     }
    }catch(e) {
       res.status(404).send('Something went wrong')
    }

})

userRouter.get('/getAllMovies/:Token',checkAuthentication,async(req,res)=>{

res.status(200).json({
   massage:"Acees successfull for movies",
   user:req.user.name,
})
})

userRouter.post('/createMovie/:Token',checkAuthentication,checkAuthrization,async(req,res)=>{
res.send('Accessed')

})

module.exports = userRouter;