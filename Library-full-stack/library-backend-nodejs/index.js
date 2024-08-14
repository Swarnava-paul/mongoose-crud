const express = require('express') ;

require('dotenv').config();
const cors = require('cors')

const connectWithDatabase = require('./config/connection.database');

const LibraryRouter = require('./routes/route.Library') ;// library routes
const userRouter = require('./routes/route.user');// user Router

//middleware
const authenticationMiddleware = require("./middleware/middleware.Authentication")

const server = express(); // express server
server.use(cors('*'))
server.use('/book',authenticationMiddleware,LibraryRouter);

server.use('/user',userRouter);

server.listen(process.env.SERVER_PORT_NUMBER,()=>{
    try{

      console.log(`server is running on port ${process.env.SERVER_PORT_NUMBER}`);

      connectWithDatabase()
      .then(()=>{
        console.log('connection with Database is successfull');
    })

    }catch(error) {
       console.log(error);
       
    }
}) // listening for incoming requests to the server