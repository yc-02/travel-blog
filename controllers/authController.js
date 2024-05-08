const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err,existingEmail,existingUsername)=>{

    let errorMessages = {email:'',password:'',username:''}
    if(existingUsername!==null){
        errorMessages.username='This username is already exist.'
    }

    if(existingEmail!==null){
        errorMessages.email = 'This email is already registered.'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errorMessages[properties.path] = properties.message
        })
    }
    return errorMessages

}

const signup_get = (req,res)=>{
    res.render('auth/signup',{title:'sign up'})
}

const maxAge = 2 * 24 * 60 * 60
const createToken = (id)=>{
    return jwt.sign({data:id},'travel blog secret key',{expiresIn:maxAge});
}

const signup_post= async (req,res)=>{
    const {email,password,username} = req.body;
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({email})
    try {
     const user = await User.create({email, password,username});
     const token = createToken(user._id);
     res.cookie('jwt',token, {httpOnly:true, maxAge:maxAge*1000});
     res.status(201).json({user: user._id});

    }catch(err){
        const errorMessages = handleErrors(err,existingEmail,existingUsername)
        res.status(400).json({errorMessages});
    }

}
const login_get = (req,res)=>{
    res.render('auth/login')

}
const login_post= async (req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.login(email,password)
        res.status(200).json({user:user})
    }catch(err){
        const errorMessage = err.message
        res.status(400).json({errorMessage})
    }
    
}



module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}