
const express = require('express');
require('dotenv').config();
const router = express.Router();

router.use(express.json());

const jwt = require('jsonwebtoken')

// models
const CourseModel = require('../models/model.course');
const UserModel = require('../models/model.user');

// middlewares
const checkAuthentication = require('../middlewares/middleware.authentication');
const accessInfo = require('../middlewares/middleware.log');

router.use(accessInfo)

router.get('/courses',async(req,res)=>{
    const {category,difficulty} = req.query;
    const SuccessMessage = 'Fetched Successfull'
    try{
        if(category && !difficulty) {

           const courses = await CourseModel.find({category:category});
           if(!courses || courses.length == 0) {res.status(400).json({massage:'No course Found'})}
           else {res.status(200).json({massage:SuccessMessage,courses})}

        }else if(difficulty && !category) {

          const courses = await CourseModel.find({difficulty:difficulty});
          if(!courses || courses.length == 0) {res.status(400).json({massage:'No course Found'})}
          else {res.status(200).json({massage:SuccessMessage,courses})}

        }else if(category && difficulty) {
          const courses = await CourseModel.find({category:category,difficulty:difficulty});
          if(!courses || courses.length == 0) {res.status(400).json({massage:'No course Found'})}
          else {res.status(200).json({massage:SuccessMessage,courses})}

        } else {
           const courses = await CourseModel.find({});
           if(!courses || courses.length == 0) {res.status(400).json({massage:'No course Found'})}
           else {res.status(200).json({massage:SuccessMessage,courses})}
        }
    }catch(e) {
       res.status(404).json({Error:e})
    }
})
// handles access the courses

router.post('/register',async(req,res)=>{
 const {email} = req.body;
    try{
     const payload = req.body;
     const findUser = await UserModel.find({email:email});
     if(!findUser || findUser.length == 0) {
       await UserModel.create({...payload})
       res.status(201).json({massage:"Register Successfully"})
     } else{
       res.status(404).json({massage:'User Already exist please Login'})
     }

    }catch(e) {
        res.status(400).json({e})
    }

}) // handles register of users and also prevent to register user with same email

router.post('/login',async(req,res)=>{

    try{
      const {email,password} = req.body;
      const findUser = await UserModel.find({email:email,password:password});
      if(!findUser || findUser.length == 0) {
        res.status(404).json({massage:"wrong cridintials"})
      } else {
        jwt.sign({name:findUser[0].name,id:findUser[0]._id,},process.env.SECRET_KEY,{algorithm:'HS256'},(err,token)=>{
            if(token) {
                res.status(200).json({
                    massage:"login successfull",
                    token:token
                })
            }
        })
      }
    }catch(e) {
      res.send("Error")
    }

}) // handles login requests

router.patch('/enroll',checkAuthentication,async(req,res)=>{
 const {courseId} = req.query;
 const {id} = req.user;

 
 try{
    const enrolled = await UserModel.updateOne({_id:id},{$push:{EnrolledCourses:courseId}})
    console.log(enrolled);
  res.status(200).json({massage:"Successfully enrolled"})
 }catch(e) {
    console.log(e);
    
   res.status(404).json({massage:"Error during enrollment of course"})
 }

})
//handles course enrollment

router.patch('/cancelEnroll',checkAuthentication,async(req,res)=>{
    const {courseId} = req.query;

    try{
      const {id} = req.user;
      const findUser = await UserModel.find({_id:id});
      const Courses = findUser[0].EnrolledCourses;
      UpdatedCourses = Courses.filter((i=>(
        i!==courseId
      )))
    
      
    const updated = await UserModel.updateOne({_id:id},{$set:{EnrolledCourses:UpdatedCourses}})
    res.status(200).json({massage:"course Modified Successfully"})
      
    }catch(e) {
     res.status(404).send('Error during removing Enrolled course')
    }
})
// handles course removing
module.exports = router;