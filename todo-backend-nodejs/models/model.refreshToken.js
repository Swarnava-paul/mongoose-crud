const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    blackListedTokens :{type:[String],required:true}
},{versionKey:false});


const BlackListedTokenModel = mongoose.model('Blacklistedtoken',refreshTokenSchema)


module.exports = BlackListedTokenModel;