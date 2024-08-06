const mongoose = require('mongoose'); // mongoose

const todoSchema = new mongoose.Schema ({
    todoName:{type:String,required:true},
    priority:{type:String,required:true},
    ownerId:{type:String,required:true},
    CreationDate:{type:Date,default:()=>Date.now()}
},{versionKey:false}) // todo schema 

const TodoModel = mongoose.model('Todo',todoSchema); 

module.exports = TodoModel;