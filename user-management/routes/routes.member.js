const express = require('express');
const memberRouter = express.Router();
const UserModel = require("../models/model.user");
const TaskModel = require('../models/mode.tasks');

memberRouter.get('/memberHc',(req,res)=>{
    res.status(200).send("Member Route")
})

memberRouter.post('/addTask',async(req,res)=>{

    try {
    const {id} = req.user;
    const newTask = req.body;
    const findManagerId_of_this_member = await UserModel.find({_id:id});
    const managerID = findManagerId_of_this_member[0].Under_manager_Id;
    await TaskModel.create({...newTask,owner_Member_id:id,managerId:managerID});
    res.status(201).json({message:"Task Created Successful"})
    }catch(error) {
    res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = memberRouter