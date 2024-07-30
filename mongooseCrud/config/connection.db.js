
const mongoose = require('mongoose') ;

const databaseConnection = async() => {

    const databaseUrl = `mongodb://127.0.0.1:27017/mongoose-assaignment1`

    try{
     await mongoose.connect(databaseUrl)
     console.log('Connection with Database Successfull');
    }catch(error){
      throw new Error('Error happening in connection with database')
    }

} // function for stablish connection with database


module.exports = databaseConnection ; 