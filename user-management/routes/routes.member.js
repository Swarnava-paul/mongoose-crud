
const express = require('express');
const memberRouter = express.Router();


memberRouter.get('/memberHc',(req,res)=>{
    res.status(200).send("Member router")
})



module.exports = memberRouter;