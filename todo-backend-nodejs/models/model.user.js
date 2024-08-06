const mongoose = require('mongoose'); // mongoose

const userSchema = new mongoose.Schema ({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileCreationDate:{type:Date,default:()=>Date.now()}
},{versionKey:false}) // user schema 

const UserModel = mongoose.model('User',userSchema); 

module.exports = UserModel;