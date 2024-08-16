
const express = require('express');
const ManagerRouter = express.Router();


ManagerRouter.get('/managerHc',(req,res)=>{
    res.status(200).send("Manager router")
})



module.exports = ManagerRouter;