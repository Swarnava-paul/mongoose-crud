const mongoose = require('mongoose');


const connectWithDatabase = async() => {
    try{

     await mongoose.connect(process.env.DATABASE_URL);

    }catch(e) {

        throw new Error(e)
    }
}

module.exports = connectWithDatabase;