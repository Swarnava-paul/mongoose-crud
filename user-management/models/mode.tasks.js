const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    taskName:{type:String,required:true},
    status:{type:String,required:true},
    owner_Member_id :{type:String,required:true},
    managerId:{type:String,required:true},
    taskCreatedAt:{type:String,default:()=>`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`}
},{versionKey:false});

const TaskModel = mongoose.model('Task',tasksSchema);

module.exports = TaskModel;