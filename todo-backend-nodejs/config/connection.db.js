const mongoose = require('mongoose');// mongoose


const connectWithDatabase = async()=> {

try{
const databaseURL = process.env.DATABASE_URL;
await mongoose.connect(databaseURL);
}catch(error) {
throw new Error(error);
}

}
// handles to connect with database on server running
module.exports = connectWithDatabase;