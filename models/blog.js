const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    contents:{
        type:Array,
        required:true
    },
    notes:{
        type:String,
        required:false
    }
},{timestamps: true});

const Blog = mongoose.model('blog',blogSchema);
module.exports = Blog;