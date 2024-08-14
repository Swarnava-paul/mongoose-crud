const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    description :{type:String,required:true},
    creatorId:{type:String,require:true},
    publishedBy :{type:String,required:true},
},{versionKey:false})


const BookModel = mongoose.model('Book',bookSchema);

module.exports = BookModel;