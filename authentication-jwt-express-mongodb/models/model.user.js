const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userCreatedAt:{type:Date,default:()=> Date.now()},
    role:String
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;