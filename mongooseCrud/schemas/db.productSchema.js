
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String,required:true,lowercase:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    rating:{type:Number,required:true}
},{strict:false})


const ProductModel = mongoose.model('Product',productSchema)


module.exports = ProductModel;
