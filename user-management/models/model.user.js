const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
 role:{type:[String],enum:['ADMIN','MANAGER',"MEMBER"],required:true},
 Under_admin_Id:{type:String},
 Under_manager_Id:{type:String}
},{versionKey:false});

const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel;