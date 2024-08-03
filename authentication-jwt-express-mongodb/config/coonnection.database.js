const mongoose = require('mongoose');

const databaseConnection = async() => {
    const databaseURL = 'mongodb://127.0.0.1:27017/Authentication'
    try{
      await mongoose.connect(databaseURL)
    }catch(e) {
      throw new Error(e)
    }
}

module.exports = databaseConnection;