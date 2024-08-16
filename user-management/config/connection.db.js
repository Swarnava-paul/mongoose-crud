const mongoose = require('mongoose');

const connectWithDatabase = async () => {
 try{
 await mongoose.connect(process.env.DATABASE_URL)
 return 'connection with database successful'
 }catch(e) {
  throw new Error (`connection with database failed ${e}`)
 }
}

module.exports = connectWithDatabase;