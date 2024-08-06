const express = require('express');
const PORT = 4000;

const {router} = require('./routes/route');

const server = express(); // express server

const connectWithDatabase = require('./config/connection.db')

server.use('/',router) ; // baseurl / working router

server.listen(PORT,()=>{
    try{
      console.log(`server is running at http://localhost:${PORT}`);
      connectWithDatabase()
      .then(()=>{
        console.log('Connection with database is successfull');
        
      })
      
    }catch(error) {
      console.log(error)
    }
}) // listening for incoming requests to the server 

