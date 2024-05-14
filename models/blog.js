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
    },
    user_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    images:
    [{
        // data: Buffer,
        // contentType: String,
        image_path:String
    }]

},{timestamps: true});

const Blog = mongoose.model('blog',blogSchema);
module.exports = Blog;