const Blog = require('../models/blog');
const path = require('path');
const fs = require('fs');
const {storage} =require('../config/firebaseConfig');
const { uploadBytes, ref, getDownloadURL, deleteObject } = require('firebase/storage');



const blog_index = (req,res)=>{
    const {search} = req.query
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        if(search){
            const destination = result.filter(item=>item.destination.toLowerCase().includes(search.toString().toLowerCase()))
            res.render('index',{title:'Travel Blog',blogs:destination})

        }else{
            res.render('index',{title:'Travel Blog',blogs:result})
        }
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


    //if image uploated
    if(req.files.length>0){
        req.files.forEach(file => {
            //firebase ref metadata
            const storageRef = ref(storage,`${currentUser._id}/${Date.now()+file.originalname}`)
            const metadata = { contentType:file.mimetype }
            const fullPath = storageRef.fullPath
        try {
            //upload image to firebase bucket
            uploadBytes(storageRef,file.buffer,metadata)
                .then((snapshot)=>{
                    getDownloadURL(ref(storage,fullPath))
                        .then((url)=>{
                             const imageObject = {
                                 image_path:url,
                                 full_path:fullPath
                             }
                             imageObjects.push(imageObject);
                        })
                        .then(()=>{
                            obj.images = imageObjects;
                            const blog = new Blog(obj)
                            blog.save()
                                .then(()=>{
                                    res.redirect('/blogs')
                        
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                        })
                })
                .catch(error=>{
                console.log(error)
                })
        } catch (error) {
            console.error('Error reading image file:', error);
        }
        });
        
    }else{
        const blog = new Blog(obj)
        blog.save()
            .then(()=>{
                res.redirect('/blogs')
    
            })
            .catch((err)=>{
                console.log(err)
            })

    }

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
                        result.images.forEach(image=>{
                            const desertRef = ref(storage,image.full_path)
                            deleteObject(desertRef).then(()=>{
                                console.log('deleted')
                            }).catch(err=>{
                                console.log(err)
                            })
                        })
            
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
    const filter = {_id:id}
    // image files
    const imageObjects = [];

    //update blog
    Blog.findById(id).then((result)=>{
        if(result.user_id.toString() === currentUser._id.toString()){
            //if update image
            if(req.files.length>0){
                //delete old images
                if(result.images.length>0){
                    result.images.forEach(image=>{
                        const desertRef = ref(storage,image.full_path)
                        deleteObject(desertRef).then(()=>{
                            console.log('deleted')
                        }).catch(err=>{
                            console.log(err)
                        })
                    })
                }
                //upload images        
                req.files.forEach(file => {

                //firebase ref metadata
                const storageRef = ref(storage,`${currentUser._id}/${Date.now()+file.originalname}`)
                const metadata = { contentType:file.mimetype }
                const fullPath = storageRef.fullPath
                try {
                    uploadBytes(storageRef,file.buffer,metadata)
                        .then((snapshot)=>{
                            getDownloadURL(ref(storage,fullPath))
                                .then((url)=>{
                                    const imageObject = {
                                        image_path:url,
                                        full_path:fullPath
                                    }
                                    imageObjects.push(imageObject);
                                })
                                .then(()=>{
                                    update.images = imageObjects;
                                    Blog.findOneAndUpdate(filter,update,{new:true})
                                    .then((result)=>{
                                        res.status(200).json({ message: 'Blog updated!' })
                                        
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                    })
                                })
                        })
                }catch (error) {
                    console.error('Error reading image file:', error);
                };
                });
            }else{
                Blog.findOneAndUpdate(filter,update,{new:true})
                .then((result)=>{
                    res.status(200).json({ message: 'Blog updated!' })
                    
                })
                .catch((err)=>{
                    console.log(err)
                })

            }
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