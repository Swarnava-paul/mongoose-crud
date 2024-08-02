
const express = require('express'); 
const PORT = 4000;

//custom imports
const databaseConnection = require('./config/connection.database')
const moviesRouter = require('./routes/route.movies')

const server = express(); // express server 

server.use('/movies',moviesRouter)

server.listen(PORT,()=> {
    try{
       console.log(`server is running on http://localhost:${PORT}`);
       databaseConnection(); // handles the connection with database
       console.log('Connection with database is stablished');
    }catch(error) {
        console.log(error);
    }
}) // listining for incoming request