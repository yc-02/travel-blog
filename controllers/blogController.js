const Blog = require('../models/blog');


const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'Travel Blog',blogs:result})
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
    const blog = new Blog(req.body)
    blog.save()
        .then(()=>{
            res.redirect('/blogs')

        })
        .catch((err)=>{
            console.log(err)
        })
}

const blog_delete = (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(()=>{
            res.status(200).json({})
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_post,
    blog_delete
}