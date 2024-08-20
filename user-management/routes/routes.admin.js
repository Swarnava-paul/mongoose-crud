const express = require('express');
const adminRouter = express.Router();
const UserModel = require('../models/model.user');
const TaskModel = require('../models/mode.tasks')

adminRouter.get('/adminHc',(req,res)=>{
    res.status(200).send("Admin Route")
})

adminRouter.patch('/addManager',async(req,res)=>{

 try {
  const {managerId} = req.body;
  const {id} = req.user;
  const findManager = await UserModel.updateOne({_id:managerId},{$set:{Under_admin_Id:id}});
  res.status(200).json({message:"Manager Added successful"}) 
 } catch(error) {
  res.status(500).json({message:"Internal Server Error"})
 }

})

adminRouter.get('/getAllManagers',async(req,res)=>{
    try{
      const {id} = req.user;
      const findAllManagers = await UserModel.find({Under_admin_Id:id});
      if(!findAllManagers || findAllManagers.length == 0) {
        return res.status(404).json({message:"No Manager Found Please Add Manager"})
      }
      return res.status(200).json({message:"Finding All Your Managers Successful",managers:findAllManagers});

    }catch(error) {
      res.status(500).json({message:"Internal Server Error"});
    }
})

adminRouter.get('/getReports',async(req,res)=>{

  try {
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth()
    const fullDate = `${year}-${month}-${date}`.toString()
  
    const dailyTasksCreated = await TaskModel.aggregate([{$match:{taskCreatedAt:{$eq:fullDate}}},{$count:'totalTasks'},{$project:{totalTasks:1}}])
    const groupByStatus = await TaskModel.aggregate([{$group:{_id:'$status',count:{$count:{}}}}])
    res.status(200).json({message:"Report Generated Successful",data:{dailyTasksCreated,groupByStatus}})
  }catch(error) {
    res.status(500).json({message:"Internal Server Error"})
  }

})

module.exports = adminRouter