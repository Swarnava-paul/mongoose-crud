const express = require('express');
const PORT = 4000;

const server = express(); // express server

//--> custom functions/modules
const connectWithDatabase = require('./config/connection.db');
const router = require('./routes/routes');

server.use('/',router);

server.listen(PORT,()=>{
    try{
        console.log(`server is running on http://localhost:${PORT}`);
        connectWithDatabase()
        .then(()=>{
            console.log('connection with database is successfull');
            
        })
    }catch(error) {
        console.log(error);
        
    }
    
}) // listing for requests

