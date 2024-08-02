
const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
 title:{type:String,required:true},
 release_year:{type:Number,required:true},
 genre:{type:String,required:true},
 director:{type:String,require:true},
 cast:{type:[{actor:String,character:String}],require:true},
 rating:{type:Number,required:true},
 created_at:{type:Date,default:()=> Date.now()}
})


const MovieModel = mongoose.model('Movie',moviesSchema);

module.exports = MovieModel;