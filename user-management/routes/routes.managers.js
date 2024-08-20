const express = require('express');
const ManagerRouter = express.Router();
const UserModel = require('../models/model.user');
const {path, join} = require('node:path')

ManagerRouter.get('/managerHc',(req,res)=>{
    res.status(200).send("Manager Route")
})

ManagerRouter.patch('/addMember',async(req,res)=>{

    try{
     const {memberId} = req.body;
     const {id} = req.user;
     await UserModel.updateOne({_id:memberId},{$set:{Under_manager_Id:id}})
     res.status(200).json({message:"Member Added under you"})
    }catch(error) {
     console.log(error);
     
     res.status(500).json({message:"Internal Server error"})
    }
})

module.exports = ManagerRouter