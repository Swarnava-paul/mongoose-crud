const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
 name:{type:String,required:true , lowercase:true},
 age:{type:String,required:true},
 gender:{type:String,required:true,lowercase:true},
 user_created_at:{type:Date,default:()=>Date.now()}
},{strict:false})


const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel;