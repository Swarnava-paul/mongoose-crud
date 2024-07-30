const express = require('express') ;
const PORT = 8090;

const router1 = require('./expressRouter/route1') // router1 

const databaseConnection = require('./config/connection.db');
// calling this above function will perform connection with Database

const server = express(); // server created

server.use('/',router1) // middleware for router 1





server.listen(PORT,async ()=>{
    try{
     console.log(`server is running on http://localhost:${PORT}`);
     databaseConnection() // connection to db
    }catch(error) {
      console.log(error);
    }
})
// listining to server for incoming request