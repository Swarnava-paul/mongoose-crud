
const mongoose = require('mongoose');

const connectWithDatabase = async()=>{

    const databaseUrl = 'mongodb://127.0.0.1:27017/courseDatabase';

    try{
      await mongoose.connect(databaseUrl)
    }catch(e) {
      throw new Error(e)
    }
}


module.exports = connectWithDatabase;