const Blog = require('../models/blog');
const fs = require('fs');
const path = require('path');
const {clearUploadsFolder} = require('../middleware/multerConfig')

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('blogs',{title:'Travel Blog',blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_details = (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{blog:result, title:result.title})
    })
    .catch((err)=>{
        console.log(err)
    })

}

const blog_post = (req,res)=>{
    const currentUser = res.locals.user
    const obj = req.body
    obj.user_id = currentUser._id
    obj.username = currentUser.username
    const imageObjects = [];
    req.files.forEach(file => {
    const imagePath = path.join('./public/uploads/', file.filename);
    try {
        const imageData = fs.readFileSync(imagePath);
        const imageObject = {
            data: imageData,
            contentType: file.mimetype,
            image_path:imagePath
        };
        imageObjects.push(imageObject);
    } catch (error) {
        console.error('Error reading image file:', error);
    }
    });
    obj.images = imageObjects;
    const blog = new Blog(obj)
    blog.save()
        .then(()=>{
            res.redirect('/blogs')
            clearUploadsFolder()

        })
        .catch((err)=>{
            console.log(err)
        })
}




const blog_delete = (req,res)=>{
    const id = req.params.id
    const currentUser = res.locals.user
    Blog.findById(id)
        .then((result)=>{
            if(result.user_id.toString() === currentUser._id.toString() ){
                Blog.findByIdAndDelete(id)
                    .then(()=>{
                        res.status(200).json({ message: 'Blog post deleted successfully' })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }else{
                res.status(403).json({error:'unauthorized'})
            }
        })
        .catch((err)=>{
            console.log(err)
        })


}

const blog_update = (req,res)=>{
    const id = req.params.id
    const currentUser = res.locals.user
    const update = req.body

    // image files
    const imageObjects = [];
    if(req.files.length>0){
        req.files.forEach(file => {
            const imagePath = path.join('./public/uploads/', file.filename);
            try {
                const imageData = fs.readFileSync(imagePath);
                const imageObject = {
                    data: imageData,
                    contentType: file.mimetype,
                    image_path:imagePath
                };
                imageObjects.push(imageObject);
            } catch (error) {
                console.error('Error reading image file:', error);
            }
            });
            update.images = imageObjects;
    }


    //update filter
    const filter = {_id:id}
    Blog.findById(id)
    .then((result)=>{
        if(result.user_id.toString() === currentUser._id.toString() ){
            Blog.findOneAndUpdate(filter,update,{new:true})
                .then((result)=>{
                    console.log(result)
                    res.status(200).json({ message: 'Blog updated!' })
                })
                .catch((err)=>{
                    console.log(err)
                })
        }else{
            res.status(403).json({error:'unauthorized'})
        }
    })
    .catch((err)=>{
        console.log(err)
    })   

}

module.exports = {
    blog_index,
    blog_details,
    blog_post,
    blog_delete,
    blog_update,

}