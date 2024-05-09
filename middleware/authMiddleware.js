const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'travel blog secret key',(err,decoded)=>{
            if(err){
                console.log(err.message)
                res.redirect('/')
            }else{
                console.log(decoded)
                next();
            }

        })

    }else{
        res.redirect('auth/login')
    }

}
const checkCurrentUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'travel blog secret key',async (err,decoded)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decoded.data)
                res.locals.user = user;
                next();
            }

        })
    }else{
        res.locals.user = null;
        next();
    }

}

module.exports = {requireAuth, checkCurrentUser};