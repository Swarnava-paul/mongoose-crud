const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true},
    userCreatedAt:{type:Date,default:()=> Date.now()}
})

const MovieModel = mongoose.model('Movie',movieSchema);

module.exports = MovieModel;