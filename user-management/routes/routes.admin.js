
const express = require('express');
const adminRouter = express.Router();


adminRouter.get('/adminHc',(req,res)=>{
    res.status(200).send("Admin router")
})



module.exports = adminRouter;