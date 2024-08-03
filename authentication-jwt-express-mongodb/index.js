const express = require('express');
const PORT = 3009;

const userRouter = require('./routes/route.user');

const server = express();

server.use('/',userRouter);

const databaseConnection = require('./config/coonnection.database')

server.listen(PORT,()=>{
    try{
      console.log(`server is running`);
      
      databaseConnection()
      .then(()=>{
        console.log('connection with database is successfull');
       });
      
    }catch(e) {
        console.log(e);
        
    }
})