require ('dotenv').config() ;
const express = require('express');

const server = express();// server
const connectWithDatabase = require('./config/connection.db')
const trackRequestResponse = require('./middlewares/middleware.log');

//routes
const memberRouter = require('./routes/routes.member');
const ManagerRouter = require('./routes/routes.managers');
const adminRouter = require('./routes/routes.admin');

server.use(express.json());
server.use(trackRequestResponse);
server.use('/member',memberRouter);
server.use('/admin',adminRouter);
server.use('/manager',ManagerRouter);


server.get('/healthCheck',(req,res)=>{
    res.status(200).send("server is running ok");
}) // server health check route


server.listen(process.env.PORT,()=>{
    try{
      console.log(`server is running on ${process.env.PORT}`);
      connectWithDatabase().then((message)=>{console.log(message)}).catch((error)=>{console.log(error)})  
    }catch(e) {
      console.log(`There is a problem to run the server ${e}`);
    }
}) // listening for incoming requests;